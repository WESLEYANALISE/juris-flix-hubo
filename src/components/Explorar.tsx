
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Scale, Library, brain, FileText, Video, Headphones, Download, Newspaper, MonitorSpeaker, StickyNote, Search, BookOpen, Gavel, Users, Trophy, Clock, Star, Lightbulb, Target, Zap } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

export const Explorar = () => {
  const { setCurrentFunction } = useNavigation();

  const handleBack = () => {
    setCurrentFunction(null);
  };

  const handleFunctionSelect = (functionName: string) => {
    setCurrentFunction(functionName);
  };

  const features = [
    {
      title: "Vade Mecum Digital",
      icon: Scale,
      description: "Acesso completo à legislação brasileira atualizada",
      examples: [
        "Busca inteligente por palavras-chave",
        "Navegação por ramos do direito",
        "Comparação entre versões de leis"
      ],
      useCases: [
        "Consulta rápida durante audiências",
        "Pesquisa de jurisprudência para petições",
        "Verificação de alterações legislativas"
      ],
      function: "Vade Mecum"
    },
    {
      title: "Biblioteca Jurídica",
      icon: Library,
      description: "Vasto acervo de livros, doutrinas e materiais de estudo",
      examples: [
        "Livros de doutrinadores renomados",
        "Artigos científicos atualizados",
        "Comentários aos códigos"
      ],
      useCases: [
        "Fundamentação teórica para pareceres",
        "Estudo aprofundado de institutos jurídicos",
        "Preparação para concursos e OAB"
      ],
      function: "Biblioteca"
    },
    {
      title: "Flashcards Inteligentes",
      icon: brain,
      description: "Sistema de repetição espaçada para memorização eficaz",
      examples: [
        "Cards personalizáveis por matéria",
        "Algoritmo de repetição otimizado",
        "Estatísticas de progresso"
      ],
      useCases: [
        "Memorização de artigos importantes",
        "Revisão antes de provas",
        "Fixação de conceitos complexos"
      ],
      function: "Flashcards"
    },
    {
      title: "Mapas Mentais Jurídicos",
      icon: brain,
      description: "Visualização de conexões entre institutos do direito",
      examples: [
        "Mapas interativos por área",
        "Conexões entre conceitos",
        "Templates pré-definidos"
      ],
      useCases: [
        "Organização visual do conhecimento",
        "Compreensão de relações jurídicas",
        "Apresentações didáticas"
      ],
      function: "Mapas Mentais"
    },
    {
      title: "Videoaulas Especializadas",
      icon: Video,
      description: "Conteúdo audiovisual com professores renomados",
      examples: [
        "Aulas organizadas por disciplina",
        "Professores especialistas",
        "Qualidade HD com legendas"
      ],
      useCases: [
        "Aprendizado visual e auditivo",
        "Complemento aos estudos escritos",
        "Flexibilidade de horários"
      ],
      function: "Videoaulas"
    },
    {
      title: "Áudio-aulas Mobile",
      icon: Headphones,
      description: "Estude em qualquer lugar com conteúdo em áudio",
      examples: [
        "Formato podcast",
        "Download offline",
        "Velocidade ajustável"
      ],
      useCases: [
        "Estudo durante deslocamentos",
        "Revisão em caminhadas",
        "Multitarefa com aprendizado"
      ],
      function: "Áudio-aulas"
    },
    {
      title: "Downloads Jurídicos",
      icon: Download,
      description: "Acervo completo de materiais para download",
      examples: [
        "PDFs organizados por matéria",
        "Modelos de petições",
        "Súmulas e orientações"
      ],
      useCases: [
        "Estudo offline",
        "Criação de biblioteca pessoal",
        "Backup de materiais importantes"
      ],
      function: "Downloads"
    },
    {
      title: "Notícias Jurídicas",
      icon: Newspaper,
      description: "Mantenha-se atualizado com as novidades do direito",
      examples: [
        "Notícias do STF e STJ",
        "Alterações legislativas",
        "Análises especializadas"
      ],
      useCases: [
        "Acompanhamento de mudanças",
        "Atualização profissional",
        "Fundamentação em decisões recentes"
      ],
      function: "Notícias Jurídicas"
    },
    {
      title: "Plataforma Desktop",
      icon: MonitorSpeaker,
      description: "Versão completa para computadores",
      examples: [
        "Interface otimizada",
        "Recursos avançados",
        "Sincronização automática"
      ],
      useCases: [
        "Trabalho em escritório",
        "Estudo intensivo",
        "Pesquisas aprofundadas"
      ],
      function: "Plataforma Desktop"
    },
    {
      title: "Sistema de Anotações",
      icon: StickyNote,
      description: "Organize seus estudos com anotações inteligentes",
      examples: [
        "Formatação avançada",
        "Tags e categorias",
        "Busca eficiente"
      ],
      useCases: [
        "Registro de insights",
        "Organização de ideias",
        "Criação de resumos"
      ],
      function: "Anotações"
    }
  ];

  const tutorials = [
    {
      title: "Como usar a Busca Inteligente",
      description: "Aprenda a encontrar qualquer informação rapidamente",
      steps: ["Digite palavras-chave", "Use filtros avançados", "Salve suas buscas frequentes"],
      icon: Search
    },
    {
      title: "Organizando seus Estudos",
      description: "Dicas para criar um cronograma eficiente",
      steps: ["Defina metas diárias", "Use flashcards para revisão", "Acompanhe seu progresso"],
      icon: Target
    },
    {
      title: "Maximizando a Memorização",
      description: "Técnicas científicas de aprendizado",
      steps: ["Repetição espaçada", "Mapas mentais", "Teste ativo"],
      icon: brain
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Economia de Tempo",
      description: "Encontre informações 5x mais rápido"
    },
    {
      icon: Trophy,
      title: "Resultados Comprovados",
      description: "89% de aprovação em concursos"
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "15.000+ profissionais conectados"
    },
    {
      icon: Star,
      title: "Qualidade Premium",
      description: "Conteúdo curado por especialistas"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={handleBack} size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div className="flex-1">
          <h1 className="text-4xl font-bold gradient-text mb-2">🔍 Explorar Plataforma</h1>
          <p className="text-lg text-muted-foreground">
            Descubra como maximizar seus estudos jurídicos
          </p>
        </div>
      </div>

      {/* Benefícios Principais */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Zap className="h-6 w-6 text-amber-500" />
          Por que escolher nossa plataforma?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Icon className="h-12 w-12 mx-auto mb-4 text-accent-legal" />
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Funcionalidades Detalhadas */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-accent-legal" />
          Funcionalidades Completas
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-accent-legal/10 group-hover:bg-accent-legal/20 transition-colors">
                      <Icon className="h-6 w-6 text-accent-legal" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-accent-legal transition-colors">
                        {feature.title}
                      </CardTitle>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      Exemplos Práticos:
                    </h4>
                    <ul className="space-y-2">
                      {feature.examples.map((example, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-accent-legal rounded-full mt-2 flex-shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4 text-green-500" />
                      Casos de Uso:
                    </h4>
                    <ul className="space-y-2">
                      {feature.useCases.map((useCase, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => handleFunctionSelect(feature.function)}
                    className="w-full group-hover:bg-accent-legal group-hover:text-white transition-colors"
                    variant="outline"
                  >
                    Experimentar Agora
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Tutoriais Rápidos */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Gavel className="h-6 w-6 text-accent-legal" />
          Tutoriais Rápidos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tutorials.map((tutorial, index) => {
            const Icon = tutorial.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon className="h-8 w-8 text-accent-legal" />
                    <div>
                      <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tutorial.steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-accent-legal text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {i + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <Card className="bg-gradient-to-r from-accent-legal/10 to-primary/10 border-accent-legal/20">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              Pronto para revolucionar seus estudos?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Junte-se a milhares de profissionais que já transformaram sua carreira
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => handleFunctionSelect("Videoaulas")}
                className="bg-accent-legal hover:bg-accent-legal/90"
              >
                <Video className="h-5 w-5 mr-2" />
                Começar com Videoaulas
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => handleFunctionSelect("Flashcards")}
              >
                <brain className="h-5 w-5 mr-2" />
                Testar Flashcards
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
