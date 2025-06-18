
import { 
  Scale, Bot, Library, Headphones, Brain, Monitor, 
  ChevronLeft, ChevronRight, Home, Star, Play, FileText, Newspaper, Download 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppFunctions } from '@/hooks/useAppFunctions';
import { useMemo, useCallback } from 'react';

interface DesktopSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const DesktopSidebar = ({ collapsed, onToggle }: DesktopSidebarProps) => {
  const { setCurrentFunction } = useNavigation();
  const { functions, loading } = useAppFunctions();

  // Função melhorada para encontrar a função na tabela APP com memoização
  const getFunctionFromDB = useCallback((searchTerms: string[]) => {
    if (!functions || functions.length === 0) {
      console.log('DesktopSidebar - Nenhuma função disponível ainda');
      return null;
    }
    
    console.log('DesktopSidebar - Buscando função para termos:', searchTerms);
    console.log('DesktopSidebar - Funções disponíveis:', functions.map(f => f.funcao));
    
    // Primeiro, tentativa de correspondência exata
    for (const term of searchTerms) {
      const exactMatch = functions.find(func => 
        func.funcao.toLowerCase() === term.toLowerCase()
      );
      if (exactMatch) {
        console.log(`DesktopSidebar - Correspondência exata encontrada para "${term}":`, exactMatch);
        return exactMatch.funcao;
      }
    }
    
    // Se não encontrar correspondência exata, tenta incluir
    for (const term of searchTerms) {
      const partialMatch = functions.find(func => 
        func.funcao.toLowerCase().includes(term.toLowerCase()) ||
        term.toLowerCase().includes(func.funcao.toLowerCase())
      );
      if (partialMatch) {
        console.log(`DesktopSidebar - Correspondência parcial encontrada para "${term}":`, partialMatch);
        return partialMatch.funcao;
      }
    }
    
    console.log(`DesktopSidebar - Nenhuma correspondência encontrada para:`, searchTerms);
    return null;
  }, [functions]);

  // Memoizar as seções do menu para evitar recálculos
  const menuSections = useMemo(() => {
    console.log('DesktopSidebar - Recalculando menuSections. Loading:', loading, 'Functions count:', functions?.length || 0);
    
    return [
      {
        title: 'Principal',
        items: [
          { icon: Home, title: 'Dashboard', function: null, alwaysClickable: true },
          { icon: Star, title: 'Favoritos', function: null, alwaysClickable: true },
        ]
      },
      {
        title: 'Ferramentas Jurídicas',
        items: [
          { 
            icon: Scale, 
            title: 'Vade Mecum Digital', 
            function: getFunctionFromDB(['Vade Mecum Digital']),
            alwaysClickable: false
          },
          { 
            icon: Bot, 
            title: 'Assistente IA Jurídica', 
            function: getFunctionFromDB(['Assistente IA Jurídica', 'Assistente IA']),
            alwaysClickable: false
          },
          { 
            icon: Library, 
            title: 'Biblioteca Jurídica', 
            function: getFunctionFromDB(['Biblioteca Jurídica']),
            alwaysClickable: false
          },
          { 
            icon: Brain, 
            title: 'Mapas Mentais', 
            function: getFunctionFromDB(['Mapas Mentais']),
            alwaysClickable: false
          },
        ]
      },
      {
        title: 'Estudos e Preparação',
        items: [
          { 
            icon: Brain, 
            title: 'Flashcards', 
            function: getFunctionFromDB(['Flashcards']),
            alwaysClickable: false
          },
          { 
            icon: Play, 
            title: 'Videoaulas', 
            function: 'Videoaulas', // Função sempre clicável
            alwaysClickable: true
          },
          { 
            icon: Headphones, 
            title: 'Áudio-aulas', 
            function: getFunctionFromDB(['Áudio-aulas']),
            alwaysClickable: false
          },
          { 
            icon: Download, 
            title: 'Downloads', 
            function: 'Downloads', // Função sempre clicável
            alwaysClickable: true
          },
          { 
            icon: Newspaper, 
            title: 'Notícias Jurídicas', 
            function: 'Notícias Jurídicas', // Função sempre clicável
            alwaysClickable: true
          },
          { 
            icon: FileText, 
            title: 'Anotações', 
            function: 'Anotações', // Função sempre clicável
            alwaysClickable: true
          },
        ]
      }
    ];
  }, [functions, loading, getFunctionFromDB]);

  // Função de clique otimizada com useCallback
  const handleItemClick = useCallback((functionName: string | null, isClickable: boolean) => {
    console.log('DesktopSidebar - Clicando no item:', functionName, 'isClickable:', isClickable);
    
    if (isClickable && functionName) {
      console.log('DesktopSidebar - Navegando para função:', functionName);
      setCurrentFunction(functionName);
    } else {
      console.log('DesktopSidebar - Item não clicável ou função nula');
    }
  }, [setCurrentFunction]);

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
                  alt="Direito Premium" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold gradient-text-legal animate-legal-text-glow">Direito Premium</h2>
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
                  const isClickable = item.alwaysClickable || item.function !== null;
                  
                  console.log(`DesktopSidebar - Renderizando item ${item.title}: isClickable=${isClickable}, function=${item.function}, alwaysClickable=${item.alwaysClickable}`);
                  
                  return (
                    <Button
                      key={item.title}
                      variant="ghost"
                      onClick={() => handleItemClick(item.function, isClickable)}
                      disabled={!isClickable}
                      className={`w-full justify-start gap-3 h-10 hover:bg-secondary/80 hover-glow-legal group transition-all duration-500 animate-bounce-in-legal hover:animate-legal-float ${
                        collapsed ? 'px-0 justify-center' : 'px-3'
                      } ${isClickable ? 'cursor-pointer hover:scale-105 pointer-events-auto' : 'opacity-50 cursor-not-allowed pointer-events-none'}`}
                      style={{ 
                        animationDelay: `${(sectionIndex * section.items.length + itemIndex) * 0.05}s`
                      }}
                    >
                      <div className="relative">
                        <Icon className={`h-5 w-5 transition-colors duration-500 ${
                          isClickable 
                            ? 'text-amber-400 group-hover:text-amber-300 group-hover:animate-legal-icon-glow' 
                            : 'text-muted-foreground/50'
                        }`} />
                        
                        {/* Legal sparkle effect on icon for clickable items */}
                        {isClickable && (
                          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-amber-400/60 rounded-full opacity-0 group-hover:opacity-100 animate-legal-sparkle transition-opacity duration-500" />
                        )}
                      </div>
                      
                      {!collapsed && (
                        <span className={`text-sm font-medium transition-all duration-500 ${
                          isClickable 
                            ? 'group-hover:text-primary group-hover:animate-legal-text-glow group-hover:scale-105' 
                            : 'text-muted-foreground/50'
                        }`}>
                          {item.title}
                        </span>
                      )}
                      
                      {/* Enhanced hover indicator with animation for clickable items */}
                      {isClickable && (
                        <div className="absolute right-2 w-1 h-6 bg-primary/0 group-hover:bg-primary/60 rounded-full transition-all duration-500 animate-legal-accent" />
                      )}
                      
                      {/* Legal profession ripple effect for clickable items */}
                      {isClickable && (
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-lg transition-all duration-500 animate-legal-ripple" />
                      )}
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
