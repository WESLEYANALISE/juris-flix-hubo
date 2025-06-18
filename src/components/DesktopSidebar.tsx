
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

  // Função simplificada para encontrar a função na tabela APP
  const getFunctionName = useCallback((searchTerms: string[]) => {
    console.log('DesktopSidebar - Buscando função para termos:', searchTerms);
    console.log('DesktopSidebar - Funções disponíveis:', functions);
    
    if (!functions || functions.length === 0) {
      console.log('DesktopSidebar - Nenhuma função disponível, usando termo padrão');
      return searchTerms[0]; // Retorna o primeiro termo como fallback
    }
    
    // Primeiro, tentativa de correspondência exata
    for (const term of searchTerms) {
      const exactMatch = functions.find(func => 
        func.funcao.toLowerCase() === term.toLowerCase()
      );
      if (exactMatch) {
        console.log(`DesktopSidebar - Correspondência exata encontrada para "${term}":`, exactMatch.funcao);
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
        console.log(`DesktopSidebar - Correspondência parcial encontrada para "${term}":`, partialMatch.funcao);
        return partialMatch.funcao;
      }
    }
    
    console.log(`DesktopSidebar - Nenhuma correspondência encontrada, usando primeiro termo:`, searchTerms[0]);
    return searchTerms[0]; // Fallback para o primeiro termo
  }, [functions]);

  // Memoizar as seções do menu
  const menuSections = useMemo(() => {
    console.log('DesktopSidebar - Recalculando menuSections. Loading:', loading, 'Functions count:', functions?.length || 0);
    
    return [
      {
        title: 'Principal',
        items: [
          { icon: Home, title: 'Dashboard', function: 'Dashboard' },
          { icon: Star, title: 'Favoritos', function: 'Favoritos' },
        ]
      },
      {
        title: 'Ferramentas Jurídicas',
        items: [
          { 
            icon: Scale, 
            title: 'Vade Mecum Digital', 
            function: getFunctionName(['Vade Mecum Digital', 'Vade Mecum'])
          },
          { 
            icon: Bot, 
            title: 'Assistente IA Jurídica', 
            function: getFunctionName(['Assistente IA Jurídica', 'Assistente IA'])
          },
          { 
            icon: Library, 
            title: 'Biblioteca Jurídica', 
            function: getFunctionName(['Biblioteca Jurídica', 'Biblioteca'])
          },
          { 
            icon: Brain, 
            title: 'Mapas Mentais', 
            function: getFunctionName(['Mapas Mentais'])
          },
        ]
      },
      {
        title: 'Estudos e Preparação',
        items: [
          { 
            icon: Brain, 
            title: 'Flashcards', 
            function: getFunctionName(['Flashcards'])
          },
          { 
            icon: Play, 
            title: 'Videoaulas', 
            function: 'Videoaulas' // Sempre usar componente local
          },
          { 
            icon: Headphones, 
            title: 'Áudio-aulas', 
            function: getFunctionName(['Áudio-aulas', 'Audio-aulas'])
          },
          { 
            icon: Download, 
            title: 'Downloads', 
            function: 'Downloads' // Sempre usar componente local
          },
          { 
            icon: Newspaper, 
            title: 'Notícias Jurídicas', 
            function: 'Notícias Jurídicas' // Sempre usar componente local
          },
          { 
            icon: FileText, 
            title: 'Anotações', 
            function: 'Anotações' // Sempre usar componente local
          },
        ]
      }
    ];
  }, [functions, loading, getFunctionName]);

  // Função de clique otimizada
  const handleItemClick = useCallback((functionName: string, title: string) => {
    console.log('DesktopSidebar - Clicando no item:', title);
    console.log('DesktopSidebar - Function name:', functionName);
    
    // Sempre navegar para a função, mesmo que seja null
    const targetFunction = functionName || title;
    console.log('DesktopSidebar - Navegando para:', targetFunction);
    setCurrentFunction(targetFunction);
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

      {/* Enhanced menu content - TODOS os itens são clicáveis */}
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
                  
                  console.log(`DesktopSidebar - Renderizando item ${item.title}: function=${item.function}`);
                  
                  return (
                    <Button
                      key={item.title}
                      variant="ghost"
                      onClick={() => handleItemClick(item.function, item.title)}
                      className={`w-full justify-start gap-3 h-10 hover:bg-secondary/80 hover-glow-legal group transition-all duration-500 animate-bounce-in-legal hover:animate-legal-float cursor-pointer hover:scale-105 ${
                        collapsed ? 'px-0 justify-center' : 'px-3'
                      }`}
                      style={{ 
                        animationDelay: `${(sectionIndex * section.items.length + itemIndex) * 0.05}s`
                      }}
                    >
                      <div className="relative">
                        <Icon className="h-5 w-5 text-amber-400 group-hover:text-amber-300 group-hover:animate-legal-icon-glow transition-colors duration-500" />
                        
                        {/* Legal sparkle effect on icon */}
                        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-amber-400/60 rounded-full opacity-0 group-hover:opacity-100 animate-legal-sparkle transition-opacity duration-500" />
                      </div>
                      
                      {!collapsed && (
                        <span className="text-sm font-medium group-hover:text-primary group-hover:animate-legal-text-glow group-hover:scale-105 transition-all duration-500">
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
