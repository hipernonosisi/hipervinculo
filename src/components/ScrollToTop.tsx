import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    // Deep links such as /privacy#data-deletion must land on the section even
    // though the content is rendered by React after the first paint.
    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let attempts = 0;

    const tryScroll = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "instant", block: "start" });
        return;
      }
      if (attempts++ < 20) frame = requestAnimationFrame(tryScroll);
    };

    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
};
