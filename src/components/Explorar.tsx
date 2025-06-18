
import { ArrowLeft, Search, Brain, BookOpen, Scale, Users, Download, Play, StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const Explorar = () => {
  const { setCurrentFunction } = useNavigation();

  const handleBack = () => {
    setCurrentFunction(null);
  };

  const features = [
    {
      icon: Scale,
      title: 'Vade Mecum',
      description: 'Consulte a legislação brasileira completa e atualizada',
      examples: [
        'Busque por artigos específicos do Código Civil',
        'Consulte jurisprudência relacionada a casos similares',
        'Acesse decretos e portarias atualizados'
      ],
      tutorial: 'Use a barra de pesquisa para encontrar leis específicas ou navegue pelas categorias organizadas por área do direito.',
      color: 'bg-amber-50 border-amber-200'
    },
    {
      icon: BookOpen,
      title: 'Biblioteca Jurídica',
      description: 'Acesse livros, artigos e publicações especializadas',
      examples: [
        'Estude doutrina sobre Direito Constitucional',
        'Leia artigos sobre jurisprudência recente',
        'Consulte comentários de especialistas'
      ],
      tutorial: 'Filtre por área do direito, autor ou ano de publicação para encontrar o material mais relevante para seus estudos.',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      icon: Brain,
      title: 'Flashcards',
      description: 'Memorize conceitos através de cartões interativos',
      examples: [
        'Revise definições de institutos jurídicos',
        'Pratique com casos práticos resumidos',
        'Teste conhecimentos sobre prazos processuais'
      ],
      tutorial: 'Crie decks personalizados ou use os pré-definidos. O sistema adapta a frequência das revisões baseado no seu desempenho.',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      icon: Brain,
      title: 'Mapas Mentais',
      description: 'Visualize conexões entre conceitos jurídicos',
      examples: [
        'Mapeie os requisitos de uma ação judicial',
        'Conecte princípios constitucionais relacionados',
        'Organize cronologicamente procedimentos legais'
      ],
      tutorial: 'Comece com um conceito central e adicione ramificações. Use cores para categorizar diferentes tipos de informação.',
      color: 'bg-green-50 border-green-200'
    },
    {
      icon: Play,
      title: 'Videoaulas',
      description: 'Aprenda com professores especializados',
      examples: [
        'Assista aulas sobre novos entendimentos do STF',
        'Acompanhe análises de casos práticos',
        'Participe de lives sobre mudanças legislativas'
      ],
      tutorial: 'Use a função de velocidade variável, faça anotações sincronizadas e marque trechos importantes para revisão.',
      color: 'bg-red-50 border-red-200'
    },
    {
      icon: Download,
      title: 'Downloads',
      description: 'Baixe materiais para estudo offline',
      examples: [
        'Faça download de PDFs de leis atualizadas',
        'Baixe modelos de petições e contratos',
        'Salve resumos e esquemas de estudo'
      ],
      tutorial: 'Organize seus downloads em pastas temáticas e sincronize entre dispositivos para acesso offline.',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      icon: Users,
      title: 'Notícias Jurídicas',
      description: 'Mantenha-se atualizado com o mundo jurídico',
      examples: [
        'Leia sobre decisões recentes dos tribunais',
        'Acompanhe mudanças na legislação',
        'Receba alertas sobre sua área de interesse'
      ],
      tutorial: 'Configure filtros por área do direito e receba notificações push sobre as principais novidades.',
      color: 'bg-cyan-50 border-cyan-200'
    },
    {
      icon: StickyNote,
      title: 'Anotações',
      description: 'Organize seus estudos e ideias',
      examples: [
        'Crie fichamentos de livros e artigos',
        'Faça anotações durante as videoaulas',
        'Organize ideias para trabalhos acadêmicos'
      ],
      tutorial: 'Use tags para categorizar anotações, crie links entre conceitos relacionados e exporte para diferentes formatos.',
      color: 'bg-pink-50 border-pink-200'
    }
  ];

  const useCases = [
    {
      title: 'Estudante de Direito',
      scenario: 'Preparação para provas e concursos',
      workflow: [
        'Use flashcards para memorizar conceitos básicos',
        'Assista videoaulas sobre temas complexos',
        'Faça anotações organizadas por disciplina',
        'Consulte o Vade Mecum para verificar artigos',
        'Crie mapas mentais para conectar diferentes institutos'
      ]
    },
    {
      title: 'Advogado Iniciante',
      scenario: 'Pesquisa para elaboração de petições',
      workflow: [
        'Pesquise jurisprudência na Biblioteca',
        'Consulte artigos atualizados no Vade Mecum',
        'Baixe modelos de petições em Downloads',
        'Mantenha-se atualizado com Notícias Jurídicas',
        'Faça anotações sobre estratégias processuais'
      ]
    },
    {
      title: 'Concurseiro',
      scenario: 'Preparação intensiva para concursos',
      workflow: [
        'Estude com videoaulas organizadas por edital',
        'Pratique com flashcards de questões anteriores',
        'Use mapas mentais para revisar matérias extensas',
        'Faça anotações de pontos importantes',
        'Consulte legislação atualizada constantemente'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>

        <div className="text-center mb-12">
          <Search className="h-16 w-16 mx-auto text-blue-500 mb-6" />
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Explorar Funcionalidades</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Descubra como aproveitar ao máximo todas as ferramentas disponíveis para 
            otimizar seus estudos e prática jurídica.
          </p>
        </div>

        {/* Funcionalidades Principais */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Funcionalidades Principais
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className={`${feature.color} hover:shadow-lg transition-shadow duration-300`}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-8 w-8 text-slate-700" />
                      <CardTitle className="text-xl text-slate-800">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-slate-600">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Exemplos de Uso:</h4>
                      <ul className="space-y-1">
                        {feature.examples.map((example, idx) => (
                          <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <h4 className="font-semibold text-slate-700 mb-1">💡 Dica:</h4>
                      <p className="text-sm text-slate-600">{feature.tutorial}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Casos de Uso */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Casos de Uso Práticos
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="bg-white border-slate-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {useCase.title}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-slate-800">{useCase.scenario}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-slate-700 mb-3">Fluxo de Trabalho:</h4>
                  <ol className="space-y-2">
                    {useCase.workflow.map((step, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-start gap-3">
                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold mt-0.5 flex-shrink-0">
                          {idx + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Dicas Gerais */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            🎯 Dicas para Maximizar seu Aprendizado
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-700">Organização</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Crie uma rotina de estudos consistente
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Use tags e categorias para organizar conteúdo
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Sincronize entre dispositivos para estudar em qualquer lugar
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-700">Eficiência</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Combine diferentes ferramentas para reforçar o aprendizado
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Revise regularmente com flashcards e mapas mentais
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Mantenha-se atualizado com notícias jurídicas diárias
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
