
import { X, Home, Scale, Headphones, Library, Bot, User, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const { setCurrentFunction } = useNavigation();
  const { functions } = useAppFunctions();

  const findFunction = (searchTerm: string) => {
    return functions.find(func => 
      func.funcao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const mainMenuItems = [
    {
      id: 'home',
      title: 'Início',
      icon: Home,
      function: null
    },
    {
      id: 'vade-mecum',
      title: 'Vade Mecum',
      icon: Scale,
      function: findFunction('vade')?.funcao || 'Vade Mecum'
    },
    {
      id: 'audio-aulas',
      title: 'Áudio-aulas',
      icon: Headphones,
      function: findFunction('audio')?.funcao || findFunction('áudio')?.funcao || 'Áudio-aulas'
    },
    {
      id: 'biblioteca',
      title: 'Biblioteca',
      icon: Library,
      function: findFunction('biblioteca')?.funcao || 'Biblioteca'
    },
    {
      id: 'ia-juridica',
      title: 'IA Jurídica',
      icon: Bot,
      function: findFunction('ia')?.funcao || findFunction('juridica')?.funcao || 'IA Jurídica'
    }
  ];

  const secondaryMenuItems = [
    {
      id: 'profile',
      title: 'Meu Perfil',
      icon: User
    },
    {
      id: 'settings',
      title: 'Configurações',
      icon: Settings
    },
    {
      id: 'help',
      title: 'Ajuda',
      icon: HelpCircle
    }
  ];

  const handleItemClick = (item: typeof mainMenuItems[0]) => {
    setCurrentFunction(item.function);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card/95 backdrop-blur-xl border-l border-border/50 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/20">
          <h2 className="text-xl font-bold gradient-text">Menu</h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-300"
          >
            <X className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-90'}`} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100%-88px)]">
          {/* Main Menu */}
          <div className="flex-1 p-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Principal</h3>
              {mainMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 hover:bg-primary/10 hover:text-primary group"
                  >
                    <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/15 transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Menu */}
          <div className="p-6 border-t border-border/20">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Conta</h3>
              {secondaryMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={onClose}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 hover:bg-primary/10 hover:text-primary group"
                  >
                    <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/15 transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
