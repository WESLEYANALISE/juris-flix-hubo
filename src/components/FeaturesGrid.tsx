
import { 
  Book, 
  BookOpen, 
  Bot, 
  Library, 
  Headphones, 
  GraduationCap, 
  Video, 
  Brain, 
  Monitor, 
  CreditCard, 
  HelpCircle, 
  Scale, 
  FileText, 
  Globe, 
  Film, 
  Newspaper 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    id: 'vade-mecum',
    title: 'Vade Mecum',
    description: 'Leis e códigos atualizados',
    icon: Book,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'resumos',
    title: 'Resumos',
    description: 'Resumos das principais matérias',
    icon: BookOpen,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'assistente-ia',
    title: 'Assistente IA',
    description: 'IA especializada em Direito',
    icon: Bot,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'livros',
    title: 'Livros',
    description: 'Biblioteca jurídica completa',
    icon: Library,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'audio-aulas',
    title: 'Áudio Aulas',
    description: 'Escute enquanto estuda',
    icon: Headphones,
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'cursos',
    title: 'Cursos',
    description: 'Cursos completos online',
    icon: GraduationCap,
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'video-aulas',
    title: 'Vídeo Aulas',
    description: 'Aulas em vídeo HD',
    icon: Video,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'mapas-mentais',
    title: 'Mapas Mentais',
    description: 'Visualize o conhecimento',
    icon: Brain,
    color: 'from-teal-500 to-teal-600'
  },
  {
    id: 'desktop',
    title: 'Desktop',
    description: 'Versão para computador',
    icon: Monitor,
    color: 'from-gray-500 to-gray-600'
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    description: 'Memorização eficiente',
    icon: CreditCard,
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 'questoes',
    title: 'Questões',
    description: 'Banco de questões atualizado',
    icon: HelpCircle,
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 'oab-simulado',
    title: 'OAB Simulado',
    description: 'Prepare-se para a OAB',
    icon: Scale,
    color: 'from-amber-500 to-amber-600'
  },
  {
    id: 'peticoes',
    title: 'Modelo de Petições',
    description: 'Templates prontos',
    icon: FileText,
    color: 'from-lime-500 to-lime-600'
  },
  {
    id: 'dicionario',
    title: 'Dicionário Jurídico',
    description: 'Termos e definições',
    icon: Globe,
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'filmes',
    title: 'Filmes',
    description: 'Filmes jurídicos educativos',
    icon: Film,
    color: 'from-violet-500 to-violet-600'
  },
  {
    id: 'noticias',
    title: 'Notícias',
    description: 'Atualizações jurídicas',
    icon: Newspaper,
    color: 'from-rose-500 to-rose-600'
  }
];

export const FeaturesGrid = () => {
  return (
    <div className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Todas as Ferramentas que Você Precisa
          </h2>
          <p className="text-xl text-muted-foreground">
            Uma plataforma completa para seus estudos jurídicos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.id} 
                className="group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
