import { 
  Scale, 
  Bot, 
  Library,
  Headphones
} from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  gradient: string;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  function: string;
}

export const QuickAccessSection = () => {
  const { setCurrentFunction } = useNavigation();

  const quickActions = [
    {
      id: 'vade-mecum',
      title: 'Vade Mecum',
      description: 'Legislação atualizada',
      icon: Scale,
      gradient: 'from-amber-600 to-amber-700',
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      function: 'Vade Mecum'
    },
    {
      id: 'ia-assistant',
      title: 'IA Jurídica',
      description: 'Assistente inteligente',
      icon: Bot,
      gradient: 'from-cyan-600 to-cyan-700',
      iconColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      function: 'IA Jurídica'
    },
    {
      id: 'biblioteca',
      title: 'Biblioteca',
      description: 'Acervo jurídico',
      icon: Library,
      gradient: 'from-green-600 to-green-700',
      iconColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      function: 'Biblioteca'
    },
    {
      id: 'audio-aulas',
      title: 'Áudio-aulas',
      description: 'Conteúdo em áudio',
      icon: Headphones,
      gradient: 'from-purple-600 to-purple-700',
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      function: 'Áudio-aulas'
    }
  ];

  const handleActionClick = (functionName: string) => {
    setCurrentFunction(functionName);
  };

  return (
    <section className="px-3 sm:px-4 md:px-8 mb-6 sm:mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6 animate-fade-in-legal">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 gradient-text-legal animate-legal-text-glow">
            Acesso Rápido
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Ferramentas mais utilizadas para seu estudo jurídico
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => handleActionClick(action.function)}
                className={`group relative p-4 sm:p-6 rounded-xl ${action.bgColor} ${action.borderColor} border hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-lg card-depth-1 hover:card-depth-2 animate-bounce-in-legal hover:animate-legal-float`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500`} />
                
                <div className="relative z-10 text-center space-y-2 sm:space-y-3">
                  <div className={`mx-auto w-10 h-10 sm:w-12 sm:h-12 ${action.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-500 card-depth-1`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${action.iconColor} group-hover:animate-legal-icon-glow`} />
                    
                    {/* Sparkle effect */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 animate-legal-sparkle transition-opacity duration-500" />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors duration-300 group-hover:animate-legal-text-glow">
                      {action.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                      {action.description}
                    </p>
                  </div>
                </div>

                {/* Ripple effect */}
                <div className="absolute inset-0 bg-primary/0 group-active:bg-primary/10 rounded-xl transition-all duration-300 animate-legal-ripple" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-legal-hover-glow" 
                     style={{ boxShadow: `0 0 20px ${action.iconColor.replace('text-', 'rgb(var(--')})/20)` }} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
