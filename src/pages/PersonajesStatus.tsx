import { useMemo } from "react";

type Soul = "pendiente" | "entrenando" | "lista";

interface Personaje {
  id: string;
  nombre: string;
  descripcion: string;
  base: string;
  fotos: string[];
  soul: Soul;
}

const PERSONAJES: Personaje[] = [
  {
    id: "carlos",
    nombre: "Carlos",
    descripcion: "Hombre Latino · ~30 años · camiseta gris",
    base: "https://d8j0ntlcm91z4.cloudfront.net/user_32YKnClIjQzd0Ts1xib9il3Kx3o/hf_20260609_023120_6567d456-fbb4-4b5f-82cc-fa7a3bf1f1eb.png",
    fotos: [
      "https://tempfile.aiquickdraw.com/r/fluxkontext_44ba027e8e9a47efa1979eb101670bed_1780974195_xqazpjyl.jpg",
      "https://tempfile.aiquickdraw.com/r/fluxkontext_c41f781bb89f4828945ff909cee284a5_1780974195_y7ywgh6z.jpg",
      "https://tempfile.aiquickdraw.com/r/fluxkontext_73610607e0164dc590a03321d1d0d709_1780974208_unget6n0.jpg",
      "https://tempfile.aiquickdraw.com/r/fluxkontext_5305d759f6ee458da4802270f59ffa16_1780974194_311tt518.jpg",
      "https://tempfile.aiquickdraw.com/r/fluxkontext_ae8285038b854f3bab664222a56defae_1780974215_4q7aqzkj.jpg",
      "https://tempfile.aiquickdraw.com/r/fluxkontext_f18abf0995de4c2497a9a4556666f4af_1780974204_exloj0jg.jpg",
    ],
    soul: "pendiente",
  },
  {
    id: "sofia",
    nombre: "Sofía",
    descripcion: "Mujer Latina · ~27 años · suéter crema",
    base: "https://d8j0ntlcm91z4.cloudfront.net/user_32YKnClIjQzd0Ts1xib9il3Kx3o/hf_20260609_023234_5b08029e-3243-4de6-8185-de4dd3b4afdc.png",
    fotos: [
      "https://tempfile.aiquickdraw.com/r/fluxkontext_05e42f7253a64714b66a5d52233d52ea_1780974210_qw6y8vyq.jpg",
      "https://tempfile.aiquickdraw.com/r/fluxkontext_30ab8e5e34c748138b58bc32e5559041_1780974206_xei7h5bc.jpg",
      "https://tempfile.aiquickdraw.com/r/fluxkontext_e4b47e14240c4ccda9b0edd89ab869b8_1780974212_wyc8wuye.jpg",
      "https://tempfile.aiquickdraw.com/r/fluxkontext_c9d1b3189f294fc3af388de36e1660a6_1780974208_ixgexq81.jpg",
      "https://tempfile.aiquickdraw.com/r/fluxkontext_8f6ae6b65b4d40819ce4175c29405af4_1780974213_mj4jiwf1.jpg",
      "https://tempfile.aiquickdraw.com/r/fluxkontext_8a645f217f8142eca8ca8c584ba0c92d_1780974216_swet0w41.jpg",
    ],
    soul: "pendiente",
  },
  {
    id: "daniela",
    nombre: "Daniela",
    descripcion: "Mujer Latina · ~38 años · blusa terracota",
    base: "https://d8j0ntlcm91z4.cloudfront.net/user_32YKnClIjQzd0Ts1xib9il3Kx3o/hf_20260609_023619_97bc2c1c-9cf9-45e9-83f8-0d19d15cd115.png",
    fotos: [
      "https://tempfile.aiquickdraw.com/r/fluxkontext_cf4d7177ea8341d48febb75d724f2a5f_1780974194_hx6m0du3.jpg",
      "https://tempfile.aiquickdraw.com/r/fluxkontext_ca258d7ace874772a23d7e511c60b3d4_1780974206_11u8gubx.jpg",
      "https://tempfile.aiquickdraw.com/r/fluxkontext_057213f49a57448197d75d4844fa8fd3_1780974205_1h1tj5n4.jpg",
      "https://tempfile.aiquickdraw.com/r/fluxkontext_22b73163592945838431ef241223f2e6_1780974197_kvi0i8nm.jpg",
      "https://tempfile.aiquickdraw.com/r/fluxkontext_5cd768efef3643948803d4ecc1030fb9_1780974208_ql5ri393.jpg",
      "https://tempfile.aiquickdraw.com/r/fluxkontext_c9b69c04220e487cb8cd06e3cca2760b_1780974216_558bas3h.jpg",
    ],
    soul: "pendiente",
  },
];

const SOUL_STYLES: Record<Soul, { label: string; cls: string }> = {
  pendiente: { label: "Pendiente", cls: "bg-muted text-muted-foreground" },
  entrenando: { label: "Entrenando…", cls: "bg-amber-100 text-amber-900" },
  lista: { label: "Soul lista", cls: "bg-accent text-accent-foreground" },
};

function PhotoCard({ src, label }: { src?: string; label?: string }) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
      {src ? (
        <img src={src} alt={label ?? ""} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
          Generando…
        </div>
      )}
      {label && (
        <span className="absolute bottom-1 left-1 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium">
          {label}
        </span>
      )}
    </div>
  );
}

export default function PersonajesStatus() {
  const stats = useMemo(() => {
    const total = PERSONAJES.length * 7;
    const done = PERSONAJES.reduce(
      (acc, p) => acc + 1 + p.fotos.filter(Boolean).length,
      0
    );
    const souls = PERSONAJES.filter((p) => p.soul === "lista").length;
    return { total, done, souls };
  }, []);

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-foreground">
            Estado de personajes
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {stats.done} / {stats.total} fotos completadas · {stats.souls} / {PERSONAJES.length}{" "}
            Souls entrenadas
          </p>
        </header>

        <div className="space-y-10">
          {PERSONAJES.map((p) => {
            const s = SOUL_STYLES[p.soul];
            const completas = 1 + p.fotos.filter(Boolean).length;
            return (
              <section key={p.id} className="rounded-xl border bg-card p-5 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{p.nombre}</h2>
                    <p className="text-xs text-muted-foreground">{p.descripcion}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-muted-foreground">{completas} / 7 fotos</span>
                    <span className={`rounded-full px-3 py-1 font-medium ${s.cls}`}>
                      {s.label}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
                  <PhotoCard src={p.base} label="Base" />
                  {p.fotos.map((src, i) => (
                    <PhotoCard key={i} src={src} label={`#${i + 1}`} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Generación con Flux Kontext Pro (3:4). Las URLs son temporales; al entrenar
          la Soul se conservan dentro del modelo entrenado.
        </p>
      </div>
    </div>
  );
}
