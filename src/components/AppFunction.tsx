
import { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';
import { useToast } from '@/hooks/use-toast';
import { ErrorState } from '@/components/ErrorState';

export const AppFunction = () => {
  const { currentFunction, clearCurrentFunction } = useNavigation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (currentFunction) {
      setIsLoading(true);
      setHasError(false);
      
      // Simulate loading time
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Simulate random errors for demo
        if (Math.random() > 0.8) {
          setHasError(true);
          toast({
            variant: "destructive",
            title: "Erro de Conexão",
            description: "Não foi possível carregar a funcionalidade. Tente novamente.",
          });
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [currentFunction, toast]);

  const handleGoBack = () => {
    clearCurrentFunction();
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    
    setTimeout(() => {
      setIsLoading(false);
      setHasError(false);
      toast({
        title: "Conectado",
        description: "Funcionalidade carregada com sucesso!",
      });
    }, 1000);
  };

  if (!currentFunction) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
        <div className="flex items-center gap-4 px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoBack}
            className="hover:bg-background/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          
          <div className="flex-1">
            <h1 className="font-semibold text-lg gradient-text-legal">
              {currentFunction}
            </h1>
            <p className="text-sm text-muted-foreground">
              Funcionalidade especializada em Direito
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Abrir em Nova Aba
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] p-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Carregando...</h2>
            <p className="text-muted-foreground text-center max-w-md">
              Conectando com {currentFunction}. Isso pode levar alguns segundos.
            </p>
          </div>
        ) : hasError ? (
          <ErrorState
            title="Falha na Conexão"
            description={`Não foi possível conectar com ${currentFunction}. Verifique sua conexão com a internet e tente novamente.`}
            onRetry={handleRetry}
            onGoHome={handleGoBack}
          />
        ) : (
          <div className="p-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-xl border border-border/50 p-8 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h2 className="text-2xl font-bold mb-4 gradient-text-legal">
                  {currentFunction} Carregado!
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  A funcionalidade foi carregada com sucesso. Em uma implementação real, 
                  aqui seria exibido o conteúdo específico da ferramenta jurídica.
                </p>
                
                <div className="flex gap-4 justify-center">
                  <Button onClick={handleGoBack}>
                    Voltar ao Menu
                  </Button>
                  <Button variant="outline">
                    Abrir Tutorial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
