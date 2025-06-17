
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
      function: null,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'vade-mecum',
      title: 'Vade Mecum',
      icon: Scale,
      function: findFunction('vade')?.funcao || 'Vade Mecum',
      gradient: 'from-amber-500 to-amber-600'
    },
    {
      id: 'audio-aulas',
      title: 'Áudio-aulas',
      icon: Headphones,
      function: findFunction('audio')?.funcao || findFunction('áudio')?.funcao || 'Áudio-aulas',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'biblioteca',
      title: 'Biblioteca',
      icon: Library,
      function: findFunction('biblioteca')?.funcao || 'Biblioteca',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'ia-juridica',
      title: 'IA Jurídica',
      icon: Bot,
      function: findFunction('ia')?.funcao || findFunction('juridica')?.funcao || 'IA Jurídica',
      gradient: 'from-cyan-500 to-cyan-600'
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
                  className={`relative flex flex-col items-center py-2 px-2 sm:py-2.5 sm:px-3 rounded-xl transition-all duration-500 transform active:scale-90 touch-manipulation group ${
                    isActive 
                      ? 'text-white shadow-md card-depth-2' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/8 active:bg-primary/12'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    transform: isActive ? 'translateY(-2px)' : 'translateY(0)'
                  }}
                >
                  {/* Enhanced active indicator */}
                  <div className={`absolute -top-1 w-8 h-1.5 bg-gradient-to-r ${item.gradient} rounded-full transition-all duration-500 ${
                    isActive ? 'opacity-100 scale-100 shadow-lg' : 'opacity-0 scale-0'
                  }`} />
                  
                  {/* Enhanced icon container with specific gradients */}
                  <div className={`relative p-1.5 sm:p-2 rounded-lg transition-all duration-500 transform ${
                    isActive 
                      ? `bg-gradient-to-br ${item.gradient} shadow-lg scale-110 card-depth-2` 
                      : 'group-hover:bg-gradient-to-br group-hover:from-primary/15 group-hover:to-primary/25 group-hover:scale-105 group-hover:shadow-md'
                  }`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 transition-all duration-500 ${
                      isActive ? 'text-white drop-shadow-lg' : 'group-hover:drop-shadow-md'
                    }`} />
                    
                    {/* Enhanced glow effect for active state */}
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-lg blur-sm -z-10 opacity-50`} />
                    )}
                  </div>
                  
                  {/* Enhanced label */}
                  <span className={`text-xs font-medium transition-all duration-500 mt-0.5 sm:mt-1 leading-tight ${
                    isActive ? 'font-bold text-white transform scale-105' : 'group-hover:font-semibold'
                  }`}>
                    {item.title}
                  </span>

                  {/* Professional ripple effect */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl transform scale-0 transition-transform duration-300 ${
                      isActive ? '' : 'group-active:scale-100'
                    }`} />
                  </div>

                  {/* Enhanced background glow on hover */}
                  <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/5 transition-all duration-500 pointer-events-none" />
                </button>
              );
            })}
          </div>
          
          {/* Enhanced bottom safe area with subtle gradient */}
          <div className="h-1 sm:h-0 bg-gradient-to-r from-primary/10 via-accent-legal/5 to-primary/10" />
        </div>
      </div>
    </div>
  );
};
