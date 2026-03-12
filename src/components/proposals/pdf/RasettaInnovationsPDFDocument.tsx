import { Document, Page, View, Text, Image, StyleSheet, Svg, Path, Circle } from '@react-pdf/renderer';
import { rasettaInnovationsProposalContent } from '../data/rasettaInnovationsProposalContent';

const green = '#2d4a2d';
const lime = '#8BC34A';
const bg = '#f8f9f5';
const gray = '#666666';
const grayLight = '#999999';

const s = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
  pageBg: { padding: 40, backgroundColor: bg, fontFamily: 'Helvetica' },
  accent: { width: 40, height: 3, backgroundColor: lime, marginBottom: 16 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 7, color: '#999' },
});

const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M22 11.08V12a10 10 0 11-5.93-9.14" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M22 4L12 14.01l-3-3" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FileIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const CalendarIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const RefreshIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M23 4v6h-6M1 20v-6h6" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ServerIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M2 2h20v8H2zM2 14h20v8H2z" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="6" cy="6" r="1" fill={lime} />
    <Circle cx="6" cy="18" r="1" fill={lime} />
  </Svg>
);

const DollarIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ClockIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M12 6v6l4 2" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const BotIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 8V4H8M2 14h2M20 14h2M15 13a2 2 0 100-4 2 2 0 000 4zM9 13a2 2 0 100-4 2 2 0 000 4z" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
    <Path d="M6 18a6 6 0 0012 0v-4H6v4z" fill="none" stroke={lime} strokeWidth="2" />
  </Svg>
);

const MailIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M22 6l-10 7L2 6" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const PhoneIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" fill="none" stroke={lime} strokeWidth="2" />
  </Svg>
);

const GlobeIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" fill="none" stroke={lime} strokeWidth="2" />
  </Svg>
);

const MapPinIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="none" stroke={lime} strokeWidth="2" />
    <Circle cx="12" cy="10" r="3" fill="none" stroke={lime} strokeWidth="2" />
  </Svg>
);

const LayersIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const iconMap: Record<string, React.FC<{ size?: number }>> = {
  files: FileIcon,
  refresh: RefreshIcon,
  server: ServerIcon,
  calendar: CalendarIcon,
  dollar: DollarIcon,
  clock: ClockIcon,
};

interface Props {
  logoBase64: string;
}

export function RasettaInnovationsPDFDocument({ logoBase64 }: Props) {
  const content = rasettaInnovationsProposalContent;

  return (
    <Document>
      {/* PAGE 1: Cover */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0 }}>
        <View style={{ padding: 40, paddingBottom: 20, flexDirection: 'row' }}>
          <Image src={logoBase64} style={{ height: 30, objectFit: 'contain', objectPositionX: 'left' }} />
        </View>
        <View style={{ flex: 1, backgroundColor: green, padding: 40, justifyContent: 'center' }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 14 }}>
            {content.cover.title.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white', marginBottom: 10, lineHeight: 1.15 }}>
            {content.cover.subtitle}
          </Text>
          <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>
            {content.cover.tagline}
          </Text>
          <View style={{ width: 50, height: 3, backgroundColor: lime }} />
        </View>
        <View style={{ padding: '16 40', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 8, color: grayLight, letterSpacing: 2 }}>CONFIDENCIAL</Text>
          <Text style={{ fontSize: 8, color: grayLight }}>hipervinculo.net</Text>
        </View>
      </Page>

      {/* PAGE 2: About */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SOBRE NOSOTROS</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.about.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{content.about.headline}</Text>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 24 }}>{content.about.description}</Text>
        <View style={{ flexDirection: 'row', gap: 14, marginBottom: 24 }}>
          {content.about.stats.map((stat, i) => (
            <View key={i} style={{ flex: 1, backgroundColor: bg, borderRadius: 12, paddingVertical: 16, alignItems: 'center' }}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: lime, marginBottom: 4 }}>{stat.value}</Text>
              <Text style={{ fontSize: 8, color: gray }}>{stat.label}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {content.about.credentials.map((cred, i) => (
            <Text key={i} style={{ fontSize: 9, color: green, backgroundColor: 'rgba(139,195,74,0.1)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 }}>
              {cred}
            </Text>
          ))}
        </View>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 3: Meta Ads (Etapa 1) */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3 }}>ETAPA 1</Text>
          <LayersIcon size={12} />
        </View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.metaAdsService.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 10 }}>{content.metaAdsService.headline}</Text>
        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 14, marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <View>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>RETAINER MENSUAL</Text>
              <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Incluye hasta 10 creativos UGC con IA</Text>
            </View>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>{content.metaAdsService.retainer}</Text>
          </View>
          <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>INVERSIÓN EN MEDIOS</Text>
              <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{content.metaAdsService.mediaSpendNote}</Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{content.metaAdsService.mediaSpend}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 9, color: gray, lineHeight: 1.6, marginBottom: 6 }}>{content.metaAdsService.description}</Text>
        <View style={{ backgroundColor: 'rgba(139,195,74,0.1)', borderRadius: 10, padding: 10, marginBottom: 8 }}>
          <Text style={{ fontSize: 9, color: green, lineHeight: 1.5 }}>{content.metaAdsService.creativosNote}</Text>
        </View>
        {content.metaAdsService.includes.map((item, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 10, padding: 10, marginBottom: 4, flexDirection: 'row', gap: 10 }}>
            <View style={{ paddingTop: 1 }}><CheckIcon size={12} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 2 }}>{item.title}</Text>
              <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          </View>
        ))}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 4: Bot Service (Etapa 2) */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3 }}>ETAPA 2</Text>
          <LayersIcon size={12} />
        </View>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.botService.title}</Text>
        <Text style={{ fontSize: 10, fontWeight: 'bold', color: lime, marginBottom: 10 }}>{content.botService.headline}</Text>
        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 14, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>SETUP E INSTALACIÓN</Text>
            <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Pago único</Text>
          </View>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>{content.botService.setupPrice}</Text>
        </View>
        <Text style={{ fontSize: 9, color: gray, lineHeight: 1.6, marginBottom: 8 }}>{content.botService.description}</Text>
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 2, marginBottom: 6 }}>EL SETUP INCLUYE:</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
          {content.botService.setupIncludes.map((item, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 6, alignItems: 'flex-start', width: '48%', marginBottom: 2 }}>
              <View style={{ paddingTop: 1 }}><CheckIcon size={10} /></View>
              <Text style={{ fontSize: 8, color: gray, flex: 1 }}>{item}</Text>
            </View>
          ))}
        </View>
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 2, marginBottom: 6 }}>{content.botService.whyBot.title.toUpperCase()}</Text>
        {content.botService.whyBot.features.map((feat, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 8, padding: 8, marginBottom: 4, flexDirection: 'row', gap: 8 }}>
            <View style={{ paddingTop: 1 }}><BotIcon size={11} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: green, marginBottom: 1 }}>{feat.title}</Text>
              <Text style={{ fontSize: 7, color: gray, lineHeight: 1.4 }}>{feat.description}</Text>
            </View>
          </View>
        ))}
        <View style={{ borderLeftWidth: 2, borderLeftColor: lime, paddingLeft: 10, marginTop: 8 }}>
          <Text style={{ fontSize: 8, color: grayLight, fontStyle: 'italic', lineHeight: 1.5 }}>{content.botService.customBotNote}</Text>
        </View>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 5: Bot Pricing */}
      <Page size="A4" style={s.pageBg}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>PLANES DEL BOT</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.botService.pricing.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 16 }}>{content.botService.pricing.headline}</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
          {(['starter', 'growth', 'advanced'] as const).map((planKey) => {
            const plan = content.botService.pricing.plans[planKey];
            return (
              <View key={planKey} style={{ flex: 1, backgroundColor: 'white', borderRadius: 12, padding: 14, borderWidth: plan.recommended ? 1.5 : 0.5, borderColor: plan.recommended ? lime : '#e5e7eb' }}>
                {plan.recommended && (
                  <View style={{ backgroundColor: lime, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 3, alignSelf: 'flex-start', marginBottom: 6 }}>
                    <Text style={{ fontSize: 7, fontWeight: 'bold', color: 'white' }}>Recomendado</Text>
                  </View>
                )}
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: green, marginBottom: 8 }}>{plan.name}</Text>
                {plan.features.map((f, i) => (
                  <View key={i} style={{ flexDirection: 'row', gap: 4, marginBottom: 3, alignItems: 'flex-start' }}>
                    <View style={{ paddingTop: 1 }}><CheckIcon size={8} /></View>
                    <Text style={{ fontSize: 7, color: gray, flex: 1 }}>{f}</Text>
                  </View>
                ))}
              </View>
            );
          })}
        </View>
        <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden' }}>
          <View style={{ flexDirection: 'row', backgroundColor: green, paddingVertical: 10, paddingHorizontal: 12 }}>
            <Text style={{ flex: 1.3, fontSize: 9, fontWeight: 'bold', color: 'white' }}>Conversaciones / Mes</Text>
            <Text style={{ flex: 1, fontSize: 9, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Starter</Text>
            <Text style={{ flex: 1, fontSize: 9, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Growth ★</Text>
            <Text style={{ flex: 1, fontSize: 9, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Advanced</Text>
          </View>
          {content.botService.pricing.tiers.map((tier, i) => (
            <View key={i} style={{ flexDirection: 'row', paddingVertical: 9, paddingHorizontal: 12, backgroundColor: i % 2 !== 0 ? bg : 'white' }}>
              <Text style={{ flex: 1.3, fontSize: 9, fontWeight: 'bold', color: green }}>{tier.contacts}</Text>
              <Text style={{ flex: 1, fontSize: 9, color: gray, textAlign: 'center' }}>{tier.starter}</Text>
              <Text style={{ flex: 1, fontSize: 9, fontWeight: 'bold', color: lime, textAlign: 'center' }}>{tier.growth}</Text>
              <Text style={{ flex: 1, fontSize: 9, color: gray, textAlign: 'center' }}>{tier.advanced}</Text>
            </View>
          ))}
        </View>
        <Text style={{ fontSize: 8, color: grayLight, textAlign: 'center', marginTop: 10 }}>{content.botService.pricing.note}</Text>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 6: Investment Summary */}
      <Page size="A4" style={s.pageBg}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>INVERSIÓN</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.investment.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 24 }}>{content.investment.headline}</Text>

        <View style={{ flexDirection: 'row', gap: 14, marginBottom: 20 }}>
          {/* Phase 1 */}
          <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 14, padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <LayersIcon size={14} />
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: green }}>{content.investment.phase1.title}</Text>
            </View>
            <Text style={{ fontSize: 8, color: grayLight, marginBottom: 14 }}>{content.investment.phase1.subtitle}</Text>
            {content.investment.phase1.items.map((item, i) => (
              <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 9, color: gray, flex: 1, paddingRight: 8 }}>{item.name}</Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: green, flexShrink: 0 }}>{item.price}</Text>
              </View>
            ))}
            <View style={{ borderTopWidth: 0.5, borderTopColor: '#e5e7eb', paddingTop: 10, marginTop: 6 }}>
              <Text style={{ fontSize: 8, color: grayLight, lineHeight: 1.5 }}>{content.investment.phase1.mediaNote}</Text>
              <Text style={{ fontSize: 7, color: grayLight, fontStyle: 'italic', marginTop: 4 }}>{content.investment.phase1.note}</Text>
            </View>
          </View>
          {/* Phase 2 */}
          <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 14, padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <LayersIcon size={14} />
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: green }}>{content.investment.phase2.title}</Text>
            </View>
            <Text style={{ fontSize: 8, color: grayLight, marginBottom: 14 }}>{content.investment.phase2.subtitle}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 9, color: gray, flex: 1, paddingRight: 8 }}>{content.investment.phase2.setup.name}</Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: green, flexShrink: 0 }}>{content.investment.phase2.setup.price}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 9, color: gray, flex: 1, paddingRight: 8 }}>{content.investment.phase2.monthly.name}</Text>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, flexShrink: 0 }}>{content.investment.phase2.monthly.price}</Text>
            </View>
            <View style={{ borderTopWidth: 0.5, borderTopColor: '#e5e7eb', paddingTop: 10, marginTop: 6 }}>
              <Text style={{ fontSize: 7, color: grayLight, fontStyle: 'italic' }}>{content.investment.phase2.note}</Text>
            </View>
          </View>
        </View>

        <Text style={{ fontSize: 8, color: grayLight, textAlign: 'center', lineHeight: 1.5 }}>{content.investment.note}</Text>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 7: Terms */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>TÉRMINOS</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.terms.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 16 }}>{content.terms.headline}</Text>
        {content.terms.sections.map((section, i) => {
          const Icon = iconMap[section.icon] || FileIcon;
          return (
            <View key={i} style={{ backgroundColor: bg, borderRadius: 12, padding: 12, marginBottom: 6, flexDirection: 'row', gap: 12 }}>
              <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: 'rgba(139,195,74,0.15)', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={14} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 2 }}>{section.title}</Text>
                <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{section.description}</Text>
              </View>
            </View>
          );
        })}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 8: Legal Terms */}
      <Page size="A4" style={s.pageBg}>
        <View style={s.accent} />
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 20 }}>{content.legalTerms.title}</Text>
        {content.legalTerms.sections.map((section, i) => (
          <View key={i} style={{ marginBottom: 14 }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginBottom: 6 }}>{section.heading}</Text>
            {section.items.map((item, j) => (
              <View key={j} style={{ flexDirection: 'row', gap: 6, marginBottom: 4, paddingLeft: 8 }}>
                <Text style={{ fontSize: 9, color: gray }}>{j + 1}.</Text>
                <Text style={{ fontSize: 9, color: gray, lineHeight: 1.5, flex: 1 }}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 9: Contact */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0 }}>
        <View style={{ backgroundColor: green, padding: 40, flex: 1 }}>
          <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 8 }}>CONTÁCTENOS</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', marginBottom: 6 }}>{content.contact.title}</Text>
          <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginBottom: 28, lineHeight: 1.5 }}>{content.contact.description}</Text>
          <View style={{ flexDirection: 'row', gap: 40 }}>
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <MailIcon size={16} />
                  <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Email</Text>
                </View>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold', paddingLeft: 26 }}>{content.contact.email}</Text>
              </View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <PhoneIcon size={16} />
                  <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Teléfono</Text>
                </View>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold', paddingLeft: 26 }}>{content.contact.phone}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <MapPinIcon size={16} />
                  <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Ubicación</Text>
                </View>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold', paddingLeft: 26 }}>{content.contact.address}</Text>
              </View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <GlobeIcon size={16} />
                  <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Web</Text>
                </View>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold', paddingLeft: 26 }}>{content.contact.website}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: 'white', paddingVertical: 30, alignItems: 'center' }}>
          <View style={{ width: 150, height: 32, marginBottom: 10 }}>
            <Image src={logoBase64} style={{ objectFit: 'contain' }} />
          </View>
          <View style={{ width: 30, height: 2, backgroundColor: lime, marginBottom: 10 }} />
          <Text style={{ fontSize: 9, color: grayLight, textAlign: 'center' }}>
            Sistemas de crecimiento basados en resultados para negocios listos para escalar.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
