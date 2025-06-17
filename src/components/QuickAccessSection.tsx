import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';
import { 
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Book,
  Bot,
  Headphones,
  Library,
  Monitor,
  Scale,
  Play,
  Folder,
  Newspaper,
  Film
} from 'lucide-react';

// Get first 8 most common functions for quick access
const getMostUsedFunctions = (functions: any[]) => {
  return functions.slice(0, 8); // First 8 functions from table
};

const getColorForIndex = (index: number) => {
  const colors = [
    'gradient-legal',     // Gold for legal content
    'gradient-ai',        // Cyan for AI/tech
    'gradient-study',     // Blue for study materials
    'gradient-media',     // Purple for media content
    'gradient-docs',      // Green for documents
    'gradient-legal',     // Back to gold
    'gradient-ai',        // Cyan
    'gradient-study'      // Blue
  ];
  return colors[index % colors.length];
};

const getIconForFunction = (funcao: string) => {
  const name = funcao.toLowerCase();
  
  // Improved icon mapping for better function representation
  if (name.includes('assistente') && name.includes('ia')) return Bot;
  if (name.includes('biblioteca')) return Library;
  if (name.includes('audio') || name.includes('áudio')) return Headphones;
  if (name.includes('mapa') && name.includes('mental')) return GitBranch;
  if (name.includes('plataforma') && name.includes('desktop')) return Monitor;
  if (name.includes('vade') || name.includes('mecum')) return Book;
  
  // Fallback icons
  if (name.includes('flashcard') || name.includes('flash card')) return GitBranch;
  if (name.includes('resumo')) return Book;
  if (name.includes('video') || name.includes('vídeo') || name.includes('aula')) return Play;
  if (name.includes('petições') || name.includes('peticoes') || name.includes('petição')) return Folder;
  if (name.includes('noticia') || name.includes('notícia') || name.includes('juridica')) return Newspaper;
  if (name.includes('juriflix') || name.includes('filme') || name.includes('cinema')) return Film;
  return Bot; // default icon
};

export const QuickAccessSection = () => {
  const { setCurrentFunction } = useNavigation();
  const { functions, loading } = useAppFunctions();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleQuickAccess = (funcao: string) => {
    setCurrentFunction(funcao);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -160, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 160, behavior: 'smooth' });
    }
  };

  const quickAccessFunctions = getMostUsedFunctions(functions);

  if (loading || quickAccessFunctions.length === 0) {
    return null;
  }

  return (
    <section className="py-6 sm:py-8 px-4 md:px-8 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-2 gradient-text-legal">
            Acesso Rápido
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Funcionalidades mais utilizadas
          </p>
        </div>

        <div className="relative">
          {/* Enhanced navigation buttons with legal styling */}
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 glass-effect-legal hover:bg-background border border-border/50 shadow-lg h-8 w-8 hidden sm:flex hover-glow-legal"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 glass-effect-legal hover:bg-background border border-border/50 shadow-lg h-8 w-8 hidden sm:flex hover-glow-legal"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Enhanced carousel container */}
          <div 
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide py-2 px-2 sm:px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {quickAccessFunctions.map((func, index) => {
              const colorClass = getColorForIndex(index);
              const Icon = getIconForFunction(func.funcao);
              
              return (
                <div
                  key={func.id}
                  className="flex-shrink-0 group cursor-pointer"
                  onClick={() => handleQuickAccess(func.funcao)}
                >
                  <div className="flex flex-col items-center gap-2">
                    {/* Enhanced circular button with legal styling */}
                    <div className={`
                      w-14 h-14 sm:w-16 sm:h-16 rounded-full ${colorClass}
                      flex items-center justify-center card-depth-2 hover-lift-legal
                      group-hover:scale-110 transition-all duration-300 
                      border border-white/20 group-hover:border-white/40
                      relative overflow-hidden
                    `}>
                      {/* Enhanced background glow effect */}
                      <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-sm relative z-10" />
                      
                      {/* Professional glow ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-white/0 group-hover:border-white/30 transition-all duration-300" />
                    </div>
                    
                    {/* Enhanced label with legal typography */}
                    <span className="text-xs font-medium text-center text-foreground group-hover:text-primary transition-colors duration-300 max-w-[4rem] sm:max-w-[5rem] line-clamp-2-fade">
                      {func.funcao.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
