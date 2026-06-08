import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BUCKET = "ebooks";
const FILE_PATH = "amazon-fba-sin-inventario/Amazon_FBA_Sin_Inventario_Hipervinculo.pdf";

function errPage(title: string, msg: string, status = 403) {
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${title}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>body{margin:0;font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#fff;color:#1a1a1a;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px;}
  .card{max-width:480px;text-align:center;padding:32px;border:1px solid #e5e7eb;border-radius:12px;}
  h1{color:#2F4F3E;margin:0 0 12px;font-size:22px;}
  p{color:#444;line-height:1.6;margin:0 0 16px;}
  a{color:#2F4F3E;font-weight:700;text-decoration:none;border-bottom:2px solid #8BC34A;}</style></head>
  <body><div class="card"><h1>${title}</h1><p>${msg}</p><p>¿Necesitas ayuda? Escribe a <a href="mailto:info@hipervinculo.net">info@hipervinculo.net</a></p></div></body></html>`;
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8", ...corsHeaders } });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token")?.trim();
    if (!token || !/^[a-f0-9]{32,128}$/i.test(token)) {
      return errPage("Enlace inválido", "El enlace de descarga no es válido.");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: purchase, error } = await supabase
      .from("ebook_purchases").select("*").eq("download_token", token).maybeSingle();

    if (error || !purchase) return errPage("Enlace inválido", "No encontramos tu compra. Verifica el enlace de tu correo.");

    if (new Date(purchase.expires_at) < new Date()) {
      return errPage("Enlace expirado", "Este enlace de descarga ya venció (7 días). Contáctanos para regenerarlo.");
    }
    if (purchase.download_count >= purchase.max_downloads) {
      return errPage("Límite alcanzado", `Has usado las ${purchase.max_downloads} descargas permitidas. Contáctanos si necesitas otra.`);
    }

    // Generate short-lived signed URL and redirect
    const { data: signed, error: signErr } = await supabase
      .storage.from(BUCKET).createSignedUrl(FILE_PATH, 120, {
        download: "Amazon_FBA_Sin_Inventario_Hipervinculo.pdf",
      });
    if (signErr || !signed) {
      console.error("sign error", signErr);
      return errPage("Error", "No pudimos generar el archivo. Intenta de nuevo en unos minutos.", 500);
    }

    await supabase.from("ebook_purchases")
      .update({ download_count: purchase.download_count + 1 })
      .eq("id", purchase.id);

    return Response.redirect(signed.signedUrl, 302);
  } catch (e) {
    console.error("download-ebook error", e);
    return errPage("Error", "Ocurrió un error inesperado.", 500);
  }
});
