import { CheckCircle2, Clock, Sparkles } from "lucide-react";
import { SEO } from "@/components/SEO";

type Photo = { id: string; url?: string; label: string };
type Character = {
  name: string;
  desc: string;
  base: Photo;
  newPhotos: Photo[];
  soulStatus: "pendiente" | "entrenando" | "lista";
  soulId?: string;
};

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_32YKnClIjQzd0Ts1xib9il3Kx3o";

const characters: Character[] = [
  {
    name: "Carlos",
    desc: "Hombre Latino · ~30 años · camiseta gris",
    base: {
      id: "6567d456-fbb4-4b5f-82cc-fa7a3bf1f1eb",
      url: `${CDN}/hf_20260609_023120_6567d456-fbb4-4b5f-82cc-fa7a3bf1f1eb.png`,
      label: "Base",
    },
    newPhotos: [
      { id: "b6ad7975-254e-45e2-914e-d29af9d9134c", label: "Cocina, 3/4" },
      { id: "d596b6e3-778a-40a9-97c7-82392320a7a3", label: "Café terraza" },
      { id: "c45373a5-bca4-4a8f-a114-c7e06a1d1bd6", label: "Perfil sofá" },
      { id: "460cf19e-aec9-4bb1-b0a9-20aa1f6c08d3", label: "Sonrisa parque" },
      { id: "512779c1-2b72-43f3-bcfa-e4b7abfc292f", label: "Coworking, móvil" },
      { id: "4fdaee37-5f23-4002-ae46-8bfadc79e672", label: "Sorpresa rooftop" },
    ],
    soulStatus: "pendiente",
  },
  {
    name: "Sofía",
    desc: "Mujer Latina · ~27 años · suéter crema",
    base: {
      id: "5b08029e-3243-4de6-8185-de4dd3b4afdc",
      url: `${CDN}/hf_20260609_023234_5b08029e-3243-4de6-8185-de4dd3b4afdc.png`,
      label: "Base",
    },
    newPhotos: [
      { id: "6cd90bd8-c9f4-43ee-8e72-7d2ce14fdcf8", label: "Risa café" },
      { id: "9b5aeefe-3c63-415d-b901-ced0565c75b7", label: "Pensativa noche" },
      { id: "ac97db42-6ce9-48b3-8b01-94357607373c", label: "Perfil balcón" },
      { id: "374f4139-9e14-4b84-a3c1-9c6806b1bbfe", label: "Sonrisa cuarto" },
      { id: "fcc57bb7-c992-4fb9-aee4-d7df22e060e5", label: "Sorpresa cocina" },
      { id: "ed96c288-c811-4004-a08b-3aee3b22c03a", label: "Concentrada laptop" },
    ],
    soulStatus: "pendiente",
  },
  {
    name: "Daniela",
    desc: "Mujer Latina · ~38 años · blusa terracota",
    base: {
      id: "97bc2c1c-9cf9-45e9-83f8-0d19d15cd115",
      url: `${CDN}/hf_20260609_023619_97bc2c1c-9cf9-45e9-83f8-0d19d15cd115.png`,
      label: "Base",
    },
    newPhotos: [
      { id: "b888f1b9-3da4-4127-aaf2-41d94f276652", label: "3/4 sala" },
      { id: "af9b1a2e-3217-4211-bb39-ba0249cb3de7", label: "Notebook oficina" },
      { id: "f5bcf35b-b776-4f56-a70b-b073202840d5", label: "Perfil bookshelf" },
      { id: "1f4a6bb0-37aa-4238-8537-2ff2da48a2e9", label: "Sonrisa café" },
      { id: "564b80f4-7356-4cb9-b30f-4ec821b3ca39", label: "Sorpresa sala" },
      { id: "0e09e20e-b30d-4830-823f-d4f60d3e1f85", label: "Brazos cruzados" },
    ],
    soulStatus: "pendiente",
  },
];

function StatusBadge({ status }: { status: Character["soulStatus"] }) {
  const map = {
    pendiente: { txt: "Pendiente de entrenar", cls: "bg-amber-100 text-amber-800", Icon: Clock },
    entrenando: { txt: "Entrenando (~10 min)", cls: "bg-blue-100 text-blue-800", Icon: Sparkles },
    lista: { txt: "Soul lista", cls: "bg-emerald-100 text-emerald-800", Icon: CheckCircle2 },
  }[status];
  const Icon = map.Icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${map.cls}`}>
      <Icon className="w-3 h-3" /> {map.txt}
    </span>
  );
}

function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <div className="space-y-1.5">
      <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted border border-border">
        {photo.url ? (
          <img src={photo.url} alt={photo.label} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground text-xs gap-2">
            <Clock className="w-5 h-5 animate-pulse" />
            <span>Generando…</span>
          </div>
        )}
      </div>
      <div className="text-[10px] text-muted-foreground truncate" title={photo.id}>
        {photo.label}
      </div>
    </div>
  );
}

export default function PersonajesStatus() {
  const totalDone = characters.reduce((s, c) => s + 1 + c.newPhotos.filter((p) => p.url).length, 0);
  const totalNeeded = characters.length * 7;

  return (
    <div className="min-h-screen bg-white text-foreground">
      <SEO title="Estado de personajes UGC — Hipervínculo" description="Progreso de generación y entrenamiento de Souls" url="https://hipervinculo.net/personajes-status" />

      <header className="border-b border-border bg-[#2F4F3E] text-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-extrabold">Personajes UGC · Estado</h1>
          <p className="text-white/80 text-sm mt-1">
            Generación de fotos de referencia y entrenamiento de Souls
          </p>
          <div className="mt-3 text-sm">
            <span className="font-bold text-[#8BC34A]">{totalDone}</span>
            <span className="text-white/70"> / {totalNeeded} fotos completadas · </span>
            <span className="text-white/70">0 / 3 Souls entrenadas</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-10">
        {characters.map((c) => (
          <section key={c.name} className="border border-border rounded-2xl p-5 md:p-6 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-[#2F4F3E]">{c.name}</h2>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
              <StatusBadge status={c.soulStatus} />
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
              <PhotoCard photo={c.base} />
              {c.newPhotos.map((p) => (
                <PhotoCard key={p.id} photo={p} />
              ))}
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              {1 + c.newPhotos.filter((p) => p.url).length} / 7 fotos · Soul {c.soulStatus === "lista" ? "lista" : c.soulStatus === "entrenando" ? "entrenando" : "aún sin entrenar"}
            </div>
          </section>
        ))}

        <div className="text-xs text-muted-foreground text-center pt-4">
          Las URLs de las fotos nuevas se llenan a medida que terminan en el conector. Recarga la página para ver avances.
        </div>
      </main>
    </div>
  );
}
