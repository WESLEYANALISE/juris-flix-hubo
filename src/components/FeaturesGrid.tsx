
import { useState, useMemo } from 'react';
import { Heart, ExternalLink, Star, Filter, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';
import { useFavorites } from '@/hooks/useFavorites';
import { SearchBar } from '@/components/SearchBar';
import { FilterTabs } from '@/components/FilterTabs';
import { FunctionCardSkeletonGrid } from '@/components/FunctionCardSkeleton';
import { ErrorState } from '@/components/ErrorState';

type ViewMode = 'grid' | 'list';
type SortOption = 'name' | 'recent' | 'favorites';

const getIconForFunction = (funcao: string) => {
  const name = funcao.toLowerCase();
  if (name.includes('vade') || name.includes('mecum')) return '⚖️';
  if (name.includes('assistente') && name.includes('ia')) return '🤖';
  if (name.includes('biblioteca')) return '📚';
  if (name.includes('audio') || name.includes('áudio')) return '🎧';
  if (name.includes('mapa') && name.includes('mental')) return '🧠';
  if (name.includes('desktop')) return '💻';
  if (name.includes('video') || name.includes('vídeo')) return '📹';
  if (name.includes('simulado')) return '🎯';
  if (name.includes('noticia') || name.includes('notícia')) return '📰';
  return '📄';
};

const getCategoryFromFunction = (funcao: string): string => {
  const name = funcao.toLowerCase();
  if (name.includes('vade') || name.includes('código') || name.includes('lei')) return 'Legislação';
  if (name.includes('ia') || name.includes('assistente') || name.includes('bot')) return 'IA & Tecnologia';
  if (name.includes('biblioteca') || name.includes('livro') || name.includes('obra')) return 'Biblioteca';
  if (name.includes('audio') || name.includes('áudio') || name.includes('podcast')) return 'Áudio & Mídia';
  if (name.includes('video') || name.includes('vídeo') || name.includes('aula')) return 'Vídeos';
  if (name.includes('simulado') || name.includes('prova') || name.includes('teste')) return 'Simulados';
  if (name.includes('mapa') || name.includes('mental') || name.includes('esquema')) return 'Mapas Mentais';
  if (name.includes('petição') || name.includes('modelo') || name.includes('documento')) return 'Documentos';
  if (name.includes('noticia') || name.includes('notícia') || name.includes('informação')) return 'Notícias';
  return 'Outros';
};

export const FeaturesGrid = () => {
  const { functions, loading, error, refetch } = useAppFunctions();
  const { setCurrentFunction } = useNavigation();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('name');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['Todos', ...new Set(functions.map(func => getCategoryFromFunction(func.funcao)))];
    return cats.sort();
  }, [functions]);

  // Filter and sort functions
  const filteredFunctions = useMemo(() => {
    let filtered = functions.filter(func => {
      const matchesSearch = func.funcao.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || 
                            getCategoryFromFunction(func.funcao) === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort functions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.funcao.localeCompare(b.funcao);
        case 'favorites':
          const aIsFav = isFavorite(a.id);
          const bIsFav = isFavorite(b.id);
          if (aIsFav && !bIsFav) return -1;
          if (!aIsFav && bIsFav) return 1;
          return a.funcao.localeCompare(b.funcao);
        case 'recent':
        default:
          return 0;
      }
    });

    return filtered;
  }, [functions, searchQuery, selectedCategory, sortBy, isFavorite]);

  const handleFunctionClick = (funcao: string) => {
    setCurrentFunction(funcao);
    toast({
      title: "Navegando...",
      description: `Abrindo ${funcao}`,
    });
  };

  const handleFavoriteToggle = (func: any, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(func);
    
    const action = isFavorite(func.id) ? 'removido dos' : 'adicionado aos';
    toast({
      title: "Favoritos atualizados",
      description: `${func.funcao} foi ${action} favoritos`,
    });
  };

  if (loading) {
    return (
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 w-64 bg-muted rounded-lg animate-pulse mb-4" />
            <div className="h-4 w-96 bg-muted rounded-lg animate-pulse" />
          </div>
          <FunctionCardSkeletonGrid count={9} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ErrorState
            title="Erro ao Carregar Funções"
            description="Não foi possível carregar as funcionalidades do app. Verifique sua conexão e tente novamente."
            onRetry={() => refetch()}
            showGoHome={false}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 md:px-8 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-legal">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text-legal">
            Todas as Funcionalidades
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore nossa coleção completa de ferramentas jurídicas especializadas
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4 animate-slide-in-legal">
          <SearchBar 
            onSearch={setSearchQuery}
            placeholder="Buscar por nome, categoria ou palavra-chave..."
            className="max-w-2xl mx-auto"
          />
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <FilterTabs
              categories={categories}
              activeCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              className="flex-1"
            />
            
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 bg-background border border-border rounded-lg text-sm
                         focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="name">Ordenar: A-Z</option>
                <option value="favorites">Favoritos primeiro</option>
              </select>
              
              <div className="flex rounded-lg border border-border overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        {searchQuery && (
          <div className="mb-6 text-center">
            <p className="text-sm text-muted-foreground">
              {filteredFunctions.length} resultado{filteredFunctions.length !== 1 ? 's' : ''} 
              {searchQuery && ` para "${searchQuery}"`}
              {selectedCategory !== 'Todos' && ` em ${selectedCategory}`}
            </p>
          </div>
        )}

        {/* Functions Grid/List */}
        {filteredFunctions.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Nenhuma função encontrada</h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou termos de busca
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Todos');
            }}>
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <div className={`
            ${viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6' 
              : 'space-y-3'
            }
          `}>
            {filteredFunctions.map((func, index) => (
              <div
                key={func.id}
                className={`
                  group cursor-pointer card-legal animate-bounce-in-legal
                  ${viewMode === 'grid' 
                    ? 'p-6 bg-card rounded-xl border border-border/50' 
                    : 'flex items-center gap-4 p-4 bg-card rounded-lg border border-border/50'
                  }
                `}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleFunctionClick(func.funcao)}
              >
                <div className={`
                  ${viewMode === 'grid' 
                    ? 'flex items-center gap-4 mb-4' 
                    : 'flex items-center gap-3 flex-1'
                  }
                `}>
                  <div className="text-3xl">
                    {getIconForFunction(func.funcao)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`
                      font-semibold text-foreground group-hover:text-primary transition-colors
                      ${viewMode === 'grid' ? 'text-lg mb-1' : 'text-base'}
                    `}>
                      {func.funcao}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {getCategoryFromFunction(func.funcao)}
                      </span>
                      {isFavorite(func.id) && (
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      )}
                    </div>
                  </div>
                </div>

                {viewMode === 'grid' && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    Acesse funcionalidades avançadas para {func.funcao.toLowerCase()}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleFavoriteToggle(func, e)}
                    className="hover:bg-background/50"
                  >
                    <Heart className={`h-4 w-4 ${
                      isFavorite(func.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-muted-foreground'
                    }`} />
                  </Button>
                  
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {filteredFunctions.length > 0 && (
          <div className="mt-12 text-center">
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <span>{functions.length} funções totais</span>
              <span>{favorites.length} favoritos</span>
              <span>{categories.length - 1} categorias</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
