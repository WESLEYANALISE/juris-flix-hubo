
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
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'vade-mecum',
      title: 'Vade Mecum',
      icon: Scale,
      function: findFunction('vade')?.funcao || 'Vade Mecum',
      color: 'from-amber-500 to-yellow-600'
    },
    {
      id: 'audio-aulas',
      title: 'Áudio-aulas',
      icon: Headphones,
      function: findFunction('audio')?.funcao || findFunction('áudio')?.funcao || 'Áudio-aulas',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'biblioteca',
      title: 'Biblioteca',
      icon: Library,
      function: findFunction('biblioteca')?.funcao || 'Biblioteca',
      color: 'from-emerald-500 to-green-600'
    },
    {
      id: 'ia-juridica',
      title: 'IA Jurídica',
      icon: Bot,
      function: findFunction('ia')?.funcao || findFunction('juridica')?.funcao || 'IA Jurídica',
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    setActiveItem(item.id);
    setCurrentFunction(item.function);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-pb">
      <div className="mx-2 mb-2 sm:mx-4 sm:mb-4">
        <div className="max-w-md mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
          <div className="flex justify-around items-center py-2 px-2 sm:py-3 sm:px-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`relative flex flex-col items-center py-2 px-2 sm:py-2.5 sm:px-3 rounded-xl transition-all duration-300 transform active:scale-95 group ${
                    isActive 
                      ? 'text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Enhanced active indicator */}
                  <div className={`absolute -top-1 w-8 h-1.5 bg-gradient-to-r ${item.color} rounded-full transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`} />
                  
                  {/* Enhanced icon container */}
                  <div className={`relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 transform ${
                    isActive 
                      ? `bg-gradient-to-br ${item.color} shadow-lg scale-110` 
                      : 'group-hover:bg-gray-100 dark:group-hover:bg-gray-800 group-hover:scale-105'
                  }`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 ${
                      isActive ? 'text-white drop-shadow-lg' : ''
                    }`} />
                    
                    {/* Glow effect for active state */}
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-lg blur-sm -z-10 opacity-50`} />
                    )}
                  </div>
                  
                  {/* Enhanced label */}
                  <span className={`text-xs font-medium transition-all duration-300 mt-0.5 sm:mt-1 leading-tight ${
                    isActive ? 'text-gray-800 dark:text-gray-200 font-bold' : ''
                  }`}>
                    {item.title}
                  </span>

                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-xl transform scale-0 transition-transform duration-300 opacity-30 ${
                      isActive ? '' : 'group-active:scale-100'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Bottom accent line */}
          <div className="h-1 bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-purple-500/20 rounded-b-2xl" />
        </div>
      </div>
    </div>
  );
};
