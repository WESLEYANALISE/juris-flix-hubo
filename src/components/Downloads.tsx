
import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Filter, Sparkles } from 'lucide-react';
import { useDownloads } from '@/hooks/useDownloads';
import { BookCard } from './BookCard';

export const Downloads = () => {
  const { downloads, loading, error } = useDownloads();
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedProfession, setProfession] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cores únicas para cada área
  const areaColors = {
    'Direito Civil': 'bg-blue-100 text-blue-800 border-blue-200',
    'Direito Penal': 'bg-red-100 text-red-800 border-red-200',
    'Direito Administrativo': 'bg-green-100 text-green-800 border-green-200',
    'Direito Constitucional': 'bg-purple-100 text-purple-800 border-purple-200',
    'Direito Tributário': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Direito do Trabalho': 'bg-orange-100 text-orange-800 border-orange-200',
    'Direito Processual': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Direito Empresarial': 'bg-pink-100 text-pink-800 border-pink-200',
    'Direito Ambiental': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Direito Internacional': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  };

  const getAreaColor = (area: string) => {
    return areaColors[area as keyof typeof areaColors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Move all useMemo hooks to the top, before any conditional returns
  const areas = useMemo(() => {
    return Array.from(new Set(downloads.map(d => d.area))).filter(Boolean);
  }, [downloads]);

  const professions = useMemo(() => {
    const allProfessions = downloads
      .map(d => d.profissao ? d.profissao.split(',').map(p => p.trim()) : [])
      .flat()
      .filter(Boolean);
    return Array.from(new Set(allProfessions));
  }, [downloads]);

  const getFilteredBooks = useMemo(() => {
    let filtered = downloads;

    // Filtro por pesquisa global
    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.livro?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.area?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.profissao?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.sobre?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [downloads, searchQuery]);

  const getProfessionLogo = (profession: string) => {
    const download = downloads.find(d => 
      d['proficao do logo'] && d['proficao do logo'].toLowerCase() === profession.toLowerCase()
    );
    return download?.logo || null;
  };

  const getBooksByArea = (area: string) => {
    return getFilteredBooks.filter(d => d.area === area);
  };

  const getBooksByProfession = (profession: string) => {
    return getFilteredBooks.filter(d => 
      d.profissao && d.profissao.toLowerCase().includes(profession.toLowerCase())
    );
  };

  // Now we can safely have conditional returns after all hooks are declared
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Carregando biblioteca de livros...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <p className="text-lg text-red-600 font-semibold">Erro ao carregar livros</p>
            <p className="text-red-500 mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const EmptyState = ({ title, description }: { title: string, description: string }) => (
    <div className="text-center py-16">
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
        <BookOpen className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header melhorado */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-3">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Biblioteca Jurídica
            </h1>
            <Sparkles className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore nossa coleção curada de livros jurídicos organizados por área do direito e profissão
          </p>
        </div>

        {/* Barra de Pesquisa Global melhorada */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Pesquisar por livro, área do direito ou profissão..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl shadow-sm"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Tabs melhoradas */}
        <Tabs defaultValue="areas" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 h-12 bg-white shadow-sm">
            <TabsTrigger value="areas" className="flex items-center gap-2 text-sm font-medium">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Por Área
            </TabsTrigger>
            <TabsTrigger value="profissoes" className="flex items-center gap-2 text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Por Profissão
            </TabsTrigger>
          </TabsList>

          {/* Tab: Por Área */}
          <TabsContent value="areas" className="mt-8">
            <div className="space-y-6">
              {/* Seletor de Área melhorado */}
              <div className="max-w-md mx-auto">
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-blue-400">
                    <SelectValue placeholder="📚 Escolha uma área do direito" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${getAreaColor(area).split(' ')[0]}`}></div>
                          <span className="font-medium">{area}</span>
                          <Badge variant="outline" className="ml-auto">
                            {getBooksByArea(area).length}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Lista de Livros da Área Selecionada */}
              {selectedArea ? (
                <div>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Badge className={`${getAreaColor(selectedArea)} text-lg px-4 py-2`}>
                      {getBooksByArea(selectedArea).length} livros encontrados
                    </Badge>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedArea}</h2>
                  </div>
                  
                  {getBooksByArea(selectedArea).length === 0 ? (
                    <EmptyState
                      title="Nenhum livro encontrado"
                      description={searchQuery ? 'Tente ajustar sua pesquisa ou escolher outra área.' : 'Nenhum livro disponível nesta área no momento.'}
                    />
                  ) : (
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                      {getBooksByArea(selectedArea).map((item, index) => (
                        <BookCard
                          key={`${selectedArea}-${index}`}
                          item={item}
                          getAreaColor={getAreaColor}
                          getProfessionLogo={getProfessionLogo}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <EmptyState
                  title="Selecione uma área do direito"
                  description="Escolha uma área do direito no menu acima para explorar os livros disponíveis."
                />
              )}
            </div>
          </TabsContent>

          {/* Tab: Por Profissão */}
          <TabsContent value="profissoes" className="mt-8">
            <div className="space-y-6">
              {/* Seletor de Profissão melhorado */}
              <div className="max-w-md mx-auto">
                <Select value={selectedProfession} onValueChange={setProfession}>
                  <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-green-400">
                    <SelectValue placeholder="👨‍⚖️ Escolha uma profissão" />
                  </SelectTrigger>
                  <SelectContent>
                    {professions.map((profession) => {
                      const logo = getProfessionLogo(profession);
                      return (
                        <SelectItem key={profession} value={profession}>
                          <div className="flex items-center gap-3">
                            {logo && (
                              <div className="w-6 h-6 p-1 bg-white rounded-sm shadow-sm border">
                                <img
                                  src={logo}
                                  alt={profession}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            )}
                            <span className="font-medium">{profession}</span>
                            <Badge variant="outline" className="ml-auto">
                              {getBooksByProfession(profession).length}
                            </Badge>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Lista de Livros da Profissão Selecionada */}
              {selectedProfession ? (
                <div>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Badge variant="default" className="text-lg px-4 py-2 bg-green-100 text-green-800">
                      {getBooksByProfession(selectedProfession).length} livros recomendados
                    </Badge>
                    <div className="flex items-center gap-2">
                      {getProfessionLogo(selectedProfession) && (
                        <div className="w-8 h-8 p-1 bg-white rounded-sm shadow-sm border">
                          <img
                            src={getProfessionLogo(selectedProfession)}
                            alt={selectedProfession}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <h2 className="text-2xl font-bold text-gray-800">{selectedProfession}</h2>
                    </div>
                  </div>
                  
                  {getBooksByProfession(selectedProfession).length === 0 ? (
                    <EmptyState
                      title="Nenhum livro encontrado"
                      description={searchQuery ? 'Tente ajustar sua pesquisa ou escolher outra profissão.' : 'Nenhum livro recomendado para esta profissão no momento.'}
                    />
                  ) : (
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                      {getBooksByProfession(selectedProfession).map((item, index) => (
                        <BookCard
                          key={`${selectedProfession}-${index}`}
                          item={item}
                          showAreaBadge
                          getAreaColor={getAreaColor}
                          getProfessionLogo={getProfessionLogo}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <EmptyState
                  title="Selecione uma profissão"
                  description="Escolha uma profissão no menu acima para ver os livros recomendados."
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
