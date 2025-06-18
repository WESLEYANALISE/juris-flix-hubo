
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
  const { functions } = useAppFunctions();

  // Helper function to find functions
  const findFunction = (searchTerm: string) => {
    return functions.find(func => 
      func.funcao.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
        { icon: Scale, title: 'Vade Mecum Digital', function: findFunction('vade')?.funcao || 'Vade Mecum' },
        { icon: Bot, title: 'Assistente IA Jurídica', function: findFunction('assistente')?.funcao || 'Assistente IA' },
        { icon: Library, title: 'Biblioteca Jurídica', function: findFunction('biblioteca')?.funcao || 'Biblioteca' },
        { icon: Brain, title: 'Mapas Mentais', function: 'Mapas Mentais' },
      ]
    },
    {
      title: 'Estudos e Preparação',
      items: [
        { icon: Brain, title: 'Flashcards', function: 'Flashcards' },
        { icon: Play, title: 'Videoaulas', function: findFunction('video')?.funcao || 'Videoaulas' },
        { icon: Headphones, title: 'Áudio-aulas', function: findFunction('audio')?.funcao || findFunction('áudio')?.funcao || 'Áudio-aulas' },
        { icon: Download, title: 'Downloads', function: findFunction('downloads')?.funcao || 'Downloads' },
        { icon: Newspaper, title: 'Notícias Jurídicas', function: findFunction('noticias')?.funcao || findFunction('notícias')?.funcao || 'Notícias Jurídicas' },
        { icon: FileText, title: 'Anotações', function: 'Anotações' },
      ]
    }
  ];

  const handleItemClick = (functionName: string | null) => {
    setCurrentFunction(functionName);
  };

  return (
    <div className={`fixed left-0 top-0 h-full glass-effect-legal border-r border-border/30 z-40 transition-all duration-500 animate-slide-in-legal ${
      collapsed ? 'w-16' : 'w-72'
    }`}>
      {/* Enhanced header with legal branding and animations */}
      <div className="p-4 border-b border-border/30 animate-fade-in-legal">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3 animate-slide-in-legal">
              <div className="w-10 h-10 gradient-legal rounded-xl flex items-center justify-center card-depth-2 animate-legal-shimmer hover:animate-legal-glow">
                <Scale className="h-6 w-6 text-amber-400 animate-legal-icon-float" />
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
                  return (
                    <Button
                      key={item.title}
                      variant="ghost"
                      onClick={() => handleItemClick(item.function)}
                      className={`w-full justify-start gap-3 h-10 hover:bg-secondary/80 hover-glow-legal group transition-all duration-500 animate-bounce-in-legal hover:animate-legal-float ${
                        collapsed ? 'px-0 justify-center' : 'px-3'
                      }`}
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
