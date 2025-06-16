
import { 
  Book, 
  Bot, 
  Scale, 
  Video, 
  Library,
  Home
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  {
    id: 'home',
    title: 'Início',
    icon: Home,
    active: true
  },
  {
    id: 'vade-mecum',
    title: 'Vade Mecum',
    icon: Book,
    active: false
  },
  {
    id: 'assistente',
    title: 'IA Jurídica',
    icon: Bot,
    active: false
  },
  {
    id: 'oab',
    title: 'OAB',
    icon: Scale,
    active: false
  },
  {
    id: 'biblioteca',
    title: 'Biblioteca',
    icon: Library,
    active: false
  }
];

export const FooterMenu = () => {
  const [activeItem, setActiveItem] = useState('home');

  return (
    <div className="fixed bottom-2 left-2 right-2 z-50 sm:bottom-4 sm:left-4 sm:right-4">
      <div className="max-w-md mx-auto floating-effect rounded-xl sm:rounded-2xl">
        <div className="flex justify-around items-center py-2 px-1 sm:py-3 sm:px-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`relative flex flex-col items-center py-2 px-2 sm:py-3 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-500 transform hover:scale-110 hover-lift group ${
                  isActive 
                    ? 'text-red-400 bg-red-500/10' 
                    : 'text-muted-foreground hover:text-red-300 hover:bg-red-500/5'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'slide-up 0.6s ease-out'
                }}
              >
                {/* Active indicator with pulse effect */}
                <div className={`absolute -top-0.5 w-6 h-1 sm:w-8 sm:h-1.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500 ${
                  isActive ? 'opacity-100 scale-100 animate-pulse-glow' : 'opacity-0 scale-0'
                }`} />
                
                {/* Icon with enhanced background effect */}
                <div className={`relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-500 group-hover:animate-bounce-subtle ${
                  isActive 
                    ? 'bg-gradient-to-br from-red-500/20 to-red-600/20 shadow-lg' 
                    : 'hover:bg-gradient-to-br hover:from-red-500/10 hover:to-red-600/10'
                }`}>
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 transition-all duration-500 ${
                    isActive ? 'scale-115 drop-shadow-lg' : 'group-hover:scale-110'
                  }`} />
                  
                  {/* Glow effect for active icon */}
                  {isActive && (
                    <div className="absolute inset-0 bg-red-500/20 rounded-lg sm:rounded-xl blur-md -z-10 animate-pulse" />
                  )}
                </div>
                
                <span className={`text-xs font-medium transition-all duration-500 mt-0.5 sm:mt-1 ${
                  isActive ? 'scale-105 font-semibold text-red-300' : 'group-hover:scale-105'
                }`}>
                  {item.title}
                </span>

                {/* Enhanced ripple effect on click */}
                <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r from-red-500/30 to-red-600/30 rounded-lg sm:rounded-xl transform scale-0 transition-transform duration-300 ${
                    isActive ? 'animate-ping' : ''
                  }`} />
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-red-500/0 group-hover:bg-red-500/5 transition-all duration-300" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
