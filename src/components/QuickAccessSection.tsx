
import { Card, CardContent } from '@/components/ui/card';
import { useNavigation } from '@/context/NavigationContext';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Calculator, 
  Clock, 
  Star,
  Zap,
  Target
} from 'lucide-react';

const quickAccessItems = [
  {
    id: 'pesquisa-rapida',
    title: 'Pesquisa Rápida',
    description: 'Busque qualquer artigo',
    icon: Search,
    color: 'from-blue-500 to-blue-600',
    action: 'Vade Mecum'
  },
  {
    id: 'resumos',
    title: 'Resumos',
    description: 'Conteúdo condensado',
    icon: BookOpen,
    color: 'from-emerald-500 to-emerald-600',
    action: 'Resumos Jurídicos'
  },
  {
    id: 'questoes',
    title: 'Questões',
    description: 'Pratique agora',
    icon: Target,
    color: 'from-purple-500 to-purple-600',
    action: 'Banco de Questões'
  },
  {
    id: 'calculadora',
    title: 'Calculadora',
    description: 'Cálculos jurídicos',
    icon: Calculator,
    color: 'from-amber-500 to-amber-600',
    action: 'Calculadora Jurídica'
  },
  {
    id: 'cronometro',
    title: 'Cronômetro',
    description: 'Tempo de estudo',
    icon: Clock,
    color: 'from-red-500 to-red-600',
    action: 'Cronômetro'
  },
  {
    id: 'favoritos',
    title: 'Favoritos',
    description: 'Seus salvos',
    icon: Star,
    color: 'from-yellow-500 to-yellow-600',
    action: 'Favoritos'
  },
  {
    id: 'simulados',
    title: 'Simulados',
    description: 'Teste seus conhecimentos',
    icon: Zap,
    color: 'from-indigo-500 to-indigo-600',
    action: 'Simulados OAB'
  },
  {
    id: 'peticoes',
    title: 'Petições',
    description: 'Modelos prontos',
    icon: FileText,
    color: 'from-teal-500 to-teal-600',
    action: 'Modelos de Petições'
  }
];

export const QuickAccessSection = () => {
  const { setCurrentFunction } = useNavigation();

  const handleQuickAccess = (action: string) => {
    setCurrentFunction(action);
  };

  return (
    <section className="py-12 sm:py-16 px-4 md:px-8 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Acesso Rápido
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Funcionalidades essenciais ao seu alcance para otimizar seus estudos
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {quickAccessItems.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <Card 
                key={item.id}
                className="group cursor-pointer border-border/30 bg-card/40 backdrop-blur-sm hover:bg-card/70 transition-all duration-500 hover:scale-105 hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleQuickAccess(item.action)}
              >
                <CardContent className="p-3 sm:p-4 text-center relative overflow-hidden">
                  {/* Background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-md group-hover:shadow-lg`}>
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-sm" />
                  </div>
                  
                  <h3 className="font-semibold text-sm sm:text-base mb-1 text-foreground group-hover:text-red-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                    {item.description}
                  </p>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-lg bg-red-500/0 group-hover:bg-red-500/5 transition-all duration-300" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            Mais de <span className="text-red-400 font-semibold">50.000+</span> estudantes confiam em nossa plataforma
          </p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
