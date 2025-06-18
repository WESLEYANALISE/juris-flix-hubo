import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Compass, BookOpen, Video, FileText, Scale, Download, Lightbulb, Target, PlayCircle, ArrowRight, CheckCircle, Star, Brain, Library, Headphones } from 'lucide-react';
interface Funcionalidade {
  id: string;
  nome: string;
  icone: any;
  descricao: string;
  exemplos: string[];
  casosUso: string[];
  tutorial: {
    passos: string[];
    dicas: string[];
  };
  categoria: 'estudo' | 'pesquisa' | 'organizacao' | 'aprendizado';
}
const funcionalidades: Funcionalidade[] = [{
  id: 'vade-mecum',
  nome: 'Vade Mecum Digital',
  icone: Scale,
  descricao: 'Acesso completo a leis, códigos e normativas sempre atualizados com sistema de busca inteligente.',
  exemplos: ['Consulta rápida ao Código Civil, art. 186', 'Busca por "responsabilidade civil" em toda legislação', 'Comparação entre Lei 8.078/90 e Código Civil'],
  casosUso: ['Estudante preparando para OAB precisa consultar artigos específicos', 'Advogado verificando atualização de lei durante audiência', 'Professor criando material didático com base legal atualizada'],
  tutorial: {
    passos: ['Acesse o menu "Vade Mecum" no rodapé', 'Use a barra de busca para encontrar leis específicas', 'Utilize filtros por área do direito', 'Salve artigos importantes nos favoritos', 'Compartilhe trechos relevantes via link'],
    dicas: ['Use palavras-chave específicas para busca mais eficiente', 'Ative notificações para atualizações de leis importantes', 'Crie coleções temáticas para organizar seu estudo']
  },
  categoria: 'pesquisa'
}, {
  id: 'biblioteca',
  nome: 'Biblioteca Jurídica',
  icone: Library,
  descricao: 'Milhares de livros, doutrinas, jurisprudências e artigos organizados por área do direito.',
  exemplos: ['Doutrina de Direito Constitucional por Pedro Lenza', 'Jurisprudência do STF sobre direitos fundamentais', 'Artigos acadêmicos sobre novo Marco Civil da Internet'],
  casosUso: ['Estudante pesquisando para TCC sobre direito digital', 'Advogado buscando precedentes para caso complexo', 'Professor atualizando bibliografia de disciplina'],
  tutorial: {
    passos: ['Entre na seção "Biblioteca" pelo menu principal', 'Navegue pelas categorias ou use a busca avançada', 'Filtre por tipo: livros, artigos, jurisprudência', 'Baixe materiais para leitura offline', 'Organize sua biblioteca pessoal'],
    dicas: ['Combine filtros para busca mais específica', 'Use o histórico de leitura para retomar estudos', 'Marque páginas importantes durante a leitura']
  },
  categoria: 'estudo'
}, {
  id: 'videoaulas',
  nome: 'Videoaulas Jurídicas',
  icone: Video,
  descricao: 'Aulas completas com professores renomados cobrindo todas as disciplinas jurídicas.',
  exemplos: ['Curso completo de Direito Penal com Prof. Rogério Sanches', 'Aulas de Processo Civil para concursos', 'Videoaulas sobre Direito Tributário atualizado'],
  casosUso: ['Concurseiro estudando para magistratura federal', 'Estudante de graduação complementando aulas presenciais', 'Advogado se atualizando em nova área do direito'],
  tutorial: {
    passos: ['Acesse "Videoaulas" no menu principal', 'Escolha a disciplina de interesse', 'Selecione o nível: básico, intermediário ou avançado', 'Assista às aulas em sequência ou por tópicos', 'Faça anotações durante as videoaulas'],
    dicas: ['Ajuste velocidade de reprodução conforme sua necessidade', 'Use legendas quando disponíveis', 'Revise anotações após cada módulo']
  },
  categoria: 'aprendizado'
}, {
  id: 'audio-aulas',
  nome: 'Áudio-aulas',
  icone: Headphones,
  descricao: 'Conteúdo jurídico em formato de áudio para estudo em movimento.',
  exemplos: ['Podcast sobre mudanças na legislação trabalhista', 'Resumo em áudio do Código de Processo Penal', 'Análise jurisprudencial em formato de audiobook'],
  casosUso: ['Profissional estudando durante trajeto casa-trabalho', 'Estudante revisando matéria durante exercícios físicos', 'Advogado se atualizando durante viagens'],
  tutorial: {
    passos: ['Abra a seção "Áudio-aulas" no menu', 'Baixe conteúdos para ouvir offline', 'Use fones de ouvido para melhor experiência', 'Controle velocidade de reprodução', 'Marque trechos importantes para revisão'],
    dicas: ['Crie playlists por matéria ou concurso', 'Ouça durante atividades que não exigem concentração visual', 'Combine com leitura tradicional para melhor fixação']
  },
  categoria: 'aprendizado'
}, {
  id: 'flashcards',
  nome: 'Flashcards Inteligentes',
  icone: Brain,
  descricao: 'Sistema de repetição espaçada com cartões de memória para fixação de conceitos jurídicos.',
  exemplos: ['Definições de institutos do Direito Civil', 'Prazos processuais do CPC', 'Elementos dos crimes do Código Penal'],
  casosUso: ['Estudante memorizando conceitos para prova oral da OAB', 'Concurseiro fixando jurisprudência dos tribunais superiores', 'Professor criando material de revisão para alunos'],
  tutorial: {
    passos: ['Acesse "Flashcards" e escolha um deck temático', 'Estude os cartões seguindo o sistema de repetição', 'Marque dificuldade: fácil, médio ou difícil', 'Crie seus próprios decks personalizados', 'Acompanhe estatísticas de aprendizado'],
    dicas: ['Estude diariamente por 15-30 minutos', 'Seja honesto ao avaliar seu conhecimento', 'Revise cartões difíceis com mais frequência']
  },
  categoria: 'aprendizado'
}, {
  id: 'mapas-mentais',
  nome: 'Mapas Mentais Jurídicos',
  icone: Brain,
  descricao: 'Visualização de conexões entre institutos jurídicos e organização de conhecimento.',
  exemplos: ['Mapa da estrutura do Poder Judiciário brasileiro', 'Conexões entre tipos de responsabilidade civil', 'Fluxograma do processo penal'],
  casosUso: ['Estudante organizando conhecimento para prova dissertativa', 'Professor explicando relações complexas entre institutos', 'Advogado montando estratégia processual'],
  tutorial: {
    passos: ['Entre em "Mapas Mentais" pelo menu', 'Escolha um mapa pronto ou crie o seu', 'Use cores e símbolos para categorizar informações', 'Conecte conceitos relacionados', 'Exporte para impressão ou apresentação'],
    dicas: ['Mantenha mapas simples e objetivos', 'Use palavras-chave em vez de frases longas', 'Revise e atualize mapas regularmente']
  },
  categoria: 'organizacao'
}, {
  id: 'downloads',
  nome: 'Downloads Jurídicos',
  icone: Download,
  descricao: 'Acervo completo de materiais para download: livros, modelos, formulários.',
  exemplos: ['Modelo de petição inicial para ação de cobrança', 'Formulário de constituição de empresa', 'Template de contrato de locação atualizado'],
  casosUso: ['Advogado baixando modelo de petição para adaptar', 'Estudante obtendo formulários para estudo prático', 'Empresário baixando contrato padrão'],
  tutorial: {
    passos: ['Acesse a área de "Downloads"', 'Filtre por categoria: modelos, livros, formulários', 'Visualize prévia antes do download', 'Baixe em formato editável (Word/PDF)', 'Organize downloads em pastas locais'],
    dicas: ['Sempre adapte modelos à sua necessidade específica', 'Verifique atualizações periódicas dos materiais', 'Mantenha backup dos arquivos importantes']
  },
  categoria: 'pesquisa'
}, {
  id: 'anotacoes',
  nome: 'Sistema de Anotações',
  icone: FileText,
  descricao: 'Ferramenta completa para criar, organizar e sincronizar suas anotações jurídicas.',
  exemplos: ['Resumo pessoal de aula sobre Direito Constitucional', 'Anotações de jurisprudência importante', 'Lista de pontos-chave para revisão de véspera'],
  casosUso: ['Estudante organizando material para concurso público', 'Advogado registrando insights durante audiência', 'Professor preparando conteúdo de aula'],
  tutorial: {
    passos: ['Abra o "Sistema de Anotações"', 'Crie categorias para organizar conteúdo', 'Use formatação rica: negrito, listas, destaques', 'Adicione tags para facilitar busca', 'Sincronize entre dispositivos'],
    dicas: ['Use títulos descritivos para facilitar busca', 'Revise e atualize anotações regularmente', 'Combine com outros recursos da plataforma']
  },
  categoria: 'organizacao'
}];
export const Explorar = () => {
  const [funcionalidadeSelecionada, setFuncionalidadeSelecionada] = useState<Funcionalidade | null>(null);
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todas');
  const funcionalidadesFiltradas = categoriaFiltro === 'todas' ? funcionalidades : funcionalidades.filter(f => f.categoria === categoriaFiltro);
  const categorias = [{
    id: 'todas',
    nome: 'Todas',
    icone: Compass
  }, {
    id: 'estudo',
    nome: 'Estudo',
    icone: BookOpen
  }, {
    id: 'pesquisa',
    nome: 'Pesquisa',
    icone: FileText
  }, {
    id: 'organizacao',
    nome: 'Organização',
    icone: Target
  }, {
    id: 'aprendizado',
    nome: 'Aprendizado',
    icone: Brain
  }];
  return <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Compass className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold gradient-text">Explorar Funcionalidades</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Descubra todo o potencial da plataforma jurídica mais completa. 
          Aprenda como usar cada ferramenta com exemplos práticos e tutoriais detalhados.
        </p>
      </div>

      {/* Filtros de Categoria */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categorias.map(categoria => {
        const IconeCategoria = categoria.icone;
        return <Button key={categoria.id} variant={categoriaFiltro === categoria.id ? "default" : "outline"} onClick={() => setCategoriaFiltro(categoria.id)} className="flex items-center gap-2">
              <IconeCategoria className="h-4 w-4" />
              {categoria.nome}
            </Button>;
      })}
      </div>

      {/* Grid de Funcionalidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {funcionalidadesFiltradas.map(funcionalidade => {
        const IconeFuncionalidade = funcionalidade.icone;
        return <Card key={funcionalidade.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => setFuncionalidadeSelecionada(funcionalidade)}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <IconeFuncionalidade className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{funcionalidade.nome}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {categorias.find(c => c.id === funcionalidade.categoria)?.nome}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {funcionalidade.descricao}
                </p>
                <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors">
                  <span className="text-sm font-medium">Explorar detalhes</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>;
      })}
      </div>

      {/* Modal de Detalhes */}
      {funcionalidadeSelecionada && <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 px-[8px]">
          <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header do Modal */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-primary/10">
                    <funcionalidadeSelecionada.icone className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{funcionalidadeSelecionada.nome}</h2>
                    <Badge className="mt-2">
                      {categorias.find(c => c.id === funcionalidadeSelecionada.categoria)?.nome}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setFuncionalidadeSelecionada(null)}>
                  Fechar
                </Button>
              </div>

              {/* Descrição */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Descrição
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {funcionalidadeSelecionada.descricao}
                  </p>
                </CardContent>
              </Card>

              {/* Exemplos Práticos */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <PlayCircle className="h-5 w-5 text-green-500" />
                    Exemplos Práticos
                  </h3>
                  <div className="space-y-3">
                    {funcionalidadeSelecionada.exemplos.map((exemplo, index) => <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{exemplo}</span>
                      </div>)}
                  </div>
                </CardContent>
              </Card>

              {/* Casos de Uso */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Casos de Uso
                  </h3>
                  <div className="space-y-3">
                    {funcionalidadeSelecionada.casosUso.map((caso, index) => <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <Star className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{caso}</span>
                      </div>)}
                  </div>
                </CardContent>
              </Card>

              {/* Tutorial */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-purple-500" />
                    Tutorial Passo a Passo
                  </h3>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-lg">Como usar:</h4>
                    <div className="space-y-3">
                      {funcionalidadeSelecionada.tutorial.passos.map((passo, index) => <div key={index} className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="pt-1">{passo}</span>
                        </div>)}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-lg">Dicas importantes:</h4>
                    <div className="space-y-2">
                      {funcionalidadeSelecionada.tutorial.dicas.map((dica, index) => <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                          <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{dica}</span>
                        </div>)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>}

      {/* Call to Action */}
      <Card className="mt-12 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Explore todas as funcionalidades e transforme sua forma de estudar e trabalhar com o Direito. 
            Cada ferramenta foi desenvolvida pensando na sua produtividade e sucesso profissional.
          </p>
          <Button size="lg" className="text-lg px-8">
            <Compass className="h-5 w-5 mr-2" />
            Começar Agora
          </Button>
        </CardContent>
      </Card>
    </div>;
};