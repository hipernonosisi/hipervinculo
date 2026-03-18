import { useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2, Copy, Check } from "lucide-react";
import { useState } from "react";

const AmazonCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {code ? (
          <>
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">¡Autorización exitosa!</h1>
            <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
              <code className="flex-1 text-sm font-mono text-foreground break-all text-left">{code}</code>
              <button
                onClick={handleCopy}
                className="shrink-0 p-2 rounded-md hover:bg-accent transition-colors"
                title="Copiar código"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-muted-foreground" />}
              </button>
            </div>
            <p className="text-muted-foreground text-sm">
              Copia este código y pégalo en tu terminal para completar la configuración.
            </p>
          </>
        ) : error ? (
          <>
            <XCircle className="w-20 h-20 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">Error de autorización</h1>
            <p className="text-muted-foreground">{errorDescription || error}</p>
          </>
        ) : (
          <>
            <Loader2 className="w-20 h-20 text-muted-foreground mx-auto animate-spin" />
            <h1 className="text-2xl font-bold text-foreground">Esperando autorización de Amazon...</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default AmazonCallback;
