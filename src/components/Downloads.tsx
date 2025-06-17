
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, BookOpen, ExternalLink } from 'lucide-react';
import { useDownloads } from '@/hooks/useDownloads';

export const Downloads = () => {
  const { downloads, loading, error } = useDownloads();

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

  // Extrair áreas únicas
  const areas = Array.from(new Set(downloads.map(d => d.area))).filter(Boolean);

  // Extrair profissões únicas
  const allProfessions = downloads
    .map(d => d.profissao ? d.profissao.split(',').map(p => p.trim()) : [])
    .flat()
    .filter(Boolean);
  const professions = Array.from(new Set(allProfessions));

  const getProfessionLogo = (profession: string) => {
    const download = downloads.find(d => 
      d['proficao do logo'] && d['proficao do logo'].toLowerCase() === profession.toLowerCase()
    );
    return download?.logo || null;
  };

  const getDownloadsByArea = (area: string) => {
    return downloads.filter(d => d.area === area);
  };

  const getDownloadsByProfession = (profession: string) => {
    return downloads.filter(d => 
      d.profissao && d.profissao.toLowerCase().includes(profession.toLowerCase())
    );
  };

  const BookListItem = ({ item }: { item: any }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Imagem do livro */}
          {item.imagem && (
            <div className="w-20 h-28 flex-shrink-0">
              <img
                src={item.imagem}
                alt={item.livro}
                className="w-full h-full object-cover rounded"
              />
            </div>
          )}
          
          {/* Conteúdo */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg line-clamp-2">{item.livro}</h3>
              <Badge variant="secondary" className="ml-2">
                {item.area}
              </Badge>
            </div>
            
            {item.sobre && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {item.sobre}
              </p>
            )}

            {/* Profissões */}
            {item.profissao && (
              <div className="mb-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Ideal para:
                </p>
                <div className="flex flex-wrap gap-1">
                  {item.profissao.split(',').map((profession: string, idx: number) => {
                    const trimmedProfession = profession.trim();
                    const logo = getProfessionLogo(trimmedProfession);
                    return (
                      <div key={idx} className="flex items-center gap-1">
                        {logo && (
                          <img
                            src={logo}
                            alt={trimmedProfession}
                            className="w-3 h-3 object-contain"
                          />
                        )}
                        <Badge variant="outline" className="text-xs">
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
                className="w-full sm:w-auto"
              >
                <a 
                  href={item.download} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Download className="h-3 w-3" />
                  Baixar Livro
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Downloads de Livros
          </h1>
          <p className="text-muted-foreground">
            Baixe livros de estudos para concursos públicos organizados por área do direito e profissão
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="areas" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="areas">Por Área</TabsTrigger>
            <TabsTrigger value="profissoes">Por Profissão</TabsTrigger>
          </TabsList>

          {/* Tab: Por Área */}
          <TabsContent value="areas" className="mt-6">
            {areas.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  Nenhuma área encontrada
                </h3>
                <p className="text-muted-foreground">
                  Não há áreas disponíveis no momento.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {areas.map((area) => {
                  const areaBooks = getDownloadsByArea(area);
                  return (
                    <div key={area}>
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Badge variant="default" className="text-sm">
                          {areaBooks.length}
                        </Badge>
                        {area}
                      </h2>
                      <div className="space-y-3">
                        {areaBooks.map((item, index) => (
                          <BookListItem key={`${area}-${index}`} item={item} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Tab: Por Profissão */}
          <TabsContent value="profissoes" className="mt-6">
            {professions.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  Nenhuma profissão encontrada
                </h3>
                <p className="text-muted-foreground">
                  Não há profissões disponíveis no momento.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {professions.map((profession) => {
                  const professionBooks = getDownloadsByProfession(profession);
                  const logo = getProfessionLogo(profession);
                  return (
                    <div key={profession}>
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Badge variant="default" className="text-sm">
                          {professionBooks.length}
                        </Badge>
                        {logo && (
                          <img
                            src={logo}
                            alt={profession}
                            className="w-5 h-5 object-contain"
                          />
                        )}
                        {profession}
                      </h2>
                      <div className="space-y-3">
                        {professionBooks.map((item, index) => (
                          <BookListItem key={`${profession}-${index}`} item={item} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
