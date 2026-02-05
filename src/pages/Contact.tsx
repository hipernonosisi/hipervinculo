import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

  const contactInfo = [
    { icon: Mail, label: t.contact.info.email, href: `mailto:${t.contact.info.email}` },
    { icon: Phone, label: t.contact.info.phone, href: `tel:${t.contact.info.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: t.contact.info.address },
    { icon: Clock, label: t.contact.info.hours },
  ];

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-lg mx-auto text-center space-y-6">
              <div className="p-4 rounded-full bg-accent/10 w-fit mx-auto">
                <CheckCircle className="h-12 w-12 text-accent" />
              </div>
              <h1 className="text-3xl font-bold">Thank you!</h1>
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
      <section className="py-20 md:py-28 bg-gradient-to-br from-background via-light-green to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{t.contact.title}</h1>
            <p className="text-xl text-muted-foreground">{t.contact.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t.contact.form.submit.replace('Send', 'Send us a')} message</CardTitle>
                <CardDescription>Fill out the form below and we'll respond within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{t.contact.form.fullName}</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">{t.contact.form.companyName}</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t.contact.form.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="howCanWeHelp">{t.contact.form.howCanWeHelp}</Label>
                    <Select
                      value={formData.howCanWeHelp}
                      onValueChange={(value) => setFormData({ ...formData, howCanWeHelp: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {t.contact.form.options.map((option, index) => (
                          <SelectItem key={index} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t.contact.form.message}</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : t.contact.form.submit}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <info.icon className="h-5 w-5 text-accent" />
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-foreground hover:text-accent transition-colors"
                        >
                          {info.label}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">{info.label}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Remote-first agency</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
