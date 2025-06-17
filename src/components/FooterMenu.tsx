
import { 
  Book, 
  Bot, 
  Library,
  Headphones,
  Home
} from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';

export const FooterMenu = () => {
  const [activeItem, setActiveItem] = useState('home');
  const { setCurrentFunction } = useNavigation();
  const { functions } = useAppFunctions();

  // Find specific functions from the table with improved matching
  const findFunction = (searchTerm: string) => {
    return functions.find(func => 
      func.funcao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const menuItems = [
    {
      id: 'home',
      title: 'Início',
      icon: Home,
      function: null
    },
    {
      id: 'vade-mecum',
      title: 'Vade Mecum',
      icon: Book, // Book icon for legal codes
      function: findFunction('vade')?.funcao || 'Vade Mecum'
    },
    {
      id: 'audio-aulas',
      title: 'Áudio-aulas',
      icon: Headphones, // Headphones for audio content
      function: findFunction('audio')?.funcao || findFunction('áudio')?.funcao || 'Áudio-aulas'
    },
    {
      id: 'biblioteca',
      title: 'Biblioteca',
      icon: Library, // Library icon for legal library
      function: findFunction('biblioteca')?.funcao || 'Biblioteca'
    },
    {
      id: 'ia-juridica',
      title: 'IA Jurídica',
      icon: Bot, // Bot icon for AI assistant
      function: findFunction('ia')?.funcao || findFunction('juridica')?.funcao || 'IA Jurídica'
    }
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    setActiveItem(item.id);
    setCurrentFunction(item.function);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-pb-legal">
      <div className="mx-2 mb-2 sm:mx-4 sm:mb-4">
        <div className="max-w-md mx-auto floating-effect-legal rounded-2xl border border-border/30 shadow-2xl backdrop-blur-xl">
          <div className="flex justify-around items-center py-2 px-2 sm:py-3 sm:px-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`relative flex flex-col items-center py-2 px-2 sm:py-2.5 sm:px-3 rounded-xl transition-all duration-300 transform active:scale-95 touch-manipulation group ${
                    isActive 
                      ? 'text-primary bg-primary/15 shadow-md card-depth-2' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/8 active:bg-primary/12'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.08}s`,
                    animation: 'slide-up-legal 0.6s ease-out'
                  }}
                >
                  {/* Active indicator with legal styling */}
                  <div className={`absolute -top-1 w-6 h-1 bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-100 animate-legal-pulse' : 'opacity-0 scale-0'
                  }`} />
                  
                  {/* Icon container with enhanced legal styling */}
                  <div className={`relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-primary/20 to-primary/30 shadow-sm transform scale-105 card-depth-1' 
                      : 'group-hover:bg-gradient-to-br group-hover:from-primary/10 group-hover:to-primary/20 group-hover:scale-105'
                  }`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 ${
                      isActive ? 'drop-shadow-sm filter-none' : ''
                    }`} />
                    
                    {/* Enhanced glow effect for active state */}
                    {isActive && (
                      <div className="absolute inset-0 bg-primary/20 rounded-lg blur-sm -z-10 animate-legal-pulse" />
                    )}
                  </div>
                  
                  {/* Label with legal typography */}
                  <span className={`text-xs font-medium transition-all duration-300 mt-0.5 sm:mt-1 leading-tight ${
                    isActive ? 'font-semibold text-primary transform scale-105' : ''
                  }`}>
                    {item.title}
                  </span>

                  {/* Professional ripple effect */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl transform scale-0 transition-transform duration-200 ${
                      isActive ? '' : 'group-active:scale-100'
                    }`} />
                  </div>

                  {/* Enhanced background glow on hover */}
                  <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/5 transition-all duration-300 pointer-events-none" />
                </button>
              );
            })}
          </div>
          
          {/* Enhanced bottom safe area for devices with notches */}
          <div className="h-1 sm:h-0" />
        </div>
      </div>
    </div>
  );
};
