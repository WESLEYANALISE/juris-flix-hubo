
import { Scale, Bot, Play, FileText, Brain, Download, Newspaper, Target, Hammer, Search, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigation } from '@/context/NavigationContext';
import { Badge } from '@/components/ui/badge';

const quickAccessItems = [
  { 
    icon: Scale, 
    title: 'Vade Mecum', 
    description: 'Digital atualizado',
    color: 'bg-gradient-to-br from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20',
    iconColor: 'text-red-400',
    function: 'Vade Mecum Digital',
    badge: 'Popular'
  },
  { 
    icon: Bot, 
    title: 'IA Jurídica', 
    description: 'Assistente inteligente',
    color: 'bg-gradient-to-br from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20',
    iconColor: 'text-blue-400',
    function: 'Assistente IA Jurídica',
    badge: 'Novo'
  },
  { 
    icon: Play, 
    title: 'Videoaulas', 
    description: 'Conteúdo premium',
    color: 'bg-gradient-to-br from-purple-500/10 to-purple-600/10 hover:from-purple-500/20 hover:to-purple-600/20',
    iconColor: 'text-purple-400',
    function: 'Videoaulas'
  },
  { 
    icon: Target, 
    title: 'Banco de Questões', 
    description: 'Pratique e teste',
    color: 'bg-gradient-to-br from-green-500/10 to-green-600/10 hover:from-green-500/20 hover:to-green-600/20',
    iconColor: 'text-green-400',
    function: 'Banco de Questões'
  },
  { 
    icon: Hammer, 
    title: 'Simulado OAB', 
    description: 'Prepare-se aqui',
    color: 'bg-gradient-to-br from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20',
    iconColor: 'text-amber-400',
    function: 'Simulado OAB',
    badge: 'Premium'
  },
  { 
    icon: Brain, 
    title: 'Flashcards', 
    description: 'Memorização ativa',
    color: 'bg-gradient-to-br from-pink-500/10 to-pink-600/10 hover:from-pink-500/20 hover:to-pink-600/20',
    iconColor: 'text-pink-400',
    function: 'Flashcards'
  },
  { 
    icon: Brain, 
    title: 'Mapas Mentais', 
    description: 'Visualize conceitos',
    color: 'bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 hover:from-indigo-500/20 hover:to-indigo-600/20',
    iconColor: 'text-indigo-400',
    function: 'Mapas Mentais'
  },
  { 
    icon: Search, 
    title: 'Dicionário Jurídico', 
    description: 'Terminologia especializada',
    color: 'bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 hover:from-cyan-500/20 hover:to-cyan-600/20',
    iconColor: 'text-cyan-400',
    function: 'Dicionário Jurídico'
  },
  { 
    icon: Edit, 
    title: 'Editar Favoritos', 
    description: 'Personalize seu acesso',
    color: 'bg-gradient-to-br from-orange-500/10 to-orange-600/10 hover:from-orange-500/20 hover:to-orange-600/20',
    iconColor: 'text-orange-400',
    function: null // Função especial para edição
  }
];

export const QuickAccessSection = () => {
  const { setCurrentFunction } = useNavigation();

  const handleItemClick = (functionName: string | null) => {
    if (functionName === null) {
      // Implementar funcionalidade de edição de favoritos no futuro
      console.log('Editar favoritos - funcionalidade em desenvolvimento');
      return;
    }
    setCurrentFunction(functionName);
  };

  return (
    <section className="py-6 sm:py-8 px-3 sm:px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold gradient-text mb-1 sm:mb-2">
              Acesso Rápido
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Suas ferramentas mais utilizadas em um clique
            </p>
          </div>
          
          {/* Enhanced branding */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
              <img 
                src="https://imgur.com/M5Qu1m8.png" 
                alt="Direito Premium" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-right">
              <h3 className="text-lg font-bold gradient-text">Direito Premium</h3>
              <p className="text-xs text-muted-foreground">Plataforma Jurídica Completa</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {quickAccessItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={item.title}
                className={`group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer border-border/30 hover:border-red-500/30 animate-fade-in-up ${item.color}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleItemClick(item.function)}
              >
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className="absolute top-2 right-2 z-10 text-xs bg-red-500/90 text-white hover:bg-red-600/90"
                  >
                    {item.badge}
                  </Badge>
                )}
                
                <CardContent className="p-3 sm:p-4 text-center relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 rounded-xl flex items-center justify-center bg-background/50 backdrop-blur-sm group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${item.iconColor} group-hover:animate-pulse`} />
                  </div>
                  
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1 group-hover:text-red-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                    {item.description}
                  </p>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
