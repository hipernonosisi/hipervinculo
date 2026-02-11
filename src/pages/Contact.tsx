import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function Contact() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    howCanWeHelp: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        full_name: formData.fullName,
        company_name: formData.companyName,
        email: formData.email,
        inquiry_type: formData.howCanWeHelp,
        message: formData.message,
      });

      if (error) throw error;

      // Send email notification (don't block on failure)
      supabase.functions.invoke('send-notification', {
        body: {
          type: 'contact',
          language,
          fullName: formData.fullName,
          email: formData.email,
          companyName: formData.companyName,
          inquiryType: formData.howCanWeHelp,
          message: formData.message,
        }
      }).catch(err => console.error('Failed to send email notification:', err));

      setIsSubmitted(true);
      toast({
        title: language === 'en' ? "Message sent!" : "¡Mensaje enviado!",
        description: language === 'en' ? "We'll get back to you within 24 hours." : "Te responderemos en 24 horas.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: language === 'en' ? "Error" : "Error",
        description: language === 'en' ? "Failed to send message. Please try again." : "Error al enviar el mensaje. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-lg mx-auto text-center space-y-6">
              <div className="p-4 rounded-full bg-accent/10 w-fit mx-auto">
                <CheckCircle className="h-12 w-12 text-accent" />
              </div>
              <h1 className="text-3xl font-extrabold">
                {language === 'en' ? 'Thank you!' : '¡Gracias!'}
              </h1>
              <p className="text-lg text-muted-foreground">
                {language === 'en' 
                  ? "We've received your message and will get back to you within 24 hours."
                  : "Hemos recibido tu mensaje y te responderemos en 24 horas."}
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                {language === 'en' ? 'Send another message' : 'Enviar otro mensaje'}
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={t.contact.title}
        description={language === 'en' 
          ? "Get in touch with Hipervínculo. Let's discuss how we can help grow your eCommerce business with data-driven marketing strategies."
          : "Contacta con Hipervínculo. Hablemos de cómo podemos ayudar a crecer tu negocio eCommerce con estrategias de marketing basadas en datos."
        }
        url="https://hipervinculo.net/contact"
      />
      <section 
        className="relative py-28 md:py-36 overflow-hidden"
        style={{ backgroundColor: '#f8f9f5' }}
      >
        {/* Diagonal pattern background */}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-accent font-semibold text-[15px] mb-4">
                {language === 'en' ? 'Contact' : 'Contacto'}
              </p>
              <h1 
                className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {t.contact.title}
              </h1>
              <p className="text-[15px] md:text-[16px] text-muted-foreground max-w-2xl mx-auto">
                {t.contact.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Form Card */}
            <div className="bg-[#f8f9fa] rounded-2xl p-8 md:p-10">
              <h2 className="text-[24px] md:text-[28px] font-extrabold mb-8">
                {language === 'en' ? 'Send us a Message' : 'Envíanos un Mensaje'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder={t.contact.form.fullName}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="bg-white border-border/50 rounded-xl h-12 px-4"
                  />
                  <Input
                    placeholder={t.contact.form.companyName}
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="bg-white border-border/50 rounded-xl h-12 px-4"
                  />
                </div>

                <Input
                  placeholder={t.contact.form.email}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-white border-border/50 rounded-xl h-12 px-4"
                />

                <Select
                  value={formData.howCanWeHelp}
                  onValueChange={(value) => setFormData({ ...formData, howCanWeHelp: value })}
                >
                  <SelectTrigger className="bg-white border-border/50 rounded-xl h-12 px-4">
                    <SelectValue placeholder={t.contact.form.howCanWeHelp} />
                  </SelectTrigger>
                  <SelectContent>
                    {t.contact.form.options.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Textarea
                  placeholder={t.contact.form.message}
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="bg-white border-border/50 rounded-xl px-4 py-3 resize-none"
                />

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl h-12 font-semibold text-[15px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? (language === 'en' ? 'Sending...' : 'Enviando...') 
                    : t.contact.form.submit}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h2 className="text-[24px] md:text-[28px] font-extrabold mb-4">
                  {language === 'en' ? 'Contact Information' : 'Información de Contacto'}
                </h2>
                <p className="text-[15px] text-muted-foreground mb-8">
                  {language === 'en' 
                    ? "We're here to help you grow your business. Get in touch with us through any of the channels below."
                    : "Estamos aquí para ayudarte a hacer crecer tu negocio. Contáctanos a través de cualquiera de los canales a continuación."}
                </p>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <a 
                        href="mailto:info@hipervinculo.net" 
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        info@hipervinculo.net
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{language === 'en' ? 'Phone' : 'Teléfono'}</h3>
                      <a 
                        href="tel:+17865290679" 
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        +1 (786) 529-0679
                      </a>
                    </div>
                  </div>

                  {/* Office */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{language === 'en' ? 'Our Office' : 'Nuestra Oficina'}</h3>
                      <p className="text-muted-foreground">
                        2645 Executive Park Dr, Suite 146<br />
                        Weston, FL 33331
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="pt-6 border-t border-border">
                <h3 className="text-[20px] font-extrabold mb-4">
                  {language === 'en' ? 'Business Hours' : 'Horario de Atención'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-accent" />
                    <span className="text-muted-foreground">
                      {language === 'en' ? 'Monday - Friday: 9:30 AM - 5:30 PM EST' : 'Lunes - Viernes: 9:30 AM - 5:30 PM EST'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-accent" />
                    <span className="text-muted-foreground">
                      {language === 'en' ? 'We typically respond within 24 hours' : 'Normalmente respondemos en 24 horas'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
