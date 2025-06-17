import { FeaturesCarousel } from '@/components/FeaturesCarousel';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { FooterMenu } from '@/components/FooterMenu';
import { StatsSection } from '@/components/StatsSection';
import { Sidebar } from '@/components/Sidebar';
import { AppFunction } from '@/components/AppFunction';
import { Button } from '@/components/ui/button';
import { Scale, Menu, Award } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '@/context/NavigationContext';
const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    isInFunction
  } = useNavigation();

  // If we're in a function, show the function component
  if (isInFunction) {
    return <AppFunction />;
  }
  return <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Enhanced Header - Mobile Optimized */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-border/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="text-foreground hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10">
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <div className="flex items-center gap-2 sm:gap-3 animate-fade-in-up">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                  <Scale className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold gradient-text">LegalStudy Pro</h1>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 hidden sm:flex">
                    <Award className="h-3 w-3" />
                    Plataforma Jurídica Certificada
                  </p>
                </div>
              </div>
            </div>
            
            {/* Professional badge - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              
              <span className="text-xs font-medium text-red-400">Certificado OAB</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with enhanced spacing - Mobile Optimized */}
      <main className="pt-16 sm:pt-20 pb-20 sm:pb-24">
        {/* Carousel Section - Mobile Optimized */}
        <section className="px-3 sm:px-4 md:px-8 mb-6 sm:mb-8">
          <div className="max-w-7xl mx-auto">
            <FeaturesCarousel />
          </div>
        </section>

        {/* Stats Section with animations */}
        <StatsSection />

        {/* Features Grid with enhanced styling */}
        <FeaturesGrid />

        {/* Enhanced CTA Section - Mobile Optimized */}
        <section className="py-12 sm:py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 gradient-text">
                Sua Carreira Jurídica no Próximo Nível
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
                Acesse milhares de materiais jurídicos atualizados, ferramentas de IA especializadas e prepare-se para o sucesso profissional.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover-glow">
                Começar Gratuitamente
              </Button>
              
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 hover:scale-105">
                Agendar Demonstração
              </Button>
            </div>
            
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Teste grátis por 7 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Sem compromisso</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Suporte especializado</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer Menu */}
      <FooterMenu />
    </div>;
};
export default Index;