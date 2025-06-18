
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Compass, 
  Search, 
  Scale, 
  Brain, 
  Library, 
  Headphones, 
  StickyNote, 
  Video,
  BookOpen,
  Users,
  Target,
  Lightbulb,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';

interface AppFunction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  features: string[];
  useCases: {
    title: string;
    description: string;
    example: string;
  }[];
  tips: string[];
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  color: string;
}

const appFunctions: AppFunction[] = [
  {
    id: 'vade-mecum',
    title: 'Vade Mecum Digital',
    description: 'Acesso completo à legislação brasileira atualizada em formato digital, com recursos de busca avançada e navegação intuitiva.',
    icon: Scale,
    category: 'Legislação',
    features: [
      'Legislação sempre atualizada',
      'Busca por palavra-chave',
      'Marcadores e favoritos',
      'Histórico de consultas',
      'Modo offline disponível'
    ],
    useCases: [
      {
        title: 'Consulta Rápida em Audiência',
        description: 'Durante uma audiência, você precisa verificar um artigo específico do Código Civil.',
        example: 'Busque por "Código Civil artigo 186" para encontrar rapidamente a definição de ato ilícito.'
      },
      {
        title: 'Preparação de Petição',
        description: 'Ao redigir uma petição, você precisa fundamentar juridicamente seus argumentos.',
        example: 'Use os favoritos para salvar artigos relevantes e construa sua argumentação com base legal sólida.'
      },
      {
        title: 'Estudo Comparativo',
        description: 'Compare diferentes diplomas legais para entender a evolução da legislação.',
        example: 'Compare o Código Civil de 1916 com o atual para entender as mudanças na responsabilidade civil.'
      }
    ],
    tips: [
      'Use aspas para busca exata: "responsabilidade civil"',
      'Salve artigos frequentemente consultados nos favoritos',
      'Utilize o histórico para revisar suas consultas anteriores'
    ],
    difficulty: 'Iniciante',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'mapas-mentais',
    title: 'Mapas Mentais Jurídicos',
    description: 'Ferramenta de visualização que conecta conceitos jurídicos de forma intuitiva, facilitando o aprendizado e a memorização.',
    icon: Brain,
    category: 'Estudo',
    features: [
      'Templates pré-definidos',
      'Conexões entre conceitos',
      'Cores e ícones personalizáveis',
      'Exportação em alta qualidade',
      'Colaboração em tempo real'
    ],
    useCases: [
      {
        title: 'Preparação para OAB',
        description: 'Organize todo o conteúdo de Direito Constitucional em mapas visuais.',
        example: 'Crie um mapa sobre "Direitos Fundamentais" conectando princípios, garantias e limitações.'
      },
      {
        title: 'Análise de Caso Complexo',
        description: 'Visualize todas as relações jurídicas envolvidas em um caso multifacetado.',
        example: 'Mapeie um caso de sucessão envolvendo múltiplos herdeiros, bens e questões tributárias.'
      },
      {
        title: 'Aula ou Palestra',
        description: 'Estruture apresentações de forma clara e didática.',
        example: 'Organize uma aula sobre contratos mostrando classificações, elementos e efeitos.'
      }
    ],
    tips: [
      'Comece pelo conceito central e expanda gradualmente',
      'Use cores diferentes para cada ramo do direito',
      'Inclua exemplos práticos em cada conceito'
    ],
    difficulty: 'Intermediário',
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 'flashcards',
    title: 'Flashcards Inteligentes',
    description: 'Sistema de memorização baseado em repetição espaçada, otimizado para retenção de conhecimento jurídico a longo prazo.',
    icon: Brain,
    category: 'Memorização',
    features: [
      'Algoritmo de repetição espaçada',
      'Categorização por matéria',
      'Estatísticas de progresso',
      'Modo revisão intensiva',
      'Sincronização multiplataforma'
    ],
    useCases: [
      {
        title: 'Memorização de Súmulas',
        description: 'Decorar súmulas do STF e STJ para concursos públicos.',
        example: 'Crie cards com o número da súmula na frente e o texto completo no verso.'
      },
      {
        title: 'Conceitos de Processo Civil',
        description: 'Fixar definições e prazos processuais.',
        example: 'Card: "Prazo para contestação em processo de conhecimento" / Resposta: "15 dias"'
      },
      {
        title: 'Revisão Pré-Prova',
        description: 'Revisão rápida antes de exames e concursos.',
        example: 'Use o modo revisão intensiva para repassar 100+ conceitos em 30 minutos.'
      }
    ],
    tips: [
      'Revise diariamente, mesmo que por poucos minutos',
      'Crie cards curtos e objetivos',
      'Use imagens e mnemônicos para melhor fixação'
    ],
    difficulty: 'Iniciante',
    color: 'from-green-600 to-teal-600'
  },
  {
    id: 'videoaulas',
    title: 'Videoaulas Especializadas',
    description: 'Biblioteca completa de videoaulas organizadas por área jurídica, com professores especialistas e conteúdo atualizado.',
    icon: Video,
    category: 'Educação',
    features: [
      'Professores especialistas',
      'Organização por área jurídica',
      'Controle de velocidade',
      'Legendas e transcrições',
      'Certificados de conclusão'
    ],
    useCases: [
      {
        title: 'Aprofundamento Teórico',
        description: 'Entender conceitos complexos com explicações detalhadas.',
        example: 'Assista aulas sobre "Teoria Geral do Negócio Jurídico" para compreender vícios do consentimento.'
      },
      {
        title: 'Atualização Legislativa',
        description: 'Acompanhar mudanças recentes na legislação.',
        example: 'Videoaulas sobre o Marco do Saneamento e suas implicações jurídicas.'
      },
      {
        title: 'Preparação Estratégica',
        description: 'Preparação focada para concursos específicos.',
        example: 'Sequência de aulas sobre Direito Administrativo para concurso de Procurador.'
      }
    ],
    tips: [
      'Faça anotações durante as aulas',
      'Pause para refletir sobre conceitos complexos',
      'Revise as aulas antes de provas importantes'
    ],
    difficulty: 'Iniciante',
    color: 'from-red-600 to-orange-600'
  },
  {
    id: 'biblioteca',
    title: 'Biblioteca Digital',
    description: 'Acervo completo de livros jurídicos, artigos acadêmicos, jurisprudência e doutrina, organizados para facilitar a pesquisa.',
    icon: Library,
    category: 'Pesquisa',
    features: [
      'Acervo multidisciplinar',
      'Busca por texto completo',
      'Anotações personalizadas',
      'Citações automáticas',
      'Modo leitura otimizado'
    ],
    useCases: [
      {
        title: 'Pesquisa Acadêmica',
        description: 'Encontrar referências para artigos científicos e trabalhos de conclusão.',
        example: 'Busque por "responsabilidade civil médica" para encontrar doutrinas e jurisprudências relevantes.'
      },
      {
        title: 'Fundamentação de Pareceres',
        description: 'Embasar opiniões técnicas com doutrina consolidada.',
        example: 'Consulte manuais de Direito Tributário para fundamentar parecer sobre ICMS.'
      },
      {
        title: 'Atualização Profissional',
        description: 'Manter-se atualizado com as últimas publicações da área.',
        example: 'Leia artigos recentes sobre Lei Geral de Proteção de Dados.'
      }
    ],
    tips: [
      'Use filtros para refinar sua busca',
      'Salve trechos importantes com anotações',
      'Configure alertas para novos conteúdos de seu interesse'
    ],
    difficulty: 'Intermediário',
    color: 'from-amber-600 to-yellow-600'
  },
  {
    id: 'audio-aulas',
    title: 'Áudio-aulas',
    description: 'Conteúdo jurídico em formato de áudio para aprendizado durante deslocamentos, exercícios ou outras atividades.',
    icon: Headphones,
    category: 'Educação',
    features: [
      'Download para modo offline',
      'Controle de velocidade',
      'Marcadores de tempo',
      'Playlists personalizadas',
      'Transcrição disponível'
    ],
    useCases: [
      {
        title: 'Aproveitamento do Tempo',
        description: 'Estudar durante trajetos de casa para o trabalho.',
        example: 'Ouça aulas de Direito Penal durante o trânsito para otimizar seu tempo de estudo.'
      },
      {
        title: 'Revisão Antes do Sono',
        description: 'Revisar conteúdo de forma relaxante antes de dormir.',
        example: 'Escute resumos de Constitucional em velocidade reduzida para fixação noturna.'
      },
      {
        title: 'Estudo Durante Exercícios',
        description: 'Combinar atividade física com aprendizado.',
        example: 'Ouça podcasts jurídicos durante caminhadas ou exercícios na academia.'
      }
    ],
    tips: [
      'Comece com velocidade 1x e aumente gradualmente',
      'Use fones de qualidade para melhor compreensão',
      'Faça pausas para reflexão sobre conceitos importantes'
    ],
    difficulty: 'Iniciante',
    color: 'from-indigo-600 to-blue-600'
  },
  {
    id: 'anotacoes',
    title: 'Sistema de Anotações',
    description: 'Ferramenta completa para organizar notas, ideias e insights jurídicos com categorização, tags e busca avançada.',
    icon: StickyNote,
    category: 'Organização',
    features: [
      'Categorização automática',
      'Sistema de tags',
      'Busca por conteúdo',
      'Backup automático',
      'Compartilhamento seguro'
    ],
    useCases: [
      {
        title: 'Registro de Reuniões',
        description: 'Documentar pontos importantes de reuniões com clientes.',
        example: 'Anote estratégias processuais discutidas e prazos importantes definidos.'
      },
      {
        title: 'Ideias para Artigos',
        description: 'Capturar insights para futuras publicações acadêmicas.',
        example: 'Registre reflexões sobre lacunas na legislação que poderiam virar artigos.'
      },
      {
        title: 'Lições Aprendidas',
        description: 'Documentar aprendizados de casos práticos.',
        example: 'Anote erros cometidos e como evitá-los em casos futuros similares.'
      }
    ],
    tips: [
      'Use tags consistentes para facilitar a busca',
      'Revise suas anotações semanalmente',
      'Crie templates para tipos recorrentes de anotações'
    ],
    difficulty: 'Iniciante',
    color: 'from-pink-600 to-rose-600'
  }
];

const categories = ['Todos', 'Legislação', 'Estudo', 'Memorização', 'Educação', 'Pesquisa', 'Organização'];

export const Explorar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedFunction, setSelectedFunction] = useState<AppFunction | null>(null);

  const filteredFunctions = appFunctions.filter(func => {
    const matchesSearch = func.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         func.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || func.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-500';
      case 'Intermediário': return 'bg-yellow-500';
      case 'Avançado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (selectedFunction) {
    const IconComponent = selectedFunction.icon;
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
        <Button 
          variant="outline" 
          onClick={() => setSelectedFunction(null)}
          className="mb-6"
        >
          <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header da Função */}
            <Card className={`bg-gradient-to-r ${selectedFunction.color} text-white border-0`}>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{selectedFunction.title}</h1>
                    <Badge className={`${getDifficultyColor(selectedFunction.difficulty)} text-white mt-2`}>
                      {selectedFunction.difficulty}
                    </Badge>
                  </div>
                </div>
                <p className="text-lg opacity-90">{selectedFunction.description}</p>
              </CardContent>
            </Card>

            {/* Casos de Uso */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent-legal" />
                  Casos de Uso Práticos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {selectedFunction.useCases.map((useCase, index) => (
                    <div key={index} className="border-l-4 border-accent-legal pl-4">
                      <h4 className="font-semibold text-lg mb-2">{useCase.title}</h4>
                      <p className="text-muted-foreground mb-3">{useCase.description}</p>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm"><strong>Exemplo:</strong> {useCase.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dicas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  Dicas de Uso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {selectedFunction.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent-legal rounded-full mt-2 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recursos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent-legal" />
                  Principais Recursos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedFunction.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent-legal rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Informações Adicionais */}
            <Card>
              <CardHeader>
                <CardTitle>Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Categoria: {selectedFunction.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Tempo de aprendizado: 
                    {selectedFunction.difficulty === 'Iniciante' ? ' 15-30 min' :
                     selectedFunction.difficulty === 'Intermediário' ? ' 1-2 horas' : ' 3+ horas'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-4 flex items-center justify-center gap-3">
          <Compass className="h-8 w-8 text-accent-legal" />
          Explorar Funcionalidades
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Descubra todas as ferramentas disponíveis e aprenda como utilizá-las de forma eficiente em seu dia a dia jurídico.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar funcionalidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'bg-accent-legal hover:bg-accent-legal/90' : ''}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid de Funcionalidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFunctions.map(func => {
          const IconComponent = func.icon;
          return (
            <Card 
              key={func.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-accent-legal/30"
              onClick={() => setSelectedFunction(func)}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${func.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg group-hover:text-accent-legal transition-colors">
                    {func.title}
                  </h3>
                  <Badge className={`${getDifficultyColor(func.difficulty)} text-white text-xs`}>
                    {func.difficulty}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {func.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {func.category}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent-legal group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredFunctions.length === 0 && (
        <Card className="text-center p-8">
          <Compass className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold mb-2">Nenhuma funcionalidade encontrada</h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou usar termos de busca diferentes.
          </p>
        </Card>
      )}
    </div>
  );
};
