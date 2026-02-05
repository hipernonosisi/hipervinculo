import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/motion';

export default function About() {
  const stats = [
    { value: '$100M+', label: 'Years Managing Ad Spend' },
    { value: '20+', label: 'Years of Experience' },
    { value: '5-8Y', label: 'Clients Retained 5-8 Years' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">About Hipervinculo</h1>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Main Insight */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Hipervinculo was built around a simple realization:
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Most businesses don't fail because they lack marketing. They fail because they lack a system.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Over the last two decades, we've seen the same pattern repeat across industries — service companies, local brands, and eCommerce businesses alike:
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.1}>
              <div className="space-y-4 mb-8">
                <p className="text-lg font-medium">Traffic is not the problem.</p>
                <p className="text-lg font-medium">Clicks are not the problem.</p>
                <p className="text-lg font-medium">Even advertising is rarely the real problem.</p>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6">
                The problem is what happens after someone arrives.
              </p>
              
              <div className="space-y-3 text-muted-foreground mb-8">
                <p>A website that doesn't convert.</p>
                <p>A funnel that isn't structured.</p>
                <p>A lead flow that breaks.</p>
                <p>A business spending money to 'get more traffic' without building the infrastructure to capture demand.</p>
              </div>
              
              <p className="text-xl font-semibold text-accent">
                That is where Hipervinculo comes in.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* We Don't Run Campaigns in Isolation */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                We Don't Run Campaigns in Isolation
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-6">
                Hipervinculo is not an ads-only agency.
              </p>
              <p className="text-lg text-primary-foreground/80 mb-6">
                We build performance-driven growth systems — the kind of infrastructure that turns attention into opportunity and traffic into measurable outcomes.
              </p>
              <div className="space-y-4 text-primary-foreground/80 mb-8">
                <p>Sometimes that means designing a conversion-focused website from the ground up.</p>
                <p>Sometimes it means engineering a lead intake system that makes it easy for prospects to call, inquire, or start a conversation.</p>
                <p>And sometimes it means scaling paid acquisition for brands that are already moving fast and need a partner who understands performance at a deeper level.</p>
              </div>
              <p className="text-lg text-primary-foreground/80 mb-6">
                But the principle is always the same:
              </p>
              <p className="text-xl font-bold text-accent mb-4">
                Ads are fuel. The system is the engine.
              </p>
              <p className="text-lg text-primary-foreground/80">
                Without structure, marketing becomes waste.
              </p>
              <p className="text-lg text-primary-foreground/80">
                With structure, growth becomes repeatable.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Built for Stability */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Built for Businesses That Want Stability
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Many of our clients are not looking for experiments.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                They are looking for something rare in digital marketing:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="text-center p-6">
                  <CardContent className="p-0">
                    <p className="text-4xl font-bold text-accent mb-2">1</p>
                    <p className="text-lg font-medium">Consistency.</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6">
                  <CardContent className="p-0">
                    <p className="text-4xl font-bold text-accent mb-2">2</p>
                    <p className="text-lg font-medium">Clarity.</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6">
                  <CardContent className="p-0">
                    <p className="text-4xl font-bold text-accent mb-2">3</p>
                    <p className="text-lg font-medium">A system that works month after month.</p>
                  </CardContent>
                </Card>
              </div>
              
              <p className="text-lg text-muted-foreground mb-4">
                That is why our relationships tend to last.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Some of our lead generation clients have been with us for five, six, even eight years — not because of contracts, but because the work becomes part of their business infrastructure.
              </p>
              <p className="text-lg font-medium mb-2">We don't build quick wins.</p>
              <p className="text-lg font-medium text-accent">We build foundations that compound.</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Experience Stats */}
      <section className="py-20 bg-accent">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Experience That Goes Beyond Theory
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-5xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-white/90 mt-8 max-w-2xl mx-auto">
              Hipervinculo has managed over $100M in advertising spend across platforms, working with businesses ranging from local service providers to high-growth eCommerce brands.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* The Best Marketing */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                The best marketing is not louder.
              </h2>
              <div className="space-y-3 text-lg mb-8">
                <p className="font-medium">It is cleaner.</p>
                <p className="font-medium">It is structured.</p>
                <p className="font-medium">It is measurable.</p>
                <p className="font-medium text-accent">It is built on conversion architecture, not guesswork.</p>
              </div>
              <p className="text-lg text-muted-foreground">
                We approach growth with the mindset of engineers, not hype.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Who We Work With
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Hipervinculo is built for serious businesses.
              </p>
              <div className="space-y-4 text-lg text-muted-foreground mb-8">
                <p>Companies that already have demand, but want to capture it more effectively.</p>
                <p>Businesses that understand that growth is not a campaign — it is a system.</p>
              </div>
              <div className="space-y-3 text-lg mb-8">
                <p>Whether you are a service-based company looking for predictable inbound leads…</p>
                <p>Or an established brand looking for scalable performance…</p>
              </div>
              <p className="text-lg font-medium">
                Our work is designed around one outcome:
              </p>
              <p className="text-xl font-bold text-accent">
                Building a growth engine that lasts.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The Hipervinculo Standard */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                The Hipervinculo Standard
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe in long-term partnerships, clear execution, and systems that speak for themselves.
              </p>
              <div className="space-y-2 text-lg font-medium mb-8">
                <p>No noise.</p>
                <p>No gimmicks.</p>
                <p>No vanity metrics.</p>
              </div>
              <p className="text-lg text-muted-foreground">
                Just infrastructure, performance, and retention — built with discipline.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to see if your website is built to convert?
              </h2>
              <p className="text-lg text-primary-foreground/80">
                Start a conversation with us. We'll tell you the truth about what's working, what isn't, and what it would take to build a system that generates real opportunities.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl">
                <Link to="/contact">Message Hipervinculo <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
}