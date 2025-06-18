
import { Scale, Bot, Library, Headphones, Home, FileText, Compass, Brain } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';

interface FooterMenuProps {
  isVisible?: boolean;
}

export const FooterMenu = ({ isVisible = true }: FooterMenuProps) => {
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
      id: 'anotacoes',
      title: 'Anotações',
      icon: FileText,
      function: 'Anotações'
    },
    {
      id: 'explorar',
      title: 'Explorar',
      icon: Compass,
      function: 'Explorar'
    }
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    setActiveItem(item.id);
    setCurrentFunction(item.function);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 safe-area-pb-legal transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="mx-3 mb-3">
        <div className="max-w-md mx-auto bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
          <div className="flex justify-around items-center px-0 my-0 mx-0 rounded-none py-0">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`relative flex flex-col items-center py-3 px-3 rounded-xl transition-all duration-300 transform active:scale-95 group min-w-0 flex-1 ${
                    isActive 
                      ? 'text-amber-400 bg-amber-500/15 shadow-lg scale-105' 
                      : 'text-slate-400 hover:text-amber-400 hover:bg-amber-500/10'
                  }`}
                >
                  {/* Indicador ativo */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-amber-400 rounded-full" />
                  )}
                  
                  {/* Icon container */}
                  <div className={`relative p-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-amber-500/20 scale-110' 
                      : 'group-hover:bg-amber-500/10 group-hover:scale-105'
                  }`}>
                    <Icon className="h-5 w-5 transition-all duration-300" />
                  </div>
                  
                  {/* Label */}
                  <span className={`text-xs font-medium transition-all duration-300 mt-1 text-center leading-tight ${
                    isActive 
                      ? 'font-semibold text-amber-400' 
                      : 'group-hover:font-medium'
                  }`}>
                    {item.title}
                  </span>
                  
                  {/* Efeito de brilho no hover */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent rounded-xl" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
