
import { 
  Scale, Book, Bot, Library, GraduationCap, Video, Brain, 
  FileText, Globe, ChevronLeft, ChevronRight, Home, Star 
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
      { icon: Scale, title: 'Vade Mecum Digital', function: 'Vade Mecum' },
      { icon: Bot, title: 'Assistente IA Jurídica', function: 'IA Jurídica' },
      { icon: Library, title: 'Biblioteca Jurídica', function: 'Biblioteca' },
      { icon: Book, title: 'Resumos Jurídicos', function: 'Resumos' },
    ]
  },
  {
    title: 'Estudos e Preparação',
    items: [
      { icon: Brain, title: 'Flashcards', function: 'Flashcards' },
      { icon: Brain, title: 'Mapas Mentais', function: 'Mapas Mentais' },
      { icon: Video, title: 'Videoaulas', function: 'Videoaulas' },
      { icon: GraduationCap, title: 'Simulados OAB', function: 'Simulados' },
    ]
  },
  {
    title: 'Recursos Profissionais',
    items: [
      { icon: FileText, title: 'Modelos de Petições', function: 'Petições' },
      { icon: Globe, title: 'Notícias Jurídicas', function: 'Notícias' },
    ]
  }
];

export const DesktopSidebar = ({ collapsed, onToggle }: DesktopSidebarProps) => {
  const { setCurrentFunction } = useNavigation();

  const handleItemClick = (functionName: string | null) => {
    setCurrentFunction(functionName);
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-card/80 backdrop-blur-xl border-r border-border/30 z-40 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-72'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold gradient-text">LegalStudy Pro</h2>
                <p className="text-xs text-muted-foreground">Plataforma Jurídica</p>
              </div>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle}
            className="hover:bg-secondary/80 h-8 w-8"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Menu Content */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {menuSections.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider px-3">
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
                      className={`w-full justify-start gap-3 h-10 hover:bg-secondary/80 group ${
                        collapsed ? 'px-0 justify-center' : 'px-3'
                      }`}
                    >
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                      {!collapsed && (
                        <span className="text-sm font-medium group-hover:text-primary">
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
