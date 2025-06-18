
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';
import { NoticiasJuridicas } from '@/components/NoticiasJuridicas';
import { Downloads } from '@/components/Downloads';
import { PlataformaDesktop } from '@/components/PlataformaDesktop';
import { Videoaulas } from '@/components/Videoaulas';
import { Anotacoes } from '@/components/Anotacoes';
import { Explorar } from '@/components/Explorar';
import { useEffect, useState } from 'react';

export const AppFunction = () => {
  const { currentFunction, setCurrentFunction } = useNavigation();
  const { functions, loading } = useAppFunctions();
  const [functionData, setFunctionData] = useState<any>(null);

  useEffect(() => {
    if (currentFunction && functions.length > 0) {
      const func = functions.find(f => f.funcao === currentFunction);
      setFunctionData(func);
    }
  }, [currentFunction, functions]);

  const handleBack = () => {
    setCurrentFunction(null);
  };

  if (!currentFunction || loading) {
    return null;
  }

  // Componentes específicos para cada função
  const renderSpecificComponent = () => {
    switch (currentFunction) {
      case 'Videoaulas':
        return <Videoaulas />;
      case 'Notícias Jurídicas':
        return <NoticiasJuridicas />;
      case 'Downloads':
        return <Downloads />;
      case 'Plataforma Desktop':
        return <PlataformaDesktop />;
      case 'Anotações':
        return <Anotacoes />;
      case 'Explorar':
        return <Explorar />;
      default:
        return null;
    }
  };

  const specificComponent = renderSpecificComponent();

  // Se há um componente específico, renderizar com layout completo
  if (specificComponent) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header with back button */}
        <header className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-border/30">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 sm:py-4 py-[10px]">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBack}
                className="text-foreground hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold gradient-text">
                  {currentFunction}
                </h1>
                {functionData?.descricao && (
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {functionData.descricao}
                  </p>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="pt-16 sm:pt-20">
          {specificComponent}
        </main>
      </div>
    );
  }

  // Para outras funções, mostrar o iframe ou conteúdo padrão
  if (!functionData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Função não encontrada</h2>
          <p className="text-muted-foreground mb-4">A função "{currentFunction}" não foi encontrada na base de dados.</p>
          <Button onClick={handleBack} variant="outline">
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-border/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 sm:py-4 py-[10px]">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              className="text-foreground hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold gradient-text">
                {functionData.funcao}
              </h1>
              {functionData.descricao && (
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {functionData.descricao}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* WebView Content */}
      <main className="pt-16 sm:pt-20 h-screen">
        {functionData.link ? (
          <iframe
            src={functionData.link}
            className="w-full h-full border-0"
            title={functionData.funcao}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold mb-4 gradient-text">
                {functionData.funcao}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {functionData.descricao || 'Funcionalidade em desenvolvimento'}
              </p>
              <p className="text-sm text-red-400">
                Link não disponível para esta função
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
