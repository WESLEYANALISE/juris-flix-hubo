
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
    title: 'IA Assistant',
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
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-border/30">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center py-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`relative flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? 'text-red-500' 
                    : 'text-muted-foreground hover:text-red-400'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Active indicator */}
                <div className={`absolute -top-1 w-6 h-1 bg-red-500 rounded-full transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`} />
                
                {/* Icon with background effect */}
                <div className={`relative p-1 rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-red-500/10' : 'hover:bg-red-500/5'
                }`}>
                  <Icon className={`h-6 w-6 mb-1 transition-all duration-300 ${
                    isActive ? 'scale-110' : ''
                  }`} />
                </div>
                
                <span className={`text-xs font-medium transition-all duration-300 ${
                  isActive ? 'scale-105 font-semibold' : ''
                }`}>
                  {item.title}
                </span>

                {/* Ripple effect on click */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className={`absolute inset-0 bg-red-500/20 rounded-xl transform scale-0 transition-transform duration-200 ${
                    isActive ? 'animate-ping' : ''
                  }`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
