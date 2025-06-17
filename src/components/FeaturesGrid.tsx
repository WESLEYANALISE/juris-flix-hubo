import { 
  Scale, 
  Bot, 
  Library, 
  Headphones, 
  Brain, 
  Monitor,
  ChevronRight
} from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';
import { Button } from '@/components/ui/button';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  gradient: string;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  function: string;
}

export const FeaturesGrid = () => {
  const { setCurrentFunction } = useNavigation();

  const features = [
    {
      id: 'vade-mecum',
      title: 'Vade Mecum Digital',
      description: 'Acesso completo à legislação brasileira atualizada em tempo real',
      icon: Scale,
      category: 'legal',
      gradient: 'from-amber-600 to-amber-700',
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      function: 'Vade Mecum'
    },
    {
      id: 'ia-juridica',
      title: 'Assistente IA Jurídica',
      description: 'Inteligência artificial especializada em direito brasileiro',
      icon: Bot,
      category: 'ai',
      gradient: 'from-cyan-600 to-cyan-700',
      iconColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      function: 'IA Jurídica'
    },
    {
      id: 'biblioteca',
      title: 'Biblioteca Jurídica',
      description: 'Vasto acervo de doutrinas, jurisprudências e artigos',
      icon: Library,
      category: 'docs',
      gradient: 'from-green-600 to-green-700',
      iconColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      function: 'Biblioteca'
    },
    {
      id: 'audio-aulas',
      title: 'Áudio-aulas Premium',
      description: 'Conteúdo educacional em formato de podcast jurídico',
      icon: Headphones,
      category: 'media',
      gradient: 'from-purple-600 to-purple-700',
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      function: 'Áudio-aulas'
    },
    {
      id: 'mapas-mentais',
      title: 'Mapas Conceituais',
      description: 'Visualização estruturada de conceitos jurídicos complexos',
      icon: Brain,
      category: 'study',
      gradient: 'from-pink-600 to-pink-700',
      iconColor: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      function: 'Mapas Mentais'
    },
    {
      id: 'plataforma-desktop',
      title: 'Plataforma Desktop',
      description: 'Versão completa para estudo avançado e produtividade',
      icon: Monitor,
      category: 'study',
      gradient: 'from-slate-600 to-slate-700',
      iconColor: 'text-slate-400',
      bgColor: 'bg-slate-500/10',
      borderColor: 'border-slate-500/20',
      function: 'Plataforma Desktop'
    }
  ];

  const handleFeatureClick = (functionName: string) => {
    setCurrentFunction(functionName);
  };

  return (
    <section className="px-3 sm:px-4 md:px-8 mb-8 sm:mb-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-legal">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text-legal animate-legal-text-glow">
            Ferramentas Jurídicas Completas
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Tudo que você precisa para seus estudos jurídicos e prática profissional em uma única plataforma
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => handleFeatureClick(feature.function)}
                className={`group relative p-6 sm:p-8 rounded-2xl ${feature.bgColor} ${feature.borderColor} border hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-xl text-left card-depth-1 hover:card-depth-3 animate-bounce-in-legal hover:animate-legal-float`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10 space-y-4 sm:space-y-6">
                  {/* Icon */}
                  <div className={`relative w-12 h-12 sm:w-16 sm:h-16 ${feature.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-500 card-depth-2`}>
                    <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${feature.iconColor} group-hover:animate-legal-icon-glow`} />
                    
                    {/* Sparkle effect */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 animate-legal-sparkle transition-opacity duration-500" />
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 ${feature.bgColor} rounded-xl opacity-0 group-hover:opacity-100 blur-md animate-legal-glow transition-opacity duration-500`} />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 group-hover:animate-legal-text-glow">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Action Indicator */}
                  <div className="flex items-center gap-2 text-sm text-primary/70 group-hover:text-primary transition-colors duration-300">
                    <span className="group-hover:animate-legal-text-glow">Acessar ferramenta</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 group-hover:animate-legal-arrow-float" />
                  </div>
                </div>

                {/* Ripple effect */}
                <div className="absolute inset-0 bg-primary/0 group-active:bg-primary/10 rounded-2xl transition-all duration-300 animate-legal-ripple" />
                
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-legal-hover-glow" 
                     style={{ boxShadow: `0 0 30px ${feature.iconColor.replace('text-', 'rgb(var(--')})/20)` }} />
              </button>
            );
          })}
        </div>

        {/* CTA Section for Mobile */}
        <div className="mt-8 sm:mt-12 text-center lg:hidden animate-fade-in-legal">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:animate-legal-glow"
          >
            Explorar Todas as Ferramentas
          </Button>
        </div>
      </div>
    </section>
  );
};
