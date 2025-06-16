
import { FeaturesCarousel } from '@/components/FeaturesCarousel';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { FooterMenu } from '@/components/FooterMenu';
import { StatsSection } from '@/components/StatsSection';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Scale, Menu } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="text-foreground hover:bg-secondary/50"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                  <Scale className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">LegalStudy</h1>
                  <p className="text-xs text-muted-foreground">Plataforma Jurídica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20">
        {/* Carousel Section - Menor */}
        <section className="px-4 md:px-8 mb-6">
          <div className="max-w-7xl mx-auto">
            <FeaturesCarousel />
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Features Grid */}
        <FeaturesGrid />

        {/* CTA Section - Mais minimalista */}
        <section className="py-12 px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Sua Carreira Jurídica Começa Aqui
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
              Acesse milhares de materiais jurídicos atualizados e prepare-se para o sucesso.
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3">
              Começar Gratuitamente
            </Button>
          </div>
        </section>
      </main>

      {/* Footer Menu */}
      <FooterMenu />
    </div>
  );
};

export default Index;
