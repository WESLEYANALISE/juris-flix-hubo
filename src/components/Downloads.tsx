
import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Download, BookOpen, ExternalLink, Search } from 'lucide-react';
import { useDownloads } from '@/hooks/useDownloads';

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
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregando downloads...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-500">Erro: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  const CompactBookItem = ({ item, showAreaBadge = false }: { item: any, showAreaBadge?: boolean }) => (
    <Card className="mb-3 hover:shadow-md transition-shadow border-l-4" style={{ borderLeftColor: showAreaBadge ? undefined : getAreaColor(item.area).includes('blue') ? '#3b82f6' : getAreaColor(item.area).includes('red') ? '#ef4444' : getAreaColor(item.area).includes('green') ? '#10b981' : getAreaColor(item.area).includes('purple') ? '#8b5cf6' : getAreaColor(item.area).includes('yellow') ? '#f59e0b' : getAreaColor(item.area).includes('orange') ? '#f97316' : getAreaColor(item.area).includes('indigo') ? '#6366f1' : getAreaColor(item.area).includes('pink') ? '#ec4899' : getAreaColor(item.area).includes('emerald') ? '#059669' : getAreaColor(item.area).includes('cyan') ? '#06b6d4' : '#6b7280' }}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Imagem do livro */}
          {item.imagem && (
            <div className="w-12 h-16 flex-shrink-0">
              <img
                src={item.imagem}
                alt={item.livro}
                className="w-full h-full object-cover rounded"
              />
            </div>
          )}
          
          {/* Conteúdo */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-sm line-clamp-1 flex-1">{item.livro}</h3>
              {showAreaBadge && (
                <Badge className={`ml-2 text-xs ${getAreaColor(item.area)}`}>
                  {item.area}
                </Badge>
              )}
            </div>
            
            {item.sobre && (
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                {item.sobre}
              </p>
            )}

            {/* Profissões com ênfase nos logos */}
            {item.profissao && (
              <div className="mb-2">
                <div className="flex flex-wrap gap-1 items-center">
                  {item.profissao.split(',').map((profession: string, idx: number) => {
                    const trimmedProfession = profession.trim();
                    const logo = getProfessionLogo(trimmedProfession);
                    return (
                      <div key={idx} className="flex items-center gap-1">
                        {logo && (
                          <div className="w-4 h-4 p-0.5 bg-white rounded-sm shadow-sm border">
                            <img
                              src={logo}
                              alt={trimmedProfession}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        <Badge variant="outline" className="text-xs py-0 px-1">
                          {trimmedProfession}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Botão de download */}
            {item.download && (
              <Button 
                asChild 
                size="sm"
                className="h-7 text-xs"
              >
                <a 
                  href={item.download} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <Download className="h-3 w-3" />
                  Baixar
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Downloads de Livros
          </h1>
          <p className="text-muted-foreground">
            Baixe livros de estudos para concursos públicos organizados por área do direito e profissão
          </p>
        </div>

        {/* Barra de Pesquisa Global */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Pesquisar livros, áreas ou profissões..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="areas" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="areas">Por Área</TabsTrigger>
            <TabsTrigger value="profissoes">Por Profissão</TabsTrigger>
          </TabsList>

          {/* Tab: Por Área */}
          <TabsContent value="areas" className="mt-6">
            <div className="space-y-4">
              {/* Seletor de Área */}
              <div className="w-full max-w-xs">
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma área do direito" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getAreaColor(area).split(' ')[0]}`}></div>
                          {area}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Lista de Livros da Área Selecionada */}
              {selectedArea ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={`${getAreaColor(selectedArea)} text-sm`}>
                      {getBooksByArea(selectedArea).length} livros
                    </Badge>
                    <h2 className="text-xl font-bold">{selectedArea}</h2>
                  </div>
                  
                  {getBooksByArea(selectedArea).length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {searchQuery ? 'Nenhum livro encontrado para sua pesquisa.' : 'Nenhum livro disponível nesta área.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {getBooksByArea(selectedArea).map((item, index) => (
                        <CompactBookItem key={`${selectedArea}-${index}`} item={item} />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    Selecione uma área
                  </h3>
                  <p className="text-muted-foreground">
                    Escolha uma área do direito para ver os livros disponíveis.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Tab: Por Profissão */}
          <TabsContent value="profissoes" className="mt-6">
            <div className="space-y-4">
              {/* Seletor de Profissão */}
              <div className="w-full max-w-xs">
                <Select value={selectedProfession} onValueChange={setProfession}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma profissão" />
                  </SelectTrigger>
                  <SelectContent>
                    {professions.map((profession) => {
                      const logo = getProfessionLogo(profession);
                      return (
                        <SelectItem key={profession} value={profession}>
                          <div className="flex items-center gap-2">
                            {logo && (
                              <div className="w-4 h-4 p-0.5 bg-white rounded-sm shadow-sm border">
                                <img
                                  src={logo}
                                  alt={profession}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            )}
                            {profession}
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
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="default" className="text-sm">
                      {getBooksByProfession(selectedProfession).length} livros
                    </Badge>
                    <div className="flex items-center gap-2">
                      {getProfessionLogo(selectedProfession) && (
                        <div className="w-6 h-6 p-1 bg-white rounded-sm shadow-sm border">
                          <img
                            src={getProfessionLogo(selectedProfession)}
                            alt={selectedProfession}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <h2 className="text-xl font-bold">{selectedProfession}</h2>
                    </div>
                  </div>
                  
                  {getBooksByProfession(selectedProfession).length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {searchQuery ? 'Nenhum livro encontrado para sua pesquisa.' : 'Nenhum livro disponível para esta profissão.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {getBooksByProfession(selectedProfession).map((item, index) => (
                        <CompactBookItem key={`${selectedProfession}-${index}`} item={item} showAreaBadge />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    Selecione uma profissão
                  </h3>
                  <p className="text-muted-foreground">
                    Escolha uma profissão para ver os livros recomendados.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
