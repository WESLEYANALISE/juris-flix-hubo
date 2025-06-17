
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-border/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-3 sm:py-4">
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
                {functionData?.funcao || currentFunction}
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
      <main className="pt-16 sm:pt-20 pb-20 sm:pb-24 px-3 sm:px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text">
              {functionData?.funcao}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {functionData?.descricao || 'Funcionalidade em desenvolvimento'}
            </p>
            
            {functionData?.link && (
              <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl p-6 sm:p-8">
                <p className="text-sm text-muted-foreground mb-4">
                  Link da função:
                </p>
                <a 
                  href={functionData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 underline break-all"
                >
                  {functionData.link}
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
