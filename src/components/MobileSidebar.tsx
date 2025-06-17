
import { useEffect } from 'react';
import { X, Scale, Bot, Library, Headphones, Home, User, Settings, LogOut } from 'lucide-react';
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
    { id: 'profile', title: 'Perfil', icon: User },
    { id: 'settings', title: 'Configurações', icon: Settings },
    { id: 'logout', title: 'Sair', icon: LogOut }
  ];

  const handleItemClick = (item: any) => {
    if (item.function) {
      setCurrentFunction(item.function);
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={onClose} />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-background/95 backdrop-blur-xl border-l border-border/30 shadow-2xl transform transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Scale className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Menu</h2>
                <p className="text-xs text-muted-foreground">LegalStudy Pro</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-8 w-8 rounded-full hover:bg-primary/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Main Menu */}
          <div className="flex-1 p-4 space-y-2">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">Principal</h3>
              {mainMenuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 hover:bg-primary/10 hover:text-primary group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </button>
                );
              })}
            </div>

            {/* All Functions */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">Todas as Funções</h3>
              <div className="max-h-64 overflow-y-auto space-y-1">
                {functions.map((func, index) => (
                  <button
                    key={func.id}
                    onClick={() => {
                      setCurrentFunction(func.funcao);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 hover:bg-primary/10 hover:text-primary text-sm"
                  >
                    <div className="w-6 h-6 rounded-md bg-muted/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary/60" />
                    </div>
                    <span>{func.funcao}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border/20 space-y-1">
            {secondaryMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={onClose}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
