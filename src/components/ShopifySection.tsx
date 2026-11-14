import { type ReactNode } from 'react';

export function ShopifySection({ title, intro, children, id, muted = false }: { title: string; intro?: string; children: ReactNode; id?: string; muted?: boolean }) {
  return <section id={id} className={`py-16 md:py-24 scroll-mt-28 ${muted ? 'bg-secondary' : 'bg-background'}`}><div className="container max-w-6xl">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-normal leading-tight mb-6">{title}</h2>
    {intro && <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mb-10">{intro}</p>}
    {children}
  </div></section>;
}