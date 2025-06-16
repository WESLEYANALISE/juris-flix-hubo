
import { 
  Book, 
  Bot, 
  Scale, 
  Video, 
  Library,
  Home
} from 'lucide-react';

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
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-border/50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                  item.active 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-xs font-medium">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
