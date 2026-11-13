import { useEffect, useState } from 'react';
// On narrow screens, contact widgets yield to forms and primary actions.
export function useFloatingContactVisibility() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      if (window.innerWidth >= 640) { setHidden(false); return; }
      const occupied = Array.from(document.querySelectorAll('main form, main button, main a')).some(node => {
        const rect = node.getBoundingClientRect();
        return rect.width > 90 && rect.bottom > window.innerHeight - 180 && rect.top < window.innerHeight && rect.right > window.innerWidth - 80;
      });
      setHidden(occupied || document.activeElement?.matches('input,textarea,select') === true);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(check); };
    check();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('focusin', schedule);
    document.addEventListener('focusout', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); document.removeEventListener('focusin', schedule); document.removeEventListener('focusout', schedule); };
  }, []);
  return hidden;
}
