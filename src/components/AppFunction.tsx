
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
import { AssistenteIA } from '@/components/AssistenteIA';
import { Suporte } from '@/components/Suporte';
import { useEffect, useState } from 'react';

export const AppFunction = () => {
  const { currentFunction, setCurrentFunction } = useNavigation();
  const { functions, loading } = useAppFunctions();
  const [functionData, setFunctionData] = useState<any>(null);
  
  useEffect(() => {
    console.log('AppFunction - currentFunction:', currentFunction);
    console.log('AppFunction - functions:', functions);
    
    if (currentFunction && functions.length > 0) {
      // Buscar função na base de dados
      const func = functions.find(f => f.funcao === currentFunction);
      console.log('AppFunction - functionData encontrada:', func);
      setFunctionData(func || null);
    } else {
      setFunctionData(null);
    }
  }, [currentFunction, functions]);
  
  const handleBack = () => {
    setCurrentFunction(null);
  };
  
  if (!currentFunction || loading) {
    return null;
  }

  // Componentes específicos para funções customizadas (sempre prioritários)
  const renderSpecificComponent = () => {
    console.log('AppFunction - renderSpecificComponent para:', currentFunction);
    
    // Verificar por nome exato primeiro
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
      case 'Assistente IA Jurídica':
      case 'Assistente IA':
        return <AssistenteIA />;
      case 'Suporte':
        return <Suporte />;
      case 'Dashboard':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold mb-4 gradient-text">Dashboard</h2>
              <p className="text-muted-foreground">Painel principal em desenvolvimento</p>
            </div>
          </div>
        );
      case 'Favoritos':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold mb-4 gradient-text">Favoritos</h2>
              <p className="text-muted-foreground">Seus itens favoritos aparecerão aqui</p>
            </div>
          </div>
        );
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
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 sm:py-4 py-[10px] bg-zinc-950">
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

  // Para funções da tabela APP que têm link válido, mostrar o iframe
  if (functionData && functionData.link && functionData.link.trim() !== '') {
    console.log('AppFunction - Renderizando iframe para:', functionData.funcao, 'Link:', functionData.link);
    
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
          <iframe 
            src={functionData.link} 
            className="w-full h-full border-0" 
            title={functionData.funcao}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
            loading="lazy"
          />
        </main>
      </div>
    );
  }

  // Para funções que não têm componente específico nem link válido
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
            </div>
          </div>
        </div>
      </header>

      {/* Content for functions without specific components or links */}
      <main className="pt-16 sm:pt-20 h-screen">
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {currentFunction}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {functionData?.descricao || 'Funcionalidade em desenvolvimento'}
            </p>
            {!functionData && (
              <p className="text-sm text-amber-400">
                Esta função será implementada em breve
              </p>
            )}
            {functionData && (!functionData.link || functionData.link.trim() === '') && (
              <p className="text-sm text-amber-400">
                Link em configuração
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
