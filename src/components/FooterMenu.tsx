
import { 
  Home, 
  Video, 
  Download, 
  Compass,
  StickyNote,
  User,
  Monitor
} from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

const FooterMenu = () => {
  const { goHome, goToFunction } = useNavigation();

  const menuItems = [
    { 
      id: 'home', 
      icon: Home, 
      label: 'Início', 
      action: goHome 
    },
    { 
      id: 'videoaulas', 
      icon: Video, 
      label: 'Videoaulas', 
      action: () => goToFunction('videoaulas') 
    },
    { 
      id: 'downloads', 
      icon: Download, 
      label: 'Downloads', 
      action: () => goToFunction('downloads') 
    },
    { 
      id: 'anotacoes', 
      icon: StickyNote, 
      label: 'Anotações', 
      action: () => goToFunction('anotacoes') 
    },
    { 
      id: 'explorar', 
      icon: Compass, 
      label: 'Explorar', 
      action: () => goToFunction('explorar') 
    },
    { 
      id: 'desktop', 
      icon: Monitor, 
      label: 'Desktop', 
      action: () => goToFunction('plataforma-desktop') 
    },
    { 
      id: 'perfil', 
      icon: User, 
      label: 'Perfil', 
      action: () => goToFunction('perfil') 
    }
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-40 lg:hidden">
      <div className="grid grid-cols-7 gap-1 py-2 px-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-muted/50 active:scale-95 group"
            >
              <div className="flex flex-col items-center gap-1">
                <IconComponent className="h-5 w-5 text-foreground group-hover:text-accent-legal transition-colors" />
                <span className="text-xs font-medium text-foreground group-hover:text-accent-legal transition-colors">
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </footer>
  );
};

export default FooterMenu;
