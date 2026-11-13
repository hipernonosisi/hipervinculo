import { Document, Page, View, Text, Image, StyleSheet, Svg, Path, Link } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';
Font.registerHyphenationCallback((word) => [word]);
import { bokanovaContent as c, bokanovaLiveUrl, bokanovaMailto } from '../data/bokanovaContent';

const green = '#2d4a2d';
const lime = '#8BC34A';
const limeBright = '#c5e86a';
const bg = '#f8f9f5';
const gray = '#666666';
const grayLight = '#999999';
const inkStrong = '#1f2d1f';
const ink = '#4b5563';
const rule = '#e3e9e1';

const T = {
  eyebrow: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: lime, letterSpacing: 3 },
  h1: { fontSize: 26, fontFamily: 'Helvetica-Bold', color: green, lineHeight: 1.08 },
  lead: { fontSize: 11.5, fontFamily: 'Helvetica-Bold', color: '#5c7f43', lineHeight: 1.35 },
  body: { fontSize: 9.5, color: ink, lineHeight: 1.65 },
  cardTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: green },
  cardBody: { fontSize: 8.5, color: ink, lineHeight: 1.6 },
  micro: { fontSize: 7, fontFamily: 'Helvetica-Bold', letterSpacing: 1.6 },
  sectionTitle: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: green },
  rowLabel: { fontSize: 8.5, color: ink },
  rowValue: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: green },
  note: { fontSize: 7.5, color: grayLight, lineHeight: 1.6 },
};

const s = StyleSheet.create({
  page: { paddingTop: 40, paddingBottom: 50, paddingHorizontal: 46, backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
  pageBg: { paddingTop: 40, paddingBottom: 50, paddingHorizontal: 46, backgroundColor: bg, fontFamily: 'Helvetica' },
  accent: { width: 34, height: 3, backgroundColor: lime, marginBottom: 14 },
  footer: { position: 'absolute', bottom: 24, left: 46, right: 46, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 7, color: '#b0b0b0', letterSpacing: 1 },
  card: { backgroundColor: bg, borderRadius: 12, padding: 12, marginBottom: 7 },
  cardWhite: { backgroundColor: '#ffffff', borderRadius: 12, padding: 13, marginBottom: 9 },
});

const PageHead = ({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) => (
  <View style={{ marginBottom: 16 }}>
    <View style={s.accent} />
    <Text style={{ ...T.eyebrow, marginBottom: 8 }}>{eyebrow.toUpperCase()}</Text>
    <Text style={T.h1}>{title}</Text>
    {lead ? <Text style={{ ...T.lead, marginTop: 6 }}>{lead}</Text> : null}
  </View>
);

const Footer = () => (
  <View style={s.footer} fixed>
    <Text style={s.footerText}>HIPERVÍNCULO</Text>
    <Text style={s.footerText} render={({ pageNumber }) => `${String(pageNumber).padStart(2, '0')} · hipervinculo.net`} />
  </View>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <View style={{ flexDirection: 'row', gap: 8, marginBottom: 5 }}>
    <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: lime, marginTop: 5 }} />
    <Text style={{ flex: 1, ...T.cardBody }}>{children}</Text>
  </View>
);

const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M22 11.08V12a10 10 0 11-5.93-9.14" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M22 4L12 14.01l-3-3" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const AlertIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 9v4M12 17h.01" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);
const GlobeIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" fill="none" stroke={lime} strokeWidth="2" />
  </Svg>
);
const SearchIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);
const MegaphoneIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M3 11l18-5v12L3 14v-3zM11.6 16.8a3 3 0 11-5.8-1.6" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const ClipboardIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
    <Path d="M9 2h6a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V3a1 1 0 011-1z" fill="none" stroke={lime} strokeWidth="2" />
  </Svg>
);
const CalendarIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);
const MailIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M22 6l-10 7L2 6" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);
const ArrowIcon = ({ size = 12 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M7 17L17 7M7 7h10v10" fill="none" stroke={limeBright} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const LivePanel = () => (
  <Link src={bokanovaLiveUrl} style={{ textDecoration: 'none' }}>
    <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 18, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ ...T.micro, color: 'rgba(255,255,255,0.55)', marginBottom: 5 }}>VERSIÓN PROVISIONAL DEL SITIO NUEVO</Text>
        <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: limeBright }}>{bokanovaLiveUrl}</Text>
      </View>
      <ArrowIcon size={14} />
    </View>
  </Link>
);

const about = {
  title: 'Hipervínculo',
  headline: 'Agencia de marketing digital con más de 20 años de trayectoria',
  description: 'Diseñamos sitios web y gestionamos campañas digitales orientadas a resultados medibles. Hoy ya gestionamos las campañas de Google Ads de Bokanova, por lo que conocemos a fondo a sus pacientes y lo que buscan.',
  stats: [['20+', 'Años de experiencia'], ['200+', 'Clientes atendidos'], ['$92M+', 'Ventas rastreadas']],
};

interface Props {
  logoBase64: string;
}

export function BokanovaPDFDocument({ logoBase64 }: Props) {
  const { cover, current, built, seo, ads, timeline, needs, investment, close } = c;

  return (
    <Document title="Propuesta · Nuevo sitio web de Bokanova" author="Hipervínculo">
      {/* PAGE 1: Cover */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0 }}>
        <View style={{ paddingHorizontal: 48, paddingTop: 46, paddingBottom: 30, flexDirection: 'row' }}>
          <Image src={logoBase64} style={{ height: 30, objectFit: 'contain', objectPositionX: 'left' }} />
        </View>
        <View style={{ flex: 1, backgroundColor: green, paddingHorizontal: 48, paddingVertical: 56, justifyContent: 'center' }}>
          <Text style={{ ...T.eyebrow, color: limeBright, marginBottom: 22 }}>{cover.eyebrow.toUpperCase()}</Text>
          <Text style={{ fontSize: 38, fontFamily: 'Helvetica-Bold', color: '#ffffff', lineHeight: 1.1, maxWidth: 440 }}>
            {cover.title}
          </Text>
          <View style={{ width: 44, height: 3, backgroundColor: lime, marginTop: 26, marginBottom: 22 }} />
          <Text style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 360 }}>
            {cover.subtitle}
          </Text>
          <Text style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.85)', marginTop: 22 }}>{cover.preparedFor}</Text>
          <View style={{ marginTop: 30, maxWidth: 400 }}>
            <LivePanel />
          </View>
        </View>
        <View style={{ paddingHorizontal: 48, paddingVertical: 22, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 7.5, color: grayLight, letterSpacing: 2.5 }}>CONFIDENCIAL</Text>
          <Text style={{ fontSize: 7.5, color: grayLight, letterSpacing: 1 }}>hipervinculo.net</Text>
        </View>
      </Page>

      {/* PAGE 2: About */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="Quiénes somos" title={about.title} lead={about.headline} />
        <Text style={{ ...T.body, marginBottom: 22 }}>{about.description}</Text>
        <View style={{ flexDirection: 'row', gap: 14 }}>
          {about.stats.map((stat, i) => (
            <View key={i} style={{ flex: 1, backgroundColor: bg, borderRadius: 14, paddingVertical: 24, alignItems: 'center' }}>
              <Text style={{ fontSize: 30, fontFamily: 'Helvetica-Bold', color: green }}>{stat[0]}</Text>
              <View style={{ width: 18, height: 2, backgroundColor: lime, marginVertical: 8 }} />
              <Text style={{ fontSize: 8, color: ink, letterSpacing: 0.5 }}>{stat[1]}</Text>
            </View>
          ))}
        </View>
        <Footer />
      </Page>

      {/* PAGE 3: Current site */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="Punto de partida" title={current.title} />
        <Text style={{ ...T.body, marginBottom: 18 }}>{current.intro}</Text>
        {current.points.map((point, i) => (
          <View key={i} wrap={false} style={{ ...s.card, flexDirection: 'row', gap: 11 }}>
            <View style={{ paddingTop: 2 }}><AlertIcon size={12} /></View>
            <Text style={{ flex: 1, ...T.cardBody }}>{point}</Text>
          </View>
        ))}
        <Footer />
      </Page>

      {/* PAGE 4: Built site, part 1 */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="Lo que ya está construido" title={built.title} lead={built.intro} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 9 }}>
          {built.cards.slice(0, 6).map(([title, description], i) => (
            <View key={i} wrap={false} style={{ width: '48.2%', backgroundColor: bg, borderRadius: 12, padding: 12, marginBottom: 6, flexDirection: 'row', gap: 10 }}>
              <View style={{ paddingTop: 2 }}><GlobeIcon size={12} /></View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: green, marginBottom: 4 }}>{title}</Text>
                <Text style={{ fontSize: 7.8, color: ink, lineHeight: 1.55 }}>{description}</Text>
              </View>
            </View>
          ))}
        </View>
        <Footer />
      </Page>

      {/* PAGE 5: Built site, part 2 */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="Lo que ya está construido · continued" title="El sitio nuevo, en detalle" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 9 }}>
          {built.cards.slice(6).map(([title, description], i) => (
            <View key={i} wrap={false} style={{ width: '48.2%', backgroundColor: bg, borderRadius: 12, padding: 12, marginBottom: 6, flexDirection: 'row', gap: 10 }}>
              <View style={{ paddingTop: 2 }}><GlobeIcon size={12} /></View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: green, marginBottom: 4 }}>{title}</Text>
                <Text style={{ fontSize: 7.8, color: ink, lineHeight: 1.55 }}>{description}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{ marginTop: 10 }}>
          <LivePanel />
        </View>
        <Footer />
      </Page>

      {/* PAGE 6: SEO */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="Posicionamiento en buscadores" title={seo.title} />
        <Text style={{ ...T.body, marginBottom: 16 }}>{seo.intro}</Text>
        {seo.points.map((point, i) => (
          <View key={i} wrap={false} style={{ ...s.card, padding: 10, marginBottom: 5, flexDirection: 'row', gap: 10 }}>
            <View style={{ paddingTop: 2 }}><SearchIcon size={11} /></View>
            <Text style={{ flex: 1, ...T.cardBody }}>{point}</Text>
          </View>
        ))}
        <View wrap={false} style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 20, paddingVertical: 16, marginTop: 12 }}>
          <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#ffffff', lineHeight: 1.55 }}>{seo.closing}</Text>
        </View>
        <Footer />
      </Page>

      {/* PAGE 7: Ads complement */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="Campañas" title={ads.title} />
        <View wrap={false} style={{ ...s.card, flexDirection: 'row', gap: 12 }}>
          <View style={{ paddingTop: 2 }}><MegaphoneIcon size={14} /></View>
          <Text style={{ flex: 1, ...T.cardBody }}>{ads.text}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 18 }}>
          {[
            ['Sitio nuevo', 'Una mejor página de llegada convierte más contactos por la misma inversión en anuncios.'],
            ['Posicionamiento', 'Suma visitas que no se pagan por clic y sostiene el crecimiento mes a mes.'],
            ['Medición', 'Cada contacto por WhatsApp y cada formulario quedan registrados para decidir con datos.'],
          ].map(([title, text], i) => (
            <View key={i} wrap={false} style={{ flex: 1, backgroundColor: bg, borderRadius: 12, padding: 14 }}>
              <Text style={{ ...T.micro, color: lime, marginBottom: 7 }}>{title.toUpperCase()}</Text>
              <Text style={{ fontSize: 8, color: ink, lineHeight: 1.6 }}>{text}</Text>
            </View>
          ))}
        </View>
        <Footer />
      </Page>

      {/* PAGE 8: Timeline */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="Calendario" title={timeline.title} />
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 26 }}>
          {timeline.steps.map(([title, description, when], i) => (
            <View key={i} wrap={false} style={{ flex: 1, backgroundColor: bg, borderRadius: 12, padding: 13, borderTopWidth: 3, borderTopColor: lime }}>
              <Text style={{ ...T.micro, color: lime, marginBottom: 6 }}>{`PASO ${i + 1}`}</Text>
              <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: green, marginBottom: 5 }}>{title}</Text>
              <Text style={{ fontSize: 7.8, color: ink, lineHeight: 1.55, marginBottom: when ? 7 : 0 }}>{description}</Text>
              {when ? <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: green }}>{when}</Text> : null}
            </View>
          ))}
        </View>
        <PageHead eyebrow="Requisitos" title={needs.title} />
        {needs.items.map((item, i) => (
          <View key={i} wrap={false} style={{ ...s.card, padding: 10, marginBottom: 5, flexDirection: 'row', gap: 10 }}>
            <View style={{ paddingTop: 2 }}><ClipboardIcon size={11} /></View>
            <Text style={{ flex: 1, ...T.cardBody }}>{item}</Text>
          </View>
        ))}
        <Footer />
      </Page>

      {/* PAGE 9: Investment */}
      <Page size="A4" style={s.pageBg}>
        <PageHead eyebrow="Inversión" title={investment.title} />
        <View wrap={false} style={{ backgroundColor: green, borderRadius: 16, paddingHorizontal: 24, paddingVertical: 20, marginBottom: 12 }}>
          <Text style={{ ...T.micro, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>{investment.web.name.toUpperCase()}</Text>
          <Text style={{ fontSize: 34, fontFamily: 'Helvetica-Bold', color: limeBright, marginBottom: 10 }}>{investment.web.price}</Text>
          <Text style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.65 }}>
            <Text style={{ fontFamily: 'Helvetica-Bold', color: '#ffffff' }}>Forma de pago: </Text>
            {investment.web.payment}
          </Text>
        </View>
        <View wrap={false} style={s.cardWhite}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <CheckIcon size={12} />
            <Text style={{ ...T.sectionTitle, fontSize: 11 }}>Incluye</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {investment.web.includes.map((item, i) => (
              <View key={i} style={{ width: '50%', flexDirection: 'row', gap: 8, marginBottom: 6, paddingRight: 10 }}>
                <View style={{ paddingTop: 2 }}><CheckIcon size={10} /></View>
                <Text style={{ flex: 1, fontSize: 8.5, color: ink }}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
        <View wrap={false} style={s.cardWhite}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
              <CalendarIcon size={12} />
              <Text style={{ ...T.sectionTitle, fontSize: 11 }}>{investment.seo.name}</Text>
            </View>
            <View style={{ backgroundColor: 'rgba(139,195,74,0.18)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 }}>
              <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: green, letterSpacing: 0.6 }}>{investment.seo.badge.toUpperCase()}</Text>
            </View>
          </View>
          {investment.seo.points.map((point, i) => (
            <Bullet key={i}>{point}</Bullet>
          ))}
        </View>
        <Footer />
      </Page>

      {/* PAGE 10: Close */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: green, paddingHorizontal: 48, paddingVertical: 56, justifyContent: 'center' }}>
            <Text style={{ fontSize: 30, fontFamily: 'Helvetica-Bold', color: '#ffffff', lineHeight: 1.15 }}>{close.title}</Text>
            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, marginTop: 14, marginBottom: 26, maxWidth: 330 }}>
              {close.text}
            </Text>
            <Link src={bokanovaMailto} style={{ textDecoration: 'none', alignSelf: 'flex-start', marginBottom: 26 }}>
              <View style={{ backgroundColor: lime, paddingHorizontal: 22, paddingVertical: 10, borderRadius: 22, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <MailIcon size={11} />
                <Text style={{ fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: green }}>{close.cta}</Text>
              </View>
            </Link>
            <View style={{ maxWidth: 360 }}>
              <LivePanel />
            </View>
          </View>
          <View style={{ width: '34%', backgroundColor: '#ffffff', padding: 34, alignItems: 'center', justifyContent: 'center' }}>
            <Image src={logoBase64} style={{ height: 40, objectFit: 'contain', marginBottom: 18 }} />
            <View style={{ width: 34, height: 2, backgroundColor: lime, marginBottom: 18 }} />
            <Text style={{ fontSize: 8, color: ink, textAlign: 'center', lineHeight: 1.7, maxWidth: 150 }}>
              {close.signature}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
