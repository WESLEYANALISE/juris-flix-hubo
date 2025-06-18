
import { Scale, Brain, Library, Headphones, Home, StickyNote, Compass } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';

interface FooterMenuProps {
  isVisible?: boolean;
}

export const FooterMenu = ({
  isVisible = true
}: FooterMenuProps) => {
  const [activeItem, setActiveItem] = useState('home');
  const {
    setCurrentFunction
  } = useNavigation();
  const {
    functions
  } = useAppFunctions();

  // Find specific functions from the table with improved matching
  const findFunction = (searchTerm: string) => {
    return functions.find(func => func.funcao.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const menuItems = [{
    id: 'home',
    title: 'Início',
    icon: Home,
    function: null
  }, {
    id: 'vade-mecum',
    title: 'Vade Mecum',
    icon: Scale,
    function: findFunction('vade')?.funcao || 'Vade Mecum'
  }, {
    id: 'audio-aulas',
    title: 'Áudio-aulas',
    icon: Headphones,
    function: findFunction('audio')?.funcao || findFunction('áudio')?.funcao || 'Áudio-aulas'
  }, {
    id: 'biblioteca',
    title: 'Biblioteca',
    icon: Library,
    function: findFunction('biblioteca')?.funcao || 'Biblioteca'
  }, {
    id: 'anotacoes',
    title: 'Anotações',
    icon: StickyNote,
    function: 'Anotações'
  }, {
    id: 'explorar',
    title: 'Explorar',
    icon: Compass,
    function: 'Explorar'
  }];

  const handleItemClick = (item: typeof menuItems[0]) => {
    setActiveItem(item.id);
    setCurrentFunction(item.function);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 safe-area-pb-legal transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
      <div className="mx-2 mb-2">
        <div className="max-w-md mx-auto bg-slate-900/98 backdrop-blur-xl rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden">
          <div className="flex justify-around items-center px-1 py-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button 
                  key={item.id} 
                  onClick={() => handleItemClick(item)} 
                  className={`relative flex flex-col items-center py-2.5 px-2 rounded-xl transition-all duration-300 transform active:scale-95 group min-w-0 flex-1 ${
                    isActive 
                      ? 'text-amber-400 bg-amber-500/20 shadow-lg scale-105' 
                      : 'text-slate-400 hover:text-amber-400 hover:bg-amber-500/10'
                  }`}
                >
                  {/* Indicador ativo - melhorado */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full shadow-lg" />
                  )}
                  
                  {/* Icon container - mais proporcional */}
                  <div className={`relative p-1.5 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-amber-500/25 scale-110 shadow-md' 
                      : 'group-hover:bg-amber-500/15 group-hover:scale-105'
                  }`}>
                    <Icon className="h-5 w-5 transition-all duration-300" />
                  </div>
                  
                  {/* Label - melhor tipografia */}
                  <span className={`text-xs font-medium transition-all duration-300 mt-1 text-center leading-tight max-w-full overflow-hidden ${
                    isActive 
                      ? 'font-bold text-amber-400' 
                      : 'group-hover:font-semibold'
                  }`}>
                    {item.title}
                  </span>
                  
                  {/* Efeito de brilho sutil */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/8 to-transparent rounded-xl pointer-events-none" />
                  )}
                  
                  {/* Pulse effect para item ativo */}
                  {isActive && (
                    <div className="absolute inset-0 bg-amber-500/10 rounded-xl animate-pulse pointer-events-none" />
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
