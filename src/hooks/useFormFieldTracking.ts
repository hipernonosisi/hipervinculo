// Field-level focus / blur / validity tracking. Listens to focusin/focusout on
// the form so we know exactly which input each visitor abandons on.
import { useEffect } from "react";
import { trackEvent } from "@/hooks/usePageTracking";

interface Options {
  /** Page slug used in tracked events (e.g. "/amazon-fba-ebook") */
  pageUrl: string;
  /** Optional variant label (e.g. "default" / "remarketing") */
  variant?: string;
  /** CSS selector for the form root */
  selector?: string;
}

function fieldKey(el: Element): string {
  const input = el as HTMLInputElement;
  return (
    input.id ||
    input.getAttribute("name") ||
    input.getAttribute("aria-label") ||
    input.getAttribute("placeholder") ||
    input.tagName.toLowerCase()
  ).slice(0, 60);
}

export function useFormFieldTracking({ pageUrl, variant, selector = "form" }: Options) {
  useEffect(() => {
    const form = document.querySelector(selector);
    if (!form) return;

    const focusTs: Record<string, number> = {};

    const onFocusIn = (e: Event) => {
      const t = e.target as HTMLElement;
      if (!t || !(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement)) return;
      const key = fieldKey(t);
      focusTs[key] = performance.now();
      trackEvent("form_field_focus", { field: key, variant }, pageUrl);
    };

    const onFocusOut = (e: Event) => {
      const t = e.target as HTMLElement;
      if (!t || !(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement)) return;
      const key = fieldKey(t);
      const start = focusTs[key];
      const dwellMs = start ? Math.round(performance.now() - start) : 0;
      const valLen = (t as HTMLInputElement).value?.length ?? 0;
      const isValid = (t as HTMLInputElement).checkValidity?.() ?? true;
      trackEvent(
        "form_field_blur",
        { field: key, dwell_ms: dwellMs, value_len: valLen, valid: isValid, variant },
        pageUrl,
      );
    };

    const onInvalid = (e: Event) => {
      const t = e.target as HTMLElement;
      if (!t || !(t instanceof HTMLInputElement)) return;
      trackEvent(
        "form_field_invalid",
        { field: fieldKey(t), validation_message: t.validationMessage?.slice(0, 120), variant },
        pageUrl,
      );
    };

    form.addEventListener("focusin", onFocusIn);
    form.addEventListener("focusout", onFocusOut);
    form.addEventListener("invalid", onInvalid, true);

    return () => {
      form.removeEventListener("focusin", onFocusIn);
      form.removeEventListener("focusout", onFocusOut);
      form.removeEventListener("invalid", onInvalid, true);
    };
  }, [pageUrl, variant, selector]);
}
