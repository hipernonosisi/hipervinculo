import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-background via-light-green to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{t.about.title}</h1>
            <p className="text-xl text-muted-foreground">{t.about.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="h-12 w-12 mx-auto mb-6 text-accent" />
            <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed text-primary-foreground">
              "{t.about.quote}"
            </blockquote>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.about.problems.title}</h2>
            <div className="space-y-4">
              {t.about.problems.items.map((item, index) => (
                <Card key={index} className="border-l-4 border-l-accent">
                  <CardContent className="flex items-center gap-4 p-6">
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                    <p className="text-lg">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">{t.about.section1.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.about.section1.content}</p>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">{t.about.section2.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.about.section2.content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">{t.cta.title}</h2>
            <p className="text-lg text-primary-foreground/80">{t.cta.subtitle}</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/audit">{t.cta.button} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
