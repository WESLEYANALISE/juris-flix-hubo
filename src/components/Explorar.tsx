import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Scale, Brain, Library, Headphones, Download, Newspaper, FileText, Search, BookOpen, Users, Lightbulb, Target, CheckCircle, ArrowRight, Star } from 'lucide-react';
interface FunctionDetail {
  id: string;
  name: string;
  icon: any;
  description: string;
  fullDescription: string;
  useCases: string[];
  benefits: string[];
  howToUse: string[];
  examples: string[];
  category: 'core' | 'study' | 'community' | 'tools';
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  featured: boolean;
}
const functions: FunctionDetail[] = [{
  id: 'vade-mecum',
  name: 'Vade Mecum Digital',
  icon: Scale,
  description: 'Biblioteca completa de leis e códigos brasileiros sempre atualizados',
  fullDescription: 'O Vade Mecum Digital é sua fonte completa de legislação brasileira, contendo todos os principais códigos e leis do país, mantidos sempre atualizados com as últimas alterações legislativas.',
  useCases: ['Consulta rápida durante estudos para concursos', 'Pesquisa de artigos específicos durante redação de peças', 'Verificação de alterações recentes na legislação', 'Comparação entre diferentes códigos', 'Estudos comparativos de legislação'],
  benefits: ['Acesso offline a toda legislação', 'Busca avançada por palavras-chave', 'Histórico de alterações legislativas', 'Marcadores e anotações personalizadas', 'Interface otimizada para estudo'],
  howToUse: ['Acesse através do menu principal', 'Use a busca para encontrar leis específicas', 'Navegue por categoria de direito', 'Marque artigos importantes', 'Faça anotações nos textos'],
  examples: ['Consultar Art. 121 do Código Penal sobre homicídio', 'Pesquisar "usucapião" no Código Civil', 'Verificar prazos prescricionais', 'Estudar princípios constitucionais'],
  category: 'core',
  difficulty: 'Iniciante',
  featured: true
}, {
  id: 'flashcards',
  name: 'Flashcards Inteligentes',
  icon: Brain,
  description: 'Sistema de repetição espaçada para memorização eficaz de conceitos jurídicos',
  fullDescription: 'Nossa plataforma de flashcards utiliza algoritmos de repetição espaçada para otimizar sua memorização, apresentando conceitos no momento ideal para máxima retenção.',
  useCases: ['Memorização de conceitos para provas de OAB', 'Revisão antes de concursos públicos', 'Fixação de jurisprudências importantes', 'Estudo de definições doutrinárias', 'Preparação para arguições orais'],
  benefits: ['Algoritmo científico de repetição', 'Progresso detalhado por área', 'Flashcards personalizáveis', 'Estatísticas de desempenho', 'Modo offline disponível'],
  howToUse: ['Escolha a área de direito desejada', 'Inicie uma sessão de estudos', 'Responda honestamente sobre seu conhecimento', 'Revise regularmente conforme sugerido', 'Acompanhe seu progresso nas estatísticas'],
  examples: ['Memorizar elementos do crime', 'Fixar prazos processuais', 'Decorar princípios administrativos', 'Estudar súmulas vinculantes'],
  category: 'study',
  difficulty: 'Iniciante',
  featured: true
}, {
  id: 'biblioteca',
  name: 'Biblioteca Jurídica',
  icon: Library,
  description: 'Acervo completo de livros, doutrinas e jurisprudências organizadas',
  fullDescription: 'Nossa biblioteca digital contém milhares de obras jurídicas, incluindo livros de doutrina, manuais, comentários, jurisprudências e artigos acadêmicos, tudo organizado e pesquisável.',
  useCases: ['Pesquisa doutrinária para trabalhos acadêmicos', 'Consulta de jurisprudências relevantes', 'Leitura de manuais especializados', 'Estudo aprofundado de temas específicos', 'Preparação para bancas de concurso'],
  benefits: ['Acervo constantemente atualizado', 'Busca por autor, tema ou tribunal', 'Download para leitura offline', 'Sistema de favoritos', 'Compartilhamento de trechos'],
  howToUse: ['Navegue pelas categorias temáticas', 'Use filtros por tipo de obra', 'Pesquise por palavras-chave', 'Baixe obras para leitura offline', 'Organize sua biblioteca pessoal'],
  examples: ['Buscar doutrina sobre direito sucessório', 'Consultar julgados do STF sobre LGPD', 'Baixar manual de direito penal', 'Pesquisar artigos sobre compliance'],
  category: 'core',
  difficulty: 'Intermediário',
  featured: true
}, {
  id: 'audioaulas',
  name: 'Áudio-aulas Especializadas',
  icon: Headphones,
  description: 'Conteúdo em áudio para estudo em qualquer lugar e momento',
  fullDescription: 'Transforme qualquer momento em oportunidade de estudo com nosso extenso catálogo de áudio-aulas, ministradas por professores especialistas em cada área do direito.',
  useCases: ['Estudo durante deslocamentos', 'Revisão enquanto pratica exercícios', 'Aprendizado para pessoas com dificuldades visuais', 'Estudos noturnos sem prejudicar o sono', 'Multitasking durante atividades domésticas'],
  benefits: ['Professores renomados', 'Qualidade de áudio profissional', 'Velocidade de reprodução ajustável', 'Downloads para offline', 'Playlist personalizadas'],
  howToUse: ['Selecione a área de interesse', 'Escolha o professor ou tema', 'Baixe para ouvir offline', 'Ajuste velocidade conforme necessário', 'Faça anotações durante a audição'],
  examples: ['Ouvir sobre direito tributário no trânsito', 'Revisar processo civil durante caminhada', 'Estudar constitucional antes de dormir', 'Escutar sobre direito do trabalho na academia'],
  category: 'study',
  difficulty: 'Iniciante',
  featured: false
}, {
  id: 'videoaulas',
  name: 'Videoaulas Completas',
  icon: FileText,
  description: 'Cursos em vídeo com metodologia aprovada para concursos',
  fullDescription: 'Acesso a videoaulas completas organizadas por área, com metodologia específica para preparação em concursos públicos e exame da OAB, ministradas pelos melhores professores do Brasil.',
  useCases: ['Preparação estruturada para concursos', 'Estudo inicial de novas matérias', 'Revisão visual de conceitos complexos', 'Acompanhamento de resolução de questões', 'Cursos preparatórios completos'],
  benefits: ['Didática especializada', 'Material de apoio incluído', 'Acesso vitalício aos cursos', 'Atualizações automáticas', 'Certificados de conclusão'],
  howToUse: ['Escolha a área de estudo', 'Assista às aulas em sequência', 'Faça anotações durante as aulas', 'Pratique com exercícios propostos', 'Revise pontos de dúvida'],
  examples: ['Curso completo de Direito Administrativo', 'Aulas de Direito Penal para OAB', 'Módulo de Constitucional para Magistratura', 'Resolução comentada de questões'],
  category: 'study',
  difficulty: 'Intermediário',
  featured: true
}, {
  id: 'downloads',
  name: 'Centro de Downloads',
  icon: Download,
  description: 'Acervo de materiais para download: livros, resumos e apostilas',
  fullDescription: 'Central de downloads com milhares de materiais jurídicos organizados por categoria, incluindo livros completos, resumos, apostilas, mapas mentais e muito mais.',
  useCases: ['Download de materiais para estudo offline', 'Impressão de resumos para revisão', 'Construção de biblioteca pessoal', 'Backup de materiais importantes', 'Compartilhamento com grupos de estudo'],
  benefits: ['Downloads ilimitados', 'Materiais em alta qualidade', 'Organização por categoria', 'Buscador avançado', 'Novos materiais semanalmente'],
  howToUse: ['Navegue pelas categorias', 'Use filtros para refinar busca', 'Visualize antes de baixar', 'Organize em pastas locais', 'Compartilhe com responsabilidade'],
  examples: ['Baixar apostila de Direito Civil', 'Download de livro sobre processo penal', 'Obter mapas mentais de constitucional', 'Baixar coletânea de súmulas'],
  category: 'tools',
  difficulty: 'Iniciante',
  featured: false
}, {
  id: 'noticias',
  name: 'Notícias Jurídicas',
  icon: Newspaper,
  description: 'Fique atualizado com as últimas novidades do mundo jurídico',
  fullDescription: 'Central de notícias jurídicas atualizada em tempo real, cobrindo decisões dos tribunais superiores, mudanças legislativas, análises doutrinárias e tendências do mercado jurídico.',
  useCases: ['Acompanhar mudanças legislativas', 'Ficar informado sobre jurisprudências', 'Monitorar tendências do mercado', 'Preparar-se para provas atualizadas', 'Manter-se relevante profissionalmente'],
  benefits: ['Atualizações em tempo real', 'Fontes confiáveis', 'Análises especializadas', 'Alertas personalizados', 'Compartilhamento social'],
  howToUse: ['Acesse a seção de notícias', 'Configure alertas por área', 'Leia análises especializadas', 'Compartilhe notícias relevantes', 'Salve artigos para leitura posterior'],
  examples: ['Nova súmula do STJ sobre direito do consumidor', 'Alteração no Código de Processo Civil', 'Decisão importante do STF sobre direitos fundamentais', 'Nova lei trabalhista aprovada'],
  category: 'tools',
  difficulty: 'Iniciante',
  featured: false
}, {
  id: 'anotacoes',
  name: 'Sistema de Anotações',
  icon: FileText,
  description: 'Organize seus estudos com anotações inteligentes e categorizadas',
  fullDescription: 'Sistema completo de anotações com categorização automática, busca avançada, sincronização entre dispositivos e recursos de colaboração para potencializar seus estudos.',
  useCases: ['Organizar resumos de estudo', 'Anotar insights durante aulas', 'Criar fichamentos de livros', 'Registrar dúvidas para revisão', 'Compartilhar anotações com grupos'],
  benefits: ['Sincronização automática', 'Busca por conteúdo', 'Categorização inteligente', 'Export/import de dados', 'Backup automático'],
  howToUse: ['Crie categorias de estudo', 'Adicione tags às anotações', 'Use busca para encontrar conteúdo', 'Exporte para backup', 'Importe anotações existentes'],
  examples: ['Resumo sobre teoria geral do crime', 'Anotações da aula de processo civil', 'Fichamento de livro sobre direitos humanos', 'Dúvidas sobre direito tributário'],
  category: 'tools',
  difficulty: 'Iniciante',
  featured: true
}];
const categories = [{
  id: 'all',
  name: 'Todas',
  icon: Target
}, {
  id: 'core',
  name: 'Principais',
  icon: Star
}, {
  id: 'study',
  name: 'Estudo',
  icon: BookOpen
}, {
  id: 'community',
  name: 'Comunidade',
  icon: Users
}, {
  id: 'tools',
  name: 'Ferramentas',
  icon: Lightbulb
}];
export const Explorar = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFunction, setSelectedFunction] = useState<FunctionDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredFunctions = functions.filter(func => {
    const matchesCategory = selectedCategory === 'all' || func.category === selectedCategory;
    const matchesSearch = searchTerm === '' || func.name.toLowerCase().includes(searchTerm.toLowerCase()) || func.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const featuredFunctions = functions.filter(func => func.featured);
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Avançado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  if (selectedFunction) {
    const Icon = selectedFunction.icon;
    return <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <Button variant="outline" onClick={() => setSelectedFunction(null)} className="mb-6">
          ← Voltar para explorar
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{selectedFunction.name}</CardTitle>
                <p className="text-muted-foreground text-lg">{selectedFunction.description}</p>
                <div className="flex gap-2 mt-3">
                  <Badge className={getDifficultyColor(selectedFunction.difficulty)}>
                    {selectedFunction.difficulty}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {selectedFunction.category === 'core' ? 'Principal' : selectedFunction.category === 'study' ? 'Estudo' : selectedFunction.category === 'community' ? 'Comunidade' : 'Ferramenta'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Descrição Completa */}
            <div>
              <h3 className="text-lg font-semibold mb-3">📋 Descrição Completa</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedFunction.fullDescription}</p>
            </div>

            {/* Casos de Uso */}
            <div>
              <h3 className="text-lg font-semibold mb-3">🎯 Quando Usar</h3>
              <ul className="space-y-2">
                {selectedFunction.useCases.map((useCase, index) => <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{useCase}</span>
                  </li>)}
              </ul>
            </div>

            {/* Benefícios */}
            <div>
              <h3 className="text-lg font-semibold mb-3">✨ Benefícios</h3>
              <ul className="space-y-2">
                {selectedFunction.benefits.map((benefit, index) => <li key={index} className="flex items-start gap-2">
                    <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>)}
              </ul>
            </div>

            {/* Como Usar */}
            <div>
              <h3 className="text-lg font-semibold mb-3">🚀 Como Usar</h3>
              <ol className="space-y-2">
                {selectedFunction.howToUse.map((step, index) => <li key={index} className="flex items-start gap-3">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>)}
              </ol>
            </div>

            {/* Exemplos Práticos */}
            <div>
              <h3 className="text-lg font-semibold mb-3">💡 Exemplos Práticos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedFunction.examples.map((example, index) => <div key={index} className="p-3 bg-muted/50 rounded-lg border">
                    <span className="text-sm text-muted-foreground">{example}</span>
                  </div>)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-4">🔍 Explorar Funcionalidades</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Descubra todas as ferramentas disponíveis na plataforma, aprenda como usá-las 
          e maximize seus resultados nos estudos jurídicos
        </p>
      </div>

      {/* Busca */}
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input type="text" placeholder="Buscar funcionalidade..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>

      {/* Categorias */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => {
        const Icon = category.icon;
        return <Button key={category.id} variant={selectedCategory === category.id ? "default" : "outline"} onClick={() => setSelectedCategory(category.id)} className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {category.name}
            </Button>;
      })}
      </div>

      {/* Funções em Destaque */}
      {selectedCategory === 'all' && searchTerm === '' && <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">⭐ Funcionalidades em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFunctions.map(func => {
          const Icon = func.icon;
          return <Card key={func.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/30" onClick={() => setSelectedFunction(func)}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{func.name}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">{func.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      
                      <Button variant="ghost" size="sm">
                        Explorar <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>;
        })}
          </div>
        </div>}

      {/* Todas as Funções */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          {selectedCategory === 'all' ? '🛠️ Todas as Funcionalidades' : `📁 ${categories.find(c => c.id === selectedCategory)?.name}`}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFunctions.map(func => {
          const Icon = func.icon;
          return <Card key={func.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setSelectedFunction(func)}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{func.name}</CardTitle>
                      {func.featured && <Badge variant="secondary" className="text-xs mt-1">
                          ⭐ Destaque
                        </Badge>}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{func.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(func.difficulty)}>
                      {func.difficulty}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Ver detalhes <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>;
        })}
        </div>
      </div>

      {filteredFunctions.length === 0 && <Card className="text-center p-12">
          <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nenhuma funcionalidade encontrada</h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou termos de busca para encontrar o que procura.
          </p>
        </Card>}
    </div>;
};