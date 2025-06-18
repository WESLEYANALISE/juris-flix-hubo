
import { Scale, Bot, Play, FileText, Brain, Download, Newspaper, Target, Hammer, Search, BookOpen, Calendar, Users, Video, Headphones, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigation } from '@/context/NavigationContext';

const features = [
  {
    icon: Scale,
    title: 'Vade Mecum Digital',
    description: 'Legislação brasileira atualizada em tempo real com busca inteligente e favoritos.',
    category: 'Legislação',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    premium: true,
    function: 'Vade Mecum Digital'
  },
  {
    icon: Bot,
    title: 'Assistente IA Jurídica',
    description: 'Inteligência artificial especializada em direito para consultas e análises.',
    category: 'IA',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    premium: true,
    function: 'Assistente IA Jurídica'
  },
  {
    icon: Target,
    title: 'Banco de Questões',
    description: 'Milhares de questões organizadas por área do direito e nível de dificuldade.',
    category: 'Estudo',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    premium: false,
    function: 'Banco de Questões'
  },
  {
    icon: Hammer,
    title: 'Simulado OAB',
    description: 'Simulados completos para preparação para o exame da Ordem dos Advogados.',
    category: 'OAB',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    premium: true,
    function: 'Simulado OAB'
  },
  {
    icon: Play,
    title: 'Videoaulas Premium',
    description: 'Conteúdo em vídeo produzido por especialistas nas principais áreas jurídicas.',
    category: 'Vídeo',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    premium: true,
    function: 'Videoaulas'
  },
  {
    icon: Brain,
    title: 'Flashcards Inteligentes',
    description: 'Sistema de repetição espaçada para memorização eficiente de conceitos.',
    category: 'Memorização',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    premium: false,
    function: 'Flashcards'
  },
  {
    icon: Brain,
    title: 'Mapas Mentais',
    description: 'Visualização gráfica de conceitos jurídicos para melhor compreensão.',
    category: 'Visual',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    premium: false,
    function: 'Mapas Mentais'
  },
  {
    icon: Search,
    title: 'Dicionário Jurídico',
    description: 'Glossário completo com definições precisas de termos jurídicos.',
    category: 'Referência',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    premium: false,
    function: 'Dicionário Jurídico'
  },
  {
    icon: FileText,
    title: 'Biblioteca de Modelos',
    description: 'Petições, contratos e documentos jurídicos prontos para uso.',
    category: 'Modelos',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    premium: true,
    function: 'Biblioteca de Modelos'
  },
  {
    icon: Newspaper,
    title: 'Notícias Jurídicas',
    description: 'Atualizações diárias sobre mudanças na legislação e jurisprudência.',
    category: 'Notícias',
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    premium: false,
    function: 'Notícias Jurídicas'
  },
  {
    icon: Download,
    title: 'Central de Downloads',
    description: 'Biblioteca de materiais para download: ebooks, guias e formulários.',
    category: 'Downloads',
    color: 'text-slate-400',
    bgColor: 'bg-slate-500/10',
    premium: false,
    function: 'Downloads'
  },
  {
    icon: Calendar,
    title: 'Agenda Jurídica',
    description: 'Calendário com prazos processuais e datas importantes do direito.',
    category: 'Agenda',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    premium: true,
    function: 'Agenda Jurídica'
  }
];

export const FeaturesGrid = () => {
  const { setCurrentFunction } = useNavigation();

  const handleFeatureClick = (functionName: string) => {
    setCurrentFunction(functionName);
  };

  return (
    <section className="py-8 sm:py-12 px-3 sm:px-4 md:px-8 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Plataforma Jurídica Completa
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Todas as ferramentas que você precisa para estudar, praticar e exercer o direito 
            com excelência em uma única plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title}
                className="group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer border-border/30 hover:border-red-500/30 animate-fade-in-up bg-card/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleFeatureClick(feature.function)}
              >
                {feature.premium && (
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3 z-10 bg-red-500/90 text-white hover:bg-red-600/90 text-xs"
                  >
                    Premium
                  </Badge>
                )}

                <CardHeader className="pb-3">
                  <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                    <Icon className={`h-7 w-7 ${feature.color} group-hover:animate-pulse`} />
                  </div>
                  
                  <CardTitle className="text-lg font-bold text-foreground group-hover:text-red-300 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                  
                  <Badge variant="outline" className="w-fit text-xs">
                    {feature.category}
                  </Badge>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300">
                    {feature.description}
                  </p>

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-4 group-hover:bg-red-500/10 group-hover:text-red-400 transition-all duration-300"
                  >
                    Acessar Ferramenta
                  </Button>
                </CardContent>

                {/* Enhanced hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -top-full group-hover:top-full bg-gradient-to-b from-transparent via-white/10 to-transparent transition-all duration-1000 opacity-0 group-hover:opacity-100" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
