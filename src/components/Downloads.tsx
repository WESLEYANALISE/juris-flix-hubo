
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, BookOpen, ExternalLink } from 'lucide-react';
import { useDownloads } from '@/hooks/useDownloads';

export const Downloads = () => {
  const { downloads, loading, error } = useDownloads();
  const [selectedArea, setSelectedArea] = useState<string>('all');

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

  const areas = Array.from(new Set(downloads.map(d => d.area))).filter(Boolean);
  const filteredDownloads = selectedArea === 'all' 
    ? downloads 
    : downloads.filter(d => d.area === selectedArea);

  const getProfessions = (profissaoString: string) => {
    return profissaoString ? profissaoString.split(',').map(p => p.trim()) : [];
  };

  const getProfessionLogo = (profession: string) => {
    const download = downloads.find(d => 
      d['proficao do logo'] && d['proficao do logo'].toLowerCase() === profession.toLowerCase()
    );
    return download?.logo || null;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Downloads de Livros
          </h1>
          <p className="text-muted-foreground">
            Baixe livros de estudos para concursos públicos organizados por área do direito
          </p>
        </div>

        {/* Filtros por área */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Filtrar por área:</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedArea === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedArea('all')}
              size="sm"
            >
              Todas as áreas
            </Button>
            {areas.map((area) => (
              <Button
                key={area}
                variant={selectedArea === area ? 'default' : 'outline'}
                onClick={() => setSelectedArea(area)}
                size="sm"
              >
                {area}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid de livros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDownloads.map((item, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="p-0">
                {item.imagem && (
                  <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                    <img
                      src={item.imagem}
                      alt={item.livro}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="secondary" className="mb-2">
                    {item.area}
                  </Badge>
                </div>
                
                <CardTitle className="text-lg mb-2 line-clamp-2">
                  {item.livro}
                </CardTitle>
                
                {item.sobre && (
                  <CardDescription className="text-sm mb-4 line-clamp-3">
                    {item.sobre}
                  </CardDescription>
                )}

                {/* Profissões */}
                {item.profissao && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Ideal para:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {getProfessions(item.profissao).map((profession, idx) => {
                        const logo = getProfessionLogo(profession);
                        return (
                          <div key={idx} className="flex items-center gap-1">
                            {logo && (
                              <img
                                src={logo}
                                alt={profession}
                                className="w-4 h-4 object-contain"
                              />
                            )}
                            <Badge variant="outline" className="text-xs">
                              {profession}
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
                    className="w-full"
                    size="sm"
                  >
                    <a 
                      href={item.download} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Baixar Livro
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDownloads.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              Nenhum livro encontrado
            </h3>
            <p className="text-muted-foreground">
              {selectedArea === 'all' 
                ? 'Não há livros disponíveis no momento.' 
                : `Não há livros disponíveis para a área "${selectedArea}".`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
