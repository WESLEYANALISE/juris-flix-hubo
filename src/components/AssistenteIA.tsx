
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Monitor, Play, X, Brain, Zap } from 'lucide-react';
import { useAppFunctions } from '@/hooks/useAppFunctions';

export const AssistenteIA = () => {
  const { functions } = useAppFunctions();
  const [showVideo, setShowVideo] = useState(false);
  
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
      // Se tiver link, abrir em iframe interno
      window.open(assistenteIAFunction.link, '_blank');
    }
  };

  const handleVideoClick = () => {
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold gradient-text mb-2">Assistente IA Jurídico</h1>
          <p className="text-muted-foreground">Duas formas de acessar nossa inteligência artificial especializada em Direito</p>
        </div>

        {/* Video Button */}
        <div className="mb-8 text-center">
          <Button 
            onClick={handleVideoClick}
            variant="outline"
            className="flex items-center gap-2 mx-auto border-red-500/30 text-red-500 hover:bg-red-500/10"
          >
            <Play className="h-4 w-4" />
            Ver Funcionalidades do Assistente IA
          </Button>
        </div>

        {/* Options Grid - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* WhatsApp Option */}
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group h-full border-green-500/20 hover:border-green-500/40" onClick={handleWhatsAppClick}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors relative">
                <MessageCircle className="h-8 w-8 text-green-500" />
                <Brain className="h-4 w-4 text-green-600 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
              </div>
              <CardTitle className="text-xl text-green-600 flex items-center justify-center gap-2">
                <span>WhatsApp IA</span>
                <Zap className="h-4 w-4 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <p className="text-muted-foreground mb-6 text-sm">
                <strong>Assistente IA Evelyn</strong> - Inteligência artificial jurídica via WhatsApp com respostas instantâneas
              </p>
              <div className="space-y-3 text-sm text-muted-foreground mb-6">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>🤖 Inteligência Artificial Avançada</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>⚡ Respostas instantâneas</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>🕐 Disponível 24/7</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>⚖️ Especializada em Direito</span>
                </div>
              </div>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                <MessageCircle className="h-4 w-4 mr-2" />
                Conversar com IA
              </Button>
            </CardContent>
          </Card>

          {/* App Option */}
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group h-full border-blue-500/20 hover:border-blue-500/40" onClick={handleAppClick}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors relative">
                <Monitor className="h-8 w-8 text-blue-500" />
                <Brain className="h-4 w-4 text-blue-600 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
              </div>
              <CardTitle className="text-xl text-blue-600 flex items-center justify-center gap-2">
                <span>Aplicativo IA</span>
                <Zap className="h-4 w-4 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <p className="text-muted-foreground mb-6 text-sm">
                <strong>Assistente IA Completo</strong> - Interface avançada com recursos extras e histórico completo
              </p>
              <div className="space-y-3 text-sm text-muted-foreground mb-6">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>🤖 Inteligência Artificial Premium</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>🖥️ Interface completa</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>📁 Histórico de conversas</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>⚡ Recursos avançados</span>
                </div>
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <Monitor className="h-4 w-4 mr-2" />
                Acessar IA Completa
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="border-red-500/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-3 text-center flex items-center justify-center gap-2">
              <Brain className="h-5 w-5 text-red-500" />
              Sobre nossa Inteligência Artificial Jurídica
            </h3>
            <p className="text-muted-foreground text-center">
              Ambas as opções utilizam nossa <strong>IA avançada especializada em Direito brasileiro</strong>, 
              treinada para responder dúvidas jurídicas, auxiliar na elaboração de peças processuais, 
              esclarecer conceitos legais e muito mais. A diferença está na interface e recursos adicionais.
            </p>
          </CardContent>
        </Card>

        {/* Video Modal */}
        {showVideo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg w-full max-w-4xl h-[70vh] relative">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">Funcionalidades do Assistente IA</h3>
                <Button variant="ghost" size="icon" onClick={closeVideo}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 h-full">
                <iframe 
                  src="https://www.youtube.com/embed/HlE9u1c_MPQ" 
                  className="w-full h-full rounded"
                  title="Funcionalidades do Assistente IA"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
