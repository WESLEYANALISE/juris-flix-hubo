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
      id: 'ia-juridica',
      title: 'IA Jurídica',
      icon: Bot,
      function: findFunction('ia')?.funcao || findFunction('juridica')?.funcao || 'IA Jurídica'
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
      <div className="mx-3 mb-3 sm:mx-4 sm:mb-4">
        <div className="max-w-md mx-auto bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl">
          <div className="flex justify-around items-center py-3 px-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`relative flex flex-col items-center py-2.5 px-3 rounded-xl transition-all duration-300 transform active:scale-95 group ${
                    isActive 
                      ? 'text-primary bg-primary/10 shadow-md' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {/* Active indicator */}
                  <div className={`absolute -top-1 w-6 h-1 bg-primary rounded-full transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`} />
                  
                  {/* Icon container */}
                  <div className={`relative p-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary/15 scale-110' 
                      : 'group-hover:bg-primary/10 group-hover:scale-105'
                  }`}>
                    <Icon className="h-5 w-5 transition-all duration-300" />
                  </div>
                  
                  {/* Label */}
                  <span className={`text-xs font-medium transition-all duration-300 mt-1 ${
                    isActive ? 'font-semibold text-primary' : 'group-hover:font-medium'
                  }`}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
