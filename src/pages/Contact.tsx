import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function Contact() {
  const { t } = useLanguage();
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

      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
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
              <h1 className="text-3xl font-extrabold">Thank you!</h1>
              <p className="text-lg text-muted-foreground">
                We've received your message and will get back to you within 24 hours.
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                Send another message
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-[#f8f9f5]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-[40px] md:text-[48px] lg:text-[56px] font-extrabold tracking-tight leading-[1.1]">
              {t.contact.title}
            </h1>
            <p className="text-[15px] md:text-[16px] text-muted-foreground max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
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
              <h2 className="text-[24px] md:text-[28px] font-extrabold mb-8">Send us a Message</h2>
              
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
                  {isSubmitting ? 'Sending...' : t.contact.form.submit}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h2 className="text-[24px] md:text-[28px] font-extrabold mb-4">Contact Information</h2>
                <p className="text-[15px] text-muted-foreground mb-8">
                  We're here to help you grow your business. Get in touch with us through any of the channels below.
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
                      <h3 className="font-semibold text-foreground">Phone</h3>
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
                      <h3 className="font-semibold text-foreground">Our Office</h3>
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
                <h3 className="text-[20px] font-extrabold mb-4">Business Hours</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-accent" />
                    <span className="text-muted-foreground">Monday - Friday: 9:30 AM - 5:30 PM EST</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-accent" />
                    <span className="text-muted-foreground">We typically respond within 24 hours</span>
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
