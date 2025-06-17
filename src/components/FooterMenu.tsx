
import { 
  Scale, 
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
      icon: Scale, // Balance scale for justice
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
        <div className="max-w-md mx-auto floating-effect-legal rounded-2xl border border-border/30 shadow-2xl backdrop-blur-xl animate-slide-up-legal">
          <div className="flex justify-around items-center py-2 px-2 sm:py-3 sm:px-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`relative flex flex-col items-center py-2 px-2 sm:py-2.5 sm:px-3 rounded-xl transition-all duration-500 transform active:scale-90 touch-manipulation group animate-bounce-in-legal ${
                    isActive 
                      ? 'text-primary bg-primary/15 shadow-md card-depth-2 animate-legal-glow' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/8 active:bg-primary/12 hover:animate-legal-float'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    transform: isActive ? 'translateY(-2px)' : 'translateY(0)'
                  }}
                >
                  {/* Enhanced active indicator with legal styling */}
                  <div className={`absolute -top-1 w-8 h-1.5 bg-gradient-to-r from-primary via-accent-legal to-primary rounded-full transition-all duration-500 ${
                    isActive ? 'opacity-100 scale-100 animate-legal-pulse shadow-lg shadow-primary/50' : 'opacity-0 scale-0'
                  }`} />
                  
                  {/* Enhanced icon container with legal effects */}
                  <div className={`relative p-1.5 sm:p-2 rounded-lg transition-all duration-500 transform ${
                    isActive 
                      ? 'bg-gradient-to-br from-primary/25 to-primary/35 shadow-lg scale-110 card-depth-2 animate-legal-shimmer' 
                      : 'group-hover:bg-gradient-to-br group-hover:from-primary/15 group-hover:to-primary/25 group-hover:scale-105 group-hover:shadow-md'
                  }`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 transition-all duration-500 ${
                      isActive ? 'drop-shadow-lg animate-legal-icon-glow' : 'group-hover:drop-shadow-md'
                    }`} />
                    
                    {/* Enhanced glow effect for active state */}
                    {isActive && (
                      <div className="absolute inset-0 bg-primary/30 rounded-lg blur-sm -z-10 animate-legal-pulse" />
                    )}
                    
                    {/* Legal profession sparkle effect */}
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent-legal rounded-full animate-legal-sparkle" />
                    )}
                  </div>
                  
                  {/* Enhanced label with legal typography */}
                  <span className={`text-xs font-medium transition-all duration-500 mt-0.5 sm:mt-1 leading-tight ${
                    isActive ? 'font-bold text-primary transform scale-105 animate-legal-text-glow' : 'group-hover:font-semibold'
                  }`}>
                    {item.title}
                  </span>

                  {/* Professional ripple effect */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl transform scale-0 transition-transform duration-300 ${
                      isActive ? '' : 'group-active:scale-100 group-active:animate-legal-ripple'
                    }`} />
                  </div>

                  {/* Enhanced background glow on hover */}
                  <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/5 transition-all duration-500 pointer-events-none animate-legal-hover-glow" />
                </button>
              );
            })}
          </div>
          
          {/* Enhanced bottom safe area with legal accent */}
          <div className="h-1 sm:h-0 bg-gradient-to-r from-primary/20 via-accent-legal/10 to-primary/20" />
        </div>
      </div>
    </div>
  );
};
