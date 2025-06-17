import { Card, CardContent } from '@/components/ui/card';
import { useAppFunctions } from '@/hooks/useAppFunctions';
import { useNavigation } from '@/context/NavigationContext';
import { 
  ArrowRight, 
  GitBranch,
  Book,
  Bot,
  Headphones,
  Library,
  Monitor,
  // ... keep existing code (other lucide imports remain the same)
} from 'lucide-react';

const getIconForFunction = (funcao: string) => {
  const name = funcao.toLowerCase();
  
  // Enhanced icon mapping for better function representation
  if (name.includes('assistente') && name.includes('ia')) return Bot;
  if (name.includes('biblioteca')) return Library;
  if (name.includes('audio') || name.includes('áudio')) return Headphones;
  if (name.includes('mapa') && name.includes('mental')) return GitBranch;
  if (name.includes('plataforma') && name.includes('desktop')) return Monitor;
  if (name.includes('vade') || name.includes('mecum')) return Book;
  
  // ... keep existing code (fallback icon logic remains the same)
  return Bot;
};

const getColorForFunction = (index: number) => {
  const colors = [
    'gradient-legal',     // Gold for legal content
    'gradient-ai',        // Cyan for AI/tech
    'gradient-study',     // Blue for study materials
    'gradient-media',     // Purple for media content
    'gradient-docs',      // Green for documents
    'gradient-legal',     // Back to gold
    'gradient-ai',        // Cyan
    'gradient-study',     // Blue
    'gradient-media',     // Purple
    'gradient-docs',      // Green
    'gradient-legal',     // Gold
    'gradient-ai'         // Cyan
  ];
  return colors[index % colors.length];
};

export const FeaturesGrid = () => {
  const { functions, loading } = useAppFunctions();
  const { setCurrentFunction } = useNavigation();

  const handleFunctionClick = (funcao: string) => {
    setCurrentFunction(funcao);
  };

  // Sort functions by id to maintain table order
  const sortedFunctions = [...functions].sort((a, b) => a.id - b.id);

  if (loading) {
    return (
      <div className="py-12 sm:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text-legal">
              Ferramentas Jurídicas Profissionais
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Carregando funcionalidades...
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse neomorphism-legal">
                <CardContent className="p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-600 rounded-xl"></div>
                  <div className="h-4 bg-gray-600 rounded mb-2"></div>
                  <div className="h-3 bg-gray-600 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 animate-slide-up-legal">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text-legal">
            Ferramentas Jurídicas Profissionais
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Acesse todas as funcionalidades desenvolvidas especialmente para profissionais e estudantes do Direito
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {sortedFunctions.map((func, index) => {
            const Icon = getIconForFunction(func.funcao);
            const colorClass = getColorForFunction(index);
            
            return (
              <Card 
                key={func.id} 
                className="card-legal group cursor-pointer border-border/30 bg-card/60 backdrop-blur-sm hover:bg-card/90 overflow-hidden animate-scale-glow"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleFunctionClick(func.funcao)}
              >
                <CardContent className="p-4 sm:p-6 text-center relative">
                  {/* Enhanced background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl ${colorClass} flex items-center justify-center group-hover:scale-105 transition-all duration-300 card-depth-2 group-hover:card-depth-3 relative`}>
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white drop-shadow-sm" />
                    
                    {/* Enhanced hover arrow with legal styling */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 card-depth-1">
                      <ArrowRight className="h-2 w-2 sm:h-3 sm:w-3 text-gray-800" />
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {func.funcao}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300 line-clamp-2-fade">
                    {func.descricao || 'Funcionalidade especializada para estudos jurídicos'}
                  </p>

                  {/* Enhanced interactive border effect */}
                  <div className="absolute inset-0 rounded-lg border border-primary/0 group-hover:border-primary/20 transition-all duration-300" />
                  
                  {/* Professional glow effect on hover */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hover-glow-legal" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {sortedFunctions.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhuma função encontrada. Verifique a configuração da base de dados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
