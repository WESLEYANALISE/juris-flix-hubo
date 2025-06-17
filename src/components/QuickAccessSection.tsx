
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Calculator, 
  Clock, 
  Star,
  Zap,
  Target,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  PenTool,
  Scale,
  Users
} from 'lucide-react';

const quickAccessItems = [
  {
    id: 'pesquisa-rapida',
    title: 'Pesquisa',
    icon: Search,
    color: 'from-blue-500 to-blue-600',
    action: 'Vade Mecum'
  },
  {
    id: 'resumos',
    title: 'Resumos',
    icon: BookOpen,
    color: 'from-emerald-500 to-emerald-600',
    action: 'Resumos Jurídicos'
  },
  {
    id: 'questoes',
    title: 'Questões',
    icon: Target,
    color: 'from-purple-500 to-purple-600',
    action: 'Banco de Questões'
  },
  {
    id: 'calculadora',
    title: 'Calculadora',
    icon: Calculator,
    color: 'from-amber-500 to-amber-600',
    action: 'Calculadora Jurídica'
  },
  {
    id: 'cronometro',
    title: 'Cronômetro',
    icon: Clock,
    color: 'from-red-500 to-red-600',
    action: 'Cronômetro'
  },
  {
    id: 'favoritos',
    title: 'Favoritos',
    icon: Star,
    color: 'from-yellow-500 to-yellow-600',
    action: 'Favoritos'
  },
  {
    id: 'simulados',
    title: 'Simulados',
    icon: Zap,
    color: 'from-indigo-500 to-indigo-600',
    action: 'Simulados OAB'
  },
  {
    id: 'peticoes',
    title: 'Petições',
    icon: FileText,
    color: 'from-teal-500 to-teal-600',
    action: 'Modelos de Petições'
  },
  {
    id: 'marcadores',
    title: 'Marcadores',
    icon: Bookmark,
    color: 'from-pink-500 to-pink-600',
    action: 'Marcadores'
  },
  {
    id: 'redacao',
    title: 'Redação',
    icon: PenTool,
    color: 'from-orange-500 to-orange-600',
    action: 'Redação Jurídica'
  },
  {
    id: 'jurisprudencia',
    title: 'Jurisprudência',
    icon: Scale,
    color: 'from-cyan-500 to-cyan-600',
    action: 'Jurisprudência'
  },
  {
    id: 'comunidade',
    title: 'Comunidade',
    icon: Users,
    color: 'from-violet-500 to-violet-600',
    action: 'Comunidade'
  }
];

export const QuickAccessSection = () => {
  const { setCurrentFunction } = useNavigation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleQuickAccess = (action: string) => {
    setCurrentFunction(action);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 sm:py-12 px-4 md:px-8 bg-gradient-to-b from-background to-card/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 gradient-text">
            Funções de Acesso Rápido
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Acesse rapidamente as ferramentas mais utilizadas
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50 shadow-lg h-8 w-8 sm:h-10 sm:w-10 hidden sm:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50 shadow-lg h-8 w-8 sm:h-10 sm:w-10 hidden sm:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Carousel container */}
          <div 
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide py-4 px-2 sm:px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {quickAccessItems.map((item, index) => {
              const Icon = item.icon;
              
              return (
                <div
                  key={item.id}
                  className="flex-shrink-0 group cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => handleQuickAccess(item.action)}
                >
                  <div className="flex flex-col items-center gap-2">
                    {/* Circular button */}
                    <div className={`
                      w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${item.color} 
                      flex items-center justify-center shadow-lg hover:shadow-xl 
                      group-hover:scale-110 transition-all duration-300 
                      border-2 border-white/20 group-hover:border-white/40
                      relative overflow-hidden
                    `}>
                      {/* Background glow effect */}
                      <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-sm relative z-10" />
                      
                      {/* Pulse effect */}
                      <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 group-hover:animate-ping" />
                    </div>
                    
                    {/* Label */}
                    <span className="text-xs sm:text-sm font-medium text-center text-foreground group-hover:text-red-400 transition-colors duration-300 max-w-[4rem] sm:max-w-none">
                      {item.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator dots */}
        <div className="flex justify-center gap-1 mt-4 sm:hidden">
          {Array.from({ length: Math.ceil(quickAccessItems.length / 4) }).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-muted-foreground/30"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
