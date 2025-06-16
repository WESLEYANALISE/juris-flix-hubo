
import { Book, BookOpen, Bot, Library, Headphones, GraduationCap, Video, Brain, Monitor, CreditCard, HelpCircle, Scale, FileText, Globe, Film, Newspaper } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    id: 'vade-mecum',
    title: 'Vade Mecum Digital',
    description: 'Legislação atualizada em tempo real',
    icon: Book,
    color: 'from-blue-600 to-blue-700',
    legal: true
  },
  {
    id: 'resumos',
    title: 'Resumos Jurídicos',
    description: 'Sínteses das principais doutrinas',
    icon: BookOpen,
    color: 'from-emerald-600 to-emerald-700',
    legal: true
  },
  {
    id: 'assistente-ia',
    title: 'Assistente IA Jurídica',
    description: 'Inteligência artificial especializada',
    icon: Bot,
    color: 'from-purple-600 to-purple-700',
    legal: true
  },
  {
    id: 'biblioteca',
    title: 'Biblioteca Jurídica',
    description: 'Acervo completo de obras doutrinárias',
    icon: Library,
    color: 'from-amber-600 to-amber-700',
    legal: true
  },
  {
    id: 'audio-aulas',
    title: 'Podcasts Jurídicos',
    description: 'Conteúdo para estudar em movimento',
    icon: Headphones,
    color: 'from-pink-600 to-pink-700',
    legal: false
  },
  {
    id: 'cursos',
    title: 'Cursos Preparatórios',
    description: 'Formação completa para concursos',
    icon: GraduationCap,
    color: 'from-indigo-600 to-indigo-700',
    legal: true
  },
  {
    id: 'video-aulas',
    title: 'Videoaulas Premium',
    description: 'Aulas com professores renomados',
    icon: Video,
    color: 'from-red-600 to-red-700',
    legal: false
  },
  {
    id: 'mapas-mentais',
    title: 'Mapas Conceituais',
    description: 'Visualização do conhecimento jurídico',
    icon: Brain,
    color: 'from-teal-600 to-teal-700',
    legal: false
  },
  {
    id: 'desktop',
    title: 'Plataforma Desktop',
    description: 'Aplicativo para computador',
    icon: Monitor,
    color: 'from-slate-600 to-slate-700',
    legal: false
  },
  {
    id: 'flashcards',
    title: 'Cartões de Revisão',
    description: 'Memorização eficiente de conceitos',
    icon: CreditCard,
    color: 'from-yellow-600 to-yellow-700',
    legal: false
  },
  {
    id: 'questoes',
    title: 'Banco de Questões',
    description: 'Milhares de questões comentadas',
    icon: HelpCircle,
    color: 'from-cyan-600 to-cyan-700',
    legal: true
  },
  {
    id: 'oab-simulado',
    title: 'Simulados OAB',
    description: 'Preparação completa para o exame',
    icon: Scale,
    color: 'from-orange-600 to-orange-700',
    legal: true
  },
  {
    id: 'peticoes',
    title: 'Modelos de Petições',
    description: 'Templates profissionais prontos',
    icon: FileText,
    color: 'from-lime-600 to-lime-700',
    legal: true
  },
  {
    id: 'dicionario',
    title: 'Dicionário Jurídico',
    description: 'Terminologia jurídica completa',
    icon: Globe,
    color: 'from-emerald-600 to-emerald-700',
    legal: true
  },
  {
    id: 'filmes',
    title: 'Documentários Jurídicos',
    description: 'Conteúdo audiovisual educativo',
    icon: Film,
    color: 'from-violet-600 to-violet-700',
    legal: false
  },
  {
    id: 'noticias',
    title: 'Notícias Jurídicas',
    description: 'Atualizações do mundo do Direito',
    icon: Newspaper,
    color: 'from-rose-600 to-rose-700',
    legal: true
  }
];

export const FeaturesGrid = () => {
  return (
    <div className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Ferramentas Jurídicas Profissionais
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Uma plataforma completa desenvolvida especialmente para profissionais e estudantes do Direito
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.id} 
                className={`group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:scale-105 hover-lift hover-glow animate-scale-in ${
                  feature.legal ? 'ring-1 ring-red-500/20' : ''
                }`}
                style={{
                  animationDelay: `${index * 0.08}s`
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-18 h-18 mx-auto mb-4 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                    <Icon className="h-9 w-9 text-white drop-shadow-sm" />
                    
                    {/* Legal badge for juridical features */}
                    {feature.legal && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-red-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Hover overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
