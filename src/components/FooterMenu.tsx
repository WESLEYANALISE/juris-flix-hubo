
import { 
  Book, 
  Bot, 
  Library,
  Headphones,
  Home
} from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '@/context/NavigationContext';

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
    icon: Book,
    function: 'Vade Mecum'
  },
  {
    id: 'audio-aulas',
    title: 'Áudio-aulas',
    icon: Headphones,
    function: 'Áudio-aulas'
  },
  {
    id: 'biblioteca',
    title: 'Biblioteca',
    icon: Library,
    function: 'Biblioteca'
  },
  {
    id: 'ia-juridica',
    title: 'IA Jurídica',
    icon: Bot,
    function: 'IA Jurídica'
  }
];

export const FooterMenu = () => {
  const [activeItem, setActiveItem] = useState('home');
  const { setCurrentFunction } = useNavigation();

  const handleItemClick = (item: typeof menuItems[0]) => {
    setActiveItem(item.id);
    setCurrentFunction(item.function);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-pb">
      <div className="mx-2 mb-2 sm:mx-4 sm:mb-4">
        <div className="max-w-md mx-auto floating-effect rounded-2xl border border-border/20 shadow-2xl">
          <div className="flex justify-around items-center py-2 px-2 sm:py-3 sm:px-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`relative flex flex-col items-center py-2 px-2 sm:py-2.5 sm:px-3 rounded-xl transition-all duration-500 transform active:scale-95 touch-manipulation group ${
                    isActive 
                      ? 'text-red-400 bg-red-500/15 shadow-lg' 
                      : 'text-muted-foreground hover:text-red-300 hover:bg-red-500/8 active:bg-red-500/12'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.08}s`,
                    animation: 'slide-up 0.6s ease-out'
                  }}
                >
                  {/* Active indicator */}
                  <div className={`absolute -top-1 w-6 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`} />
                  
                  {/* Icon container */}
                  <div className={`relative p-1.5 sm:p-2 rounded-lg transition-all duration-500 ${
                    isActive 
                      ? 'bg-gradient-to-br from-red-500/25 to-red-600/25 shadow-md transform scale-110' 
                      : 'group-hover:bg-gradient-to-br group-hover:from-red-500/15 group-hover:to-red-600/15 group-hover:scale-105'
                  }`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 transition-all duration-500 ${
                      isActive ? 'drop-shadow-lg' : ''
                    }`} />
                    
                    {/* Glow effect for active state */}
                    {isActive && (
                      <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-sm -z-10" />
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={`text-xs font-medium transition-all duration-500 mt-0.5 sm:mt-1 leading-tight ${
                    isActive ? 'font-semibold text-red-300 transform scale-105' : ''
                  }`}>
                    {item.title}
                  </span>

                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl transform scale-0 transition-transform duration-200 ${
                      isActive ? '' : 'group-active:scale-100 group-active:animate-ping'
                    }`} />
                  </div>

                  {/* Background glow on hover */}
                  <div className="absolute inset-0 rounded-xl bg-red-500/0 group-hover:bg-red-500/5 transition-all duration-300 pointer-events-none" />
                </button>
              );
            })}
          </div>
          
          {/* Bottom safe area for devices with notches */}
          <div className="h-1 sm:h-0" />
        </div>
      </div>
    </div>
  );
};
