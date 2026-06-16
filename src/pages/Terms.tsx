import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { AnimatedSection } from '@/components/ui/motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Terms() {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const t = {
    title: isEn ? 'Terms of Service' : 'Términos de Servicio',
    lastUpdated: isEn ? 'Last updated: June 16, 2026' : 'Última actualización: 16 de junio de 2026',
    intro: isEn
      ? 'By accessing and using the Hipervínculo website and services, you agree to be bound by these Terms of Service. Please read them carefully before using our services or purchasing our products.'
      : 'Al acceder y usar el sitio web y los servicios de Hipervínculo, aceptas estar sujeto a estos Términos de Servicio. Por favor, léelos cuidadosamente antes de usar nuestros servicios o comprar nuestros productos.',
    sections: [
      {
        title: isEn ? 'Acceptance of Terms' : 'Aceptación de los Términos',
        content: isEn
          ? 'By accessing or using our website and services, you agree to comply with and be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you must not use our website or services.'
          : 'Al acceder o usar nuestro sitio web y servicios, aceptas cumplir y estar sujeto a estos Términos de Servicio y todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestro sitio web o servicios.',
      },
      {
        title: isEn ? 'Description of Services' : 'Descripción de los Servicios',
        content: isEn
          ? 'Hipervínculo provides digital marketing services including website development, Google Ads management, eCommerce growth consulting, lead generation systems, and related digital services. We also offer digital products such as educational guides and eBooks. All service descriptions, pricing, and deliverables are outlined in individual proposals or service agreements. We reserve the right to modify or discontinue any service at any time.'
          : 'Hipervínculo proporciona servicios de marketing digital que incluyen desarrollo de sitios web, gestión de Google Ads, consultoría de crecimiento eCommerce, sistemas de generación de leads y servicios digitales relacionados. También ofrecemos productos digitales como guías educativas y eBooks. Todas las descripciones de servicios, precios y entregables se detallan en propuestas o acuerdos de servicio individuales. Nos reservamos el derecho de modificar o discontinuar cualquier servicio en cualquier momento.',
      },
      {
        title: isEn ? 'Payments and Billing' : 'Pagos y Facturación',
        content: isEn
          ? 'Payment terms for services are specified in individual proposals. Website projects typically require 100% upfront payment. Monthly services (such as ad management) are billed at the beginning of each service period. For digital products, payment is processed at the time of purchase through our secure payment processor. All prices are listed in US Dollars unless otherwise stated. You are responsible for any applicable taxes.'
          : 'Los términos de pago para servicios se especifican en propuestas individuales. Los proyectos de sitios web típicamente requieren pago del 100% por adelantado. Los servicios mensuales (como gestión de anuncios) se facturan al inicio de cada período de servicio. Para productos digitales, el pago se procesa en el momento de la compra a través de nuestro procesador de pagos seguro. Todos los precios están en Dólares Estadounidenses a menos que se indique lo contrario. Eres responsable de cualquier impuesto aplicable.',
      },
      {
        title: isEn ? 'Refunds and Cancellations' : 'Reembolsos y Cancelaciones',
        content: isEn
          ? 'Monthly services can be paused or cancelled with written notice as specified in your service agreement. No long-term contracts are required unless explicitly stated. All digital product purchases, including eBooks and downloadable guides, are final and non-refundable. Once access or download has been granted, we do not offer refunds, exchanges, or credits for any reason.'
          : 'Los servicios mensuales pueden ser pausados o cancelados con aviso por escrito según se especifica en tu acuerdo de servicio. No se requieren contratos a largo plazo a menos que se indique explícitamente. Todas las compras de productos digitales, incluyendo eBooks y guías descargables, son finales y no reembolsables. Una vez que se ha otorgado acceso o descarga, no ofrecemos reembolsos, cambios ni créditos por ningún motivo.',
      },
      {
        title: isEn ? 'Intellectual Property' : 'Propiedad Intelectual',
        content: isEn
          ? 'All content on this website, including text, graphics, logos, and software, is the property of Hipervínculo and protected by copyright and intellectual property laws. Client materials provided to us remain the property of the client. Upon full payment, deliverables created specifically for a client are transferred to the client as outlined in the service agreement.'
          : 'Todo el contenido de este sitio web, incluyendo texto, gráficos, logos y software, es propiedad de Hipervínculo y está protegido por leyes de derechos de autor y propiedad intelectual. Los materiales del cliente que nos proporcionan permanecen siendo propiedad del cliente. Tras el pago completo, los entregables creados específicamente para un cliente son transferidos al cliente según lo detallado en el acuerdo de servicio.',
      },
      {
        title: isEn ? 'Limitation of Liability' : 'Limitación de Responsabilidad',
        content: isEn
          ? 'Hipervínculo shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our services or products. Our total liability for any claim arising out of these terms shall not exceed the amount you paid for the specific service or product giving rise to the claim.'
          : 'Hipervínculo no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos que surjan de o estén relacionados con el uso de nuestros servicios o productos. Nuestra responsabilidad total por cualquier reclamo derivado de estos términos no excederá el monto que pagaste por el servicio o producto específico que dio origen al reclamo.',
      },
      {
        title: isEn ? 'Changes to These Terms' : 'Cambios en Estos Términos',
        content: isEn
          ? 'We may update these Terms of Service from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of our website and services after any changes constitutes your acceptance of the revised terms.'
          : 'Podemos actualizar estos Términos de Servicio de vez en cuando. Cualquier cambio será publicado en esta página con una fecha de vigencia actualizada. Tu uso continuo de nuestro sitio web y servicios después de cualquier cambio constituye tu aceptación de los términos revisados.',
      },
      {
        title: isEn ? 'Contact Us' : 'Contáctanos',
        content: isEn
          ? 'If you have any questions about these Terms of Service, please contact us at info@hipervinculo.net or by mail at 2645 Executive Park Dr, Suite 146, Weston, FL 33331.'
          : 'Si tienes alguna pregunta sobre estos Términos de Servicio, por favor contáctanos en info@hipervinculo.net o por correo a 2645 Executive Park Dr, Suite 146, Weston, FL 33331.',
      },
    ],
  };

  return (
    <Layout>
      <SEO
        title={t.title}
        description={isEn
          ? "Terms of Service for Hipervínculo. Read the terms and conditions governing the use of our website and services."
          : "Términos de Servicio de Hipervínculo. Lee los términos y condiciones que rigen el uso de nuestro sitio web y servicios."
        }
        url="https://hipervinculo.net/terms"
        noIndex={false}
      />
      <section 
        className="relative py-28 md:py-36 overflow-hidden"
        style={{ backgroundColor: '#f8f9f5' }}
      >
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #2d4a2d 0px,
              #2d4a2d 1px,
              transparent 1px,
              transparent 12px
            )`
          }}
        />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <AnimatedSection>
              <p className="text-accent font-semibold text-[15px] mb-4">Legal</p>
              <h1 
                className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {t.title}
              </h1>
              <p className="text-[15px] md:text-[16px] text-muted-foreground max-w-2xl mx-auto">
                {t.lastUpdated}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-12">
            <AnimatedSection>
              <p className="text-[17px] text-muted-foreground leading-relaxed">
                {t.intro}
              </p>
            </AnimatedSection>

            {t.sections.map((section, i) => (
              <AnimatedSection key={section.title} delay={0.1 + i * 0.1}>
                <div className="space-y-4">
                  <h2 
                    className="text-[28px] md:text-[32px] leading-[1.2] tracking-[-0.02em]"
                    style={{ fontWeight: 800, color: '#2d4a2d' }}
                  >
                    {section.title}
                  </h2>
                  <p className="text-[17px] text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
