
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
    <div className="fixed bottom-1 left-1 right-1 z-50 sm:bottom-2 sm:left-2 sm:right-2">
      <div className="max-w-md mx-auto floating-effect rounded-xl">
        <div className="flex justify-around items-center py-1.5 px-1 sm:py-2 sm:px-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`relative flex flex-col items-center py-1.5 px-1.5 sm:py-2 sm:px-2 rounded-lg transition-all duration-500 transform hover:scale-110 hover-lift group ${
                  isActive 
                    ? 'text-red-400 bg-red-500/10' 
                    : 'text-muted-foreground hover:text-red-300 hover:bg-red-500/5'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'slide-up 0.6s ease-out'
                }}
              >
                {/* Active indicator */}
                <div className={`absolute -top-0.5 w-4 h-0.5 sm:w-6 sm:h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500 ${
                  isActive ? 'opacity-100 scale-100 animate-pulse-glow' : 'opacity-0 scale-0'
                }`} />
                
                {/* Icon */}
                <div className={`relative p-1 sm:p-1.5 rounded-lg transition-all duration-500 group-hover:animate-bounce-subtle ${
                  isActive 
                    ? 'bg-gradient-to-br from-red-500/20 to-red-600/20 shadow-lg' 
                    : 'hover:bg-gradient-to-br hover:from-red-500/10 hover:to-red-600/10'
                }`}>
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 transition-all duration-500 ${
                    isActive ? 'scale-115 drop-shadow-lg' : 'group-hover:scale-110'
                  }`} />
                  
                  {/* Glow effect */}
                  {isActive && (
                    <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-md -z-10 animate-pulse" />
                  )}
                </div>
                
                <span className={`text-xs font-medium transition-all duration-500 mt-0.5 ${
                  isActive ? 'scale-105 font-semibold text-red-300' : 'group-hover:scale-105'
                }`}>
                  {item.title}
                </span>

                {/* Ripple effect */}
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r from-red-500/30 to-red-600/30 rounded-lg transform scale-0 transition-transform duration-300 ${
                    isActive ? 'animate-ping' : ''
                  }`} />
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-lg bg-red-500/0 group-hover:bg-red-500/5 transition-all duration-300" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
