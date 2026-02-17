import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Users } from 'lucide-react';
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

// Anti-bot: record form load time
const MINIMUM_SUBMIT_TIME_MS = 3000;

export default function Contact() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    howCanWeHelp: '',
    message: '',
  });

  // Anti-bot: honeypot field + timing
  const [honeypot, setHoneypot] = useState('');
  const [formLoadTime] = useState(() => Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check: if filled, it's a bot
    if (honeypot) {
      navigate('/thank-you/contact');
      return;
    }

    // Timing check: if submitted too fast, likely a bot
    if (Date.now() - formLoadTime < MINIMUM_SUBMIT_TIME_MS) {
      toast({
        title: language === 'en' ? "Please wait" : "Por favor espera",
        description: language === 'en' ? "Please take a moment to fill out the form." : "Por favor tómate un momento para llenar el formulario.",
        variant: "destructive",
      });
      return;
    }

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
          phone: formData.phone,
          inquiryType: formData.howCanWeHelp,
          message: formData.message,
        }
      }).catch(err => console.error('Failed to send email notification:', err));

      navigate('/thank-you/contact');
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

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder={t.contact.form.email}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-white border-border/50 rounded-xl h-12 px-4"
                />
                <Input
                  placeholder={t.contact.form.phone}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-white border-border/50 rounded-xl h-12 px-4"
                />
              </div>

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

                {/* Honeypot field - hidden from real users */}
                <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
                  <Input
                    type="text"
                    name="website_url"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

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
