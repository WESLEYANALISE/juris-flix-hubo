
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Monitor, Play, ArrowLeft } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';

export const AssistenteIA = () => {
  const { setCurrentFunction } = useNavigation();
  const { functions } = useAppFunctions();
  
  // Encontrar o link do Assistente IA na tabela
  const assistenteIAFunction = functions.find(func => 
    func.funcao.toLowerCase().includes('assistente') && 
    func.funcao.toLowerCase().includes('ia')
  );

  const handleWhatsAppClick = () => {
    window.open('https://api.whatsapp.com/send/?phone=5511940432865&text=Ol%C3%A1%2C+Evelyn%21+Poderia+me+ajudar?&type=phone_number&app_absent=0', '_blank');
  };

  const handleAppClick = () => {
    if (assistenteIAFunction?.link) {
      window.open(assistenteIAFunction.link, '_blank');
    }
  };

  const handleVideoClick = () => {
    window.open('https://youtu.be/HlE9u1c_MPQ', '_blank');
  };

  const handleBack = () => {
    setCurrentFunction(null);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBack}
            className="text-foreground hover:bg-red-500/10 hover:text-red-400"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Assistente IA Jurídico</h1>
            <p className="text-muted-foreground">Escolha como deseja interagir com nosso assistente</p>
          </div>
        </div>

        {/* Video Section */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Ver Funcionalidades</h3>
                <p className="text-muted-foreground">
                  Conheça todas as capacidades do nosso Assistente IA
                </p>
              </div>
              <Button 
                onClick={handleVideoClick}
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Assistir Vídeo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* WhatsApp Option */}
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={handleWhatsAppClick}>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <MessageCircle className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-xl">WhatsApp</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Converse diretamente com nossa assistente Evelyn via WhatsApp para tirar dúvidas jurídicas
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Atendimento humanizado</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Respostas rápidas</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Disponível 24/7</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Option */}
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={handleAppClick}>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <Monitor className="h-8 w-8 text-blue-500" />
              </div>
              <CardTitle className="text-xl">Aplicativo</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Acesse o assistente IA diretamente no aplicativo com interface completa e recursos avançados
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Interface completa</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Recursos avançados</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Histórico de conversas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-3">Sobre o Assistente IA Jurídico</h3>
            <p className="text-muted-foreground">
              Nosso assistente de inteligência artificial foi especialmente treinado em Direito brasileiro, 
              capaz de responder dúvidas jurídicas, auxiliar na elaboração de peças processuais, 
              esclarecer conceitos legais e muito mais. Escolha a forma de interação que melhor se adapta às suas necessidades.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
