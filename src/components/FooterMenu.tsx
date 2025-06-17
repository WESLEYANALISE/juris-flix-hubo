
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
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      hoverColor: 'hover:bg-blue-500/30'
    },
    {
      id: 'vade-mecum',
      title: 'Vade Mecum',
      icon: Scale,
      function: findFunction('vade')?.funcao || 'Vade Mecum',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      hoverColor: 'hover:bg-amber-500/30'
    },
    {
      id: 'audio-aulas',
      title: 'Áudio-aulas',
      icon: Headphones,
      function: findFunction('audio')?.funcao || findFunction('áudio')?.funcao || 'Áudio-aulas',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      hoverColor: 'hover:bg-purple-500/30'
    },
    {
      id: 'biblioteca',
      title: 'Biblioteca',
      icon: Library,
      function: findFunction('biblioteca')?.funcao || 'Biblioteca',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      hoverColor: 'hover:bg-green-500/30'
    },
    {
      id: 'ia-juridica',
      title: 'IA Jurídica',
      icon: Bot,
      function: findFunction('ia')?.funcao || findFunction('juridica')?.funcao || 'IA Jurídica',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
      hoverColor: 'hover:bg-cyan-500/30'
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
          {/* Enhanced background with legal gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent-legal/5 to-primary/5 rounded-2xl animate-legal-shimmer" />
          
          <div className="relative flex justify-around items-center py-3 px-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`relative flex flex-col items-center py-2.5 px-3 rounded-xl transition-all duration-500 transform active:scale-90 touch-manipulation group animate-bounce-in-legal ${
                    isActive 
                      ? `text-primary ${item.bgColor} shadow-md card-depth-2 animate-legal-glow` 
                      : `${item.color} hover:text-primary ${item.hoverColor} active:bg-primary/12 hover:animate-legal-float`
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
                  <div className={`relative p-2 rounded-lg transition-all duration-500 transform ${
                    isActive 
                      ? `bg-gradient-to-br ${item.bgColor} to-primary/35 shadow-lg scale-110 card-depth-2 animate-legal-shimmer` 
                      : `group-hover:bg-gradient-to-br group-hover:${item.bgColor} group-hover:to-primary/25 group-hover:scale-105 group-hover:shadow-md`
                  }`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 transition-all duration-500 ${
                      isActive 
                        ? `${item.color} drop-shadow-lg animate-legal-icon-glow` 
                        : `${item.color} group-hover:drop-shadow-md group-hover:animate-legal-icon-float`
                    }`} />
                    
                    {/* Enhanced glow effect for active state */}
                    {isActive && (
                      <div className={`absolute inset-0 ${item.bgColor} rounded-lg blur-sm -z-10 animate-legal-pulse`} />
                    )}
                    
                    {/* Legal profession sparkle effect */}
                    {isActive && (
                      <div className={`absolute -top-1 -right-1 w-2 h-2 bg-accent-legal rounded-full animate-legal-sparkle`} />
                    )}
                  </div>
                  
                  {/* Enhanced label with legal typography */}
                  <span className={`text-xs font-medium transition-all duration-500 mt-1 leading-tight ${
                    isActive 
                      ? 'font-bold text-primary transform scale-105 animate-legal-text-glow' 
                      : `${item.color} group-hover:font-semibold group-hover:text-primary`
                  }`}>
                    {item.title}
                  </span>

                  {/* Professional ripple effect */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.bgColor} to-primary/30 rounded-xl transform scale-0 transition-transform duration-300 ${
                      isActive ? '' : 'group-active:scale-100 group-active:animate-legal-ripple'
                    }`} />
                  </div>

                  {/* Enhanced background glow on hover */}
                  <div className={`absolute inset-0 rounded-xl bg-primary/0 ${item.hoverColor} transition-all duration-500 pointer-events-none animate-legal-hover-glow`} />
                </button>
              );
            })}
          </div>
          
          {/* Enhanced bottom safe area with legal accent */}
          <div className="h-1 bg-gradient-to-r from-primary/20 via-accent-legal/10 to-primary/20" />
        </div>
      </div>
    </div>
  );
};
