import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Download, Mail, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo-hipervinculo.png";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const PRODUCT_NAME = "Publicidad en Amazon Sin Quemar tu Dinero";
const PRODUCT_ID = "publicidad-en-amazon";

export default function AmazonPpcEbookSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState<"loading" | "ok" | "pending" | "error">("loading");
  const [data, setData] = useState<{ name?: string; email?: string; download_url?: string; content_name?: string; amount_cents?: number; currency?: string }>({});

  useEffect(() => {
    if (!sessionId) { setState("error"); return; }
    (async () => {
      try {
        const getCookie = (name: string) => {
          const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
          return m ? decodeURIComponent(m[1]) : undefined;
        };
        const { data, error } = await supabase.functions.invoke("verify-ebook-payment", {
          body: { session_id: sessionId, fbp: getCookie("_fbp"), fbc: getCookie("_fbc"), user_agent: navigator.userAgent },
        });
        if (error) throw error;
        if (data?.status === "ok") {
          setData(data);
          setState("ok");

          const key = `purchase_fired_${data.session_id || sessionId}`;
          if (typeof window !== "undefined" && !localStorage.getItem(key)) {
            const value = (data.amount_cents ?? 6700) / 100;
            const currency = (data.currency ?? "usd").toUpperCase();
            const contentName = data.content_name || PRODUCT_NAME;
            try {
              window.fbq?.("track", "Purchase", {
                value, currency,
                content_name: contentName,
                content_type: "product",
                content_ids: [PRODUCT_ID],
              }, { eventID: data.session_id || sessionId });
            } catch (e) { console.warn("fbq Purchase error", e); }
            try {
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                event: "purchase",
                ecommerce: {
                  transaction_id: data.session_id || sessionId,
                  value, currency,
                  items: [{ item_id: PRODUCT_ID, item_name: contentName, price: value, quantity: 1 }],
                },
              });
            } catch (e) { console.warn("dataLayer purchase error", e); }
            localStorage.setItem(key, "1");
          }
        } else if (data?.status === "pending") {
          setState("pending");
        } else {
          setState("error");
        }
      } catch (e) {
        console.error(e);
        setState("error");
      }
    })();
  }, [sessionId]);

  const displayName = data.content_name || PRODUCT_NAME;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO title="¡Compra exitosa! | Hipervínculo" noIndex />
      <header className="border-b border-border/40 py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Link to="/" className="bg-white p-1.5 rounded">
            <img src={logo} alt="Hipervínculo" className="h-8" />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full text-center">
          {state === "loading" && (
            <>
              <Loader2 className="w-12 h-12 text-[#2F4F3E] animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Confirmando tu pago...</p>
            </>
          )}

          {state === "ok" && (
            <>
              <div className="w-20 h-20 rounded-full bg-[#8BC34A]/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#2F4F3E]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#2F4F3E] mb-3">
                ¡Gracias{data.name ? `, ${data.name.split(" ")[0]}` : ""}!
              </h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Tu compra de <strong className="text-foreground">{displayName}</strong> está confirmada. Te enviamos un correo a{" "}
                <strong className="text-foreground">{data.email}</strong> con tu enlace de descarga seguro.
              </p>
              {data.download_url && (
                <a href={data.download_url}>
                  <Button size="lg" className="bg-[#2F4F3E] hover:bg-[#2F4F3E]/90 text-white px-8 py-6 text-base">
                    <Download className="w-5 h-5 mr-2" />
                    Descargar mi guía PDF
                  </Button>
                </a>
              )}
              <div className="mt-8 p-4 rounded-lg bg-[#f7faf6] border border-border text-sm text-muted-foreground">
                <Mail className="w-4 h-4 inline mr-1.5 text-[#2F4F3E]" />
                ¿No ves el correo? Revisa tu carpeta de spam o promociones. El enlace es personal y caduca en 7 días.
              </div>
            </>
          )}

          {state === "pending" && (
            <>
              <Loader2 className="w-12 h-12 text-[#2F4F3E] animate-spin mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-[#2F4F3E] mb-2">Procesando tu pago</h1>
              <p className="text-muted-foreground">Esto puede tomar unos segundos. Refresca esta página en un momento.</p>
            </>
          )}

          {state === "error" && (
            <>
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-[#2F4F3E] mb-2">No pudimos confirmar tu pago</h1>
              <p className="text-muted-foreground mb-6">
                Si el cargo fue exitoso, escríbenos a <a href="mailto:info@hipervinculo.net" className="text-[#2F4F3E] font-bold underline">info@hipervinculo.net</a> y te enviamos tu PDF de inmediato.
              </p>
              <Link to={PAGE_URL}>
                <Button variant="outline">Volver a la página</Button>
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

const PAGE_URL = "/publicidad-en-amazon";
