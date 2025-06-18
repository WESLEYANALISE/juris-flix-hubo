
import { 
  Scale, Bot, Library, Headphones, Brain, Monitor, 
  ChevronLeft, ChevronRight, Home, Star, Play, FileText, Newspaper, Download 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppFunctions } from '@/hooks/useAppFunctions';

interface DesktopSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const DesktopSidebar = ({ collapsed, onToggle }: DesktopSidebarProps) => {
  const { setCurrentFunction } = useNavigation();
  const { functions, loading } = useAppFunctions();

  // Função para encontrar a função na tabela APP
  const getFunctionFromDB = (searchTerms: string[]) => {
    if (!functions || functions.length === 0) return null;
    
    for (const term of searchTerms) {
      const found = functions.find(func => 
        func.funcao.toLowerCase().includes(term.toLowerCase())
      );
      if (found) {
        console.log(`Encontrada função para "${term}":`, found);
        return found.funcao;
      }
    }
    return null;
  };

  const menuSections = [
    {
      title: 'Principal',
      items: [
        { icon: Home, title: 'Dashboard', function: null },
        { icon: Star, title: 'Favoritos', function: null },
      ]
    },
    {
      title: 'Ferramentas Jurídicas',
      items: [
        { 
          icon: Scale, 
          title: 'Vade Mecum Digital', 
          function: getFunctionFromDB(['Vade Mecum Digital', 'vade mecum']) 
        },
        { 
          icon: Bot, 
          title: 'Assistente IA Jurídica', 
          function: getFunctionFromDB(['Assistente IA Jurídica', 'Assistente IA', 'assistente']) 
        },
        { 
          icon: Library, 
          title: 'Biblioteca Jurídica', 
          function: getFunctionFromDB(['Biblioteca Jurídica', 'biblioteca']) 
        },
        { 
          icon: Brain, 
          title: 'Mapas Mentais', 
          function: getFunctionFromDB(['Mapas Mentais', 'mapas']) 
        },
      ]
    },
    {
      title: 'Estudos e Preparação',
      items: [
        { 
          icon: Brain, 
          title: 'Flashcards', 
          function: getFunctionFromDB(['Flashcards', 'flashcard']) 
        },
        { 
          icon: Play, 
          title: 'Videoaulas', 
          function: getFunctionFromDB(['Videoaulas', 'video']) 
        },
        { 
          icon: Headphones, 
          title: 'Áudio-aulas', 
          function: getFunctionFromDB(['Áudio-aulas', 'audio']) 
        },
        { 
          icon: Download, 
          title: 'Downloads', 
          function: getFunctionFromDB(['Downloads', 'download']) 
        },
        { 
          icon: Newspaper, 
          title: 'Notícias Jurídicas', 
          function: getFunctionFromDB(['Notícias Jurídicas', 'noticias']) 
        },
        { icon: FileText, title: 'Anotações', function: 'Anotações' },
      ]
    }
  ];

  const handleItemClick = (functionName: string | null) => {
    console.log('DesktopSidebar - Clicando no item:', functionName);
    console.log('Funções disponíveis:', functions?.map(f => f.funcao));
    
    if (functionName) {
      setCurrentFunction(functionName);
    }
  };

  // Mostrar loading se ainda estamos carregando as funções
  if (loading) {
    return (
      <div className={`fixed left-0 top-0 h-full glass-effect-legal border-r border-border/30 z-40 transition-all duration-500 ${
        collapsed ? 'w-16' : 'w-72'
      }`}>
        <div className="p-4 border-b border-border/30">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed left-0 top-0 h-full glass-effect-legal border-r border-border/30 z-40 transition-all duration-500 animate-slide-in-legal ${
      collapsed ? 'w-16' : 'w-72'
    }`}>
      {/* Enhanced header with legal branding and animations */}
      <div className="p-4 border-b border-border/30 animate-fade-in-legal">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3 animate-slide-in-legal">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center card-depth-2 animate-legal-shimmer hover:animate-legal-glow overflow-hidden">
                <img 
                  src="https://imgur.com/M5Qu1m8.png" 
                  alt="LegalStudy Pro" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold gradient-text-legal animate-legal-text-glow">LegalStudy Pro</h2>
                <p className="text-xs text-muted-foreground animate-fade-in-legal" style={{ animationDelay: '0.2s' }}>Plataforma Jurídica</p>
              </div>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle}
            className="hover:bg-secondary/80 h-8 w-8 hover-glow-legal transition-all duration-500 animate-legal-float hover:animate-legal-bounce"
          >
            {collapsed ? <ChevronRight className="h-4 w-4 text-amber-400 animate-legal-icon-float" /> : <ChevronLeft className="h-4 w-4 text-amber-400 animate-legal-icon-float" />}
          </Button>
        </div>
      </div>

      {/* Enhanced menu content with professional styling and animations */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title} className="animate-slide-up-legal" style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
              {!collapsed && (
                <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider px-3 gradient-text-legal animate-legal-text-glow">
                  {section.title}
                </h3>
              )}
              
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const isClickable = item.function !== null;
                  
                  return (
                    <Button
                      key={item.title}
                      variant="ghost"
                      onClick={() => handleItemClick(item.function)}
                      disabled={!isClickable}
                      className={`w-full justify-start gap-3 h-10 hover:bg-secondary/80 hover-glow-legal group transition-all duration-500 animate-bounce-in-legal hover:animate-legal-float ${
                        collapsed ? 'px-0 justify-center' : 'px-3'
                      } ${!isClickable ? 'opacity-50 cursor-not-allowed' : ''}`}
                      style={{ animationDelay: `${(sectionIndex * section.items.length + itemIndex) * 0.05}s` }}
                    >
                      <div className="relative">
                        <Icon className="h-5 w-5 text-amber-400 group-hover:text-amber-300 transition-colors duration-500 group-hover:animate-legal-icon-glow" />
                        
                        {/* Legal sparkle effect on icon */}
                        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-amber-400/60 rounded-full opacity-0 group-hover:opacity-100 animate-legal-sparkle transition-opacity duration-500" />
                      </div>
                      
                      {!collapsed && (
                        <span className="text-sm font-medium group-hover:text-primary transition-all duration-500 group-hover:animate-legal-text-glow group-hover:scale-105">
                          {item.title}
                        </span>
                      )}
                      
                      {/* Enhanced hover indicator with animation */}
                      <div className="absolute right-2 w-1 h-6 bg-primary/0 group-hover:bg-primary/60 rounded-full transition-all duration-500 animate-legal-accent" />
                      
                      {/* Legal profession ripple effect */}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-lg transition-all duration-500 animate-legal-ripple" />
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
