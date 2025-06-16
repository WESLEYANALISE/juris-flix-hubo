
import { FeaturesCarousel } from '@/components/FeaturesCarousel';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { FooterMenu } from '@/components/FooterMenu';
import { StatsSection } from '@/components/StatsSection';
import { Button } from '@/components/ui/button';
import { Scale, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Scale className="h-6 w-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">LegalStudy</h1>
                <p className="text-sm text-muted-foreground">Sua plataforma jurídica</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-black font-semibold">
              <Sparkles className="h-4 w-4 mr-2" />
              Premium
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-20">
        {/* Carousel Section */}
        <section className="px-4 md:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <FeaturesCarousel />
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Features Grid */}
        <FeaturesGrid />

        {/* CTA Section */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
              Transforme Sua Carreira Jurídica
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de estudantes que já conquistaram suas aprovações com nossa plataforma completa de estudos jurídicos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-black font-semibold px-8 py-4 text-lg">
                Começar Gratuitamente
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg">
                Ver Planos
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Menu */}
      <FooterMenu />
    </div>
  );
};

export default Index;
