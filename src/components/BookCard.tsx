
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Download, ExternalLink, BookOpen, Eye } from 'lucide-react';

interface BookCardProps {
  item: any;
  showAreaBadge?: boolean;
  getAreaColor: (area: string) => string;
  getProfessionLogo: (profession: string) => string | null;
}

export const BookCard = ({ item, showAreaBadge = false, getAreaColor, getProfessionLogo }: BookCardProps) => {
  const [imageError, setImageError] = useState(false);

  const getBorderColor = (area: string) => {
    const colorClass = getAreaColor(area);
    if (colorClass.includes('blue')) return '#3b82f6';
    if (colorClass.includes('red')) return '#ef4444';
    if (colorClass.includes('green')) return '#10b981';
    if (colorClass.includes('purple')) return '#8b5cf6';
    if (colorClass.includes('yellow')) return '#f59e0b';
    if (colorClass.includes('orange')) return '#f97316';
    if (colorClass.includes('indigo')) return '#6366f1';
    if (colorClass.includes('pink')) return '#ec4899';
    if (colorClass.includes('emerald')) return '#059669';
    if (colorClass.includes('cyan')) return '#06b6d4';
    return '#6b7280';
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 hover:scale-[1.02] bg-gradient-to-r from-white to-gray-50/50" 
          style={{ borderLeftColor: getBorderColor(item.area) }}>
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Imagem do livro melhorada */}
          <div className="w-20 h-28 flex-shrink-0 relative">
            {item.imagem && !imageError ? (
              <img
                src={item.imagem}
                alt={item.livro}
                className="w-full h-full object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shadow-md">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
            )}
            {showAreaBadge && (
              <Badge className={`absolute -top-2 -right-2 text-xs ${getAreaColor(item.area)} shadow-md`}>
                {item.area}
              </Badge>
            )}
          </div>
          
          {/* Conteúdo principal */}
          <div className="flex-1 min-w-0">
            <div className="mb-3">
              <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                {item.livro}
              </h3>
              
              {!showAreaBadge && (
                <Badge className={`${getAreaColor(item.area)} text-xs`}>
                  {item.area}
                </Badge>
              )}
            </div>

            {/* Profissões com logos em destaque */}
            {item.profissao && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 items-center">
                  {item.profissao.split(',').map((profession: string, idx: number) => {
                    const trimmedProfession = profession.trim();
                    const logo = getProfessionLogo(trimmedProfession);
                    return (
                      <div key={idx} className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-sm border">
                        {logo && (
                          <div className="w-6 h-6 p-1 bg-white rounded-full shadow-sm border">
                            <img
                              src={logo}
                              alt={trimmedProfession}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        <Badge variant="outline" className="text-xs border-none bg-transparent p-0">
                          {trimmedProfession}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Botões de ação */}
            <div className="flex gap-2 flex-wrap">
              {/* Botão para ver sinopse */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Ver Detalhes
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-left">{item.livro}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      {item.imagem && !imageError && (
                        <div className="w-32 h-44 flex-shrink-0">
                          <img
                            src={item.imagem}
                            alt={item.livro}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <Badge className={`${getAreaColor(item.area)}`}>
                            {item.area}
                          </Badge>
                        </div>
                        
                        {item.profissao && (
                          <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Profissões Recomendadas:</h4>
                            <div className="flex flex-wrap gap-2">
                              {item.profissao.split(',').map((profession: string, idx: number) => {
                                const trimmedProfession = profession.trim();
                                const logo = getProfessionLogo(trimmedProfession);
                                return (
                                  <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
                                    {logo && (
                                      <div className="w-5 h-5 p-0.5 bg-white rounded-full shadow-sm">
                                        <img
                                          src={logo}
                                          alt={trimmedProfession}
                                          className="w-full h-full object-contain"
                                        />
                                      </div>
                                    )}
                                    <span className="text-sm">{trimmedProfession}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {item.sobre && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Sobre o livro:</h4>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                          {item.sobre}
                        </p>
                      </div>
                    )}
                    
                    {item.download && (
                      <div className="pt-4 border-t">
                        <Button asChild className="w-full">
                          <a 
                            href={item.download} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Baixar Livro
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              {/* Botão de download direto */}
              {item.download && (
                <Button asChild size="sm">
                  <a 
                    href={item.download} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
