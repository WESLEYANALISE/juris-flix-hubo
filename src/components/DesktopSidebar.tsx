
import { 
  Book, Bot, Library, Headphones, GitBranch, Monitor, 
  ChevronLeft, ChevronRight, Home, Star 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DesktopSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

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
      { icon: Book, title: 'Vade Mecum Digital', function: 'Vade Mecum' },
      { icon: Bot, title: 'Assistente IA Jurídica', function: 'IA Jurídica' },
      { icon: Library, title: 'Biblioteca Jurídica', function: 'Biblioteca' },
      { icon: GitBranch, title: 'Mapas Mentais', function: 'Mapas Mentais' },
    ]
  },
  {
    title: 'Estudos e Preparação',
    items: [
      { icon: GitBranch, title: 'Flashcards', function: 'Flashcards' },
      { icon: Headphones, title: 'Áudio-aulas', function: 'Áudio-aulas' },
      { icon: Monitor, title: 'Plataforma Desktop', function: 'Plataforma Desktop' },
    ]
  }
];

export const DesktopSidebar = ({ collapsed, onToggle }: DesktopSidebarProps) => {
  const { setCurrentFunction } = useNavigation();

  const handleItemClick = (functionName: string | null) => {
    setCurrentFunction(functionName);
  };

  return (
    <div className={`fixed left-0 top-0 h-full glass-effect-legal border-r border-border/30 z-40 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-72'
    }`}>
      {/* Enhanced header with legal branding */}
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-legal rounded-xl flex items-center justify-center card-depth-2">
                <Book className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold gradient-text-legal">LegalStudy Pro</h2>
                <p className="text-xs text-muted-foreground">Plataforma Jurídica</p>
              </div>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle}
            className="hover:bg-secondary/80 h-8 w-8 hover-glow-legal"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Enhanced menu content with professional styling */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {menuSections.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider px-3 gradient-text-legal">
                  {section.title}
                </h3>
              )}
              
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.title}
                      variant="ghost"
                      onClick={() => handleItemClick(item.function)}
                      className={`w-full justify-start gap-3 h-10 hover:bg-secondary/80 hover-glow-legal group transition-all duration-300 ${
                        collapsed ? 'px-0 justify-center' : 'px-3'
                      }`}
                    >
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      {!collapsed && (
                        <span className="text-sm font-medium group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </span>
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
