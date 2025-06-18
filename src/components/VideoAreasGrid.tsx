
import { useState, useMemo } from 'react';
import { useVideos } from '@/hooks/useVideos';
import { useYouTube } from '@/hooks/useYouTube';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Play, ArrowLeft, Clock, PlayCircle, Video, Users } from 'lucide-react';
import { VideoPlayerEnhanced } from '@/components/VideoPlayerEnhanced';

export const VideoAreasGrid = () => {
  const { videos, loading: videosLoading, error: videosError } = useVideos();
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedPlaylistUrl, setSelectedPlaylistUrl] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [areaThumbnails, setAreaThumbnails] = useState<{ [key: string]: string }>({});
  
  const { playlist, loading: playlistLoading } = useYouTube(selectedPlaylistUrl);

  // Agrupar vídeos por área e extrair thumbnails
  const videoAreas = useMemo(() => {
    const areas: {
      [key: string]: {
        videos: typeof videos;
        firstVideo: any;
        thumbnail?: string;
      };
    } = {};
    
    videos.forEach(video => {
      if (!areas[video.area]) {
        areas[video.area] = {
          videos: [],
          firstVideo: video
        };
      }
      areas[video.area].videos.push(video);
    });

    // Extrair thumbnails dos primeiros vídeos de cada área
    Object.keys(areas).forEach(async (area) => {
      const firstVideo = areas[area].firstVideo;
      if (firstVideo?.link) {
        try {
          // Simular extração de thumbnail do YouTube
          const playlistId = firstVideo.link.match(/[?&]list=([^&#]*)/)?.[1];
          if (playlistId) {
            const thumbnailUrl = `https://img.youtube.com/vi/${playlistId}/maxresdefault.jpg`;
            setAreaThumbnails(prev => ({ ...prev, [area]: thumbnailUrl }));
          }
        } catch (error) {
          console.log('Erro ao extrair thumbnail:', error);
        }
      }
    });

    return areas;
  }, [videos]);

  // Filtrar áreas por busca
  const filteredAreas = useMemo(() => {
    if (!searchTerm) return videoAreas;
    const filtered: typeof videoAreas = {};
    Object.entries(videoAreas).forEach(([area, data]) => {
      if (area.toLowerCase().includes(searchTerm.toLowerCase())) {
        filtered[area] = data;
      }
    });
    return filtered;
  }, [videoAreas, searchTerm]);

  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
  };

  const handleVideoSelect = (video: any) => {
    setSelectedVideo(video);
    setSelectedPlaylistUrl(video.link);
  };

  const handleBack = () => {
    if (selectedVideo) {
      setSelectedVideo(null);
      setSelectedPlaylistUrl('');
    } else if (selectedArea) {
      setSelectedArea('');
    }
  };

  if (videosLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-muted rounded-t-lg" />
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (videosError) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <Card className="text-center p-8">
          <h2 className="text-red-500 mb-4 font-semibold">Erro ao carregar videoaulas</h2>
          <p className="text-muted-foreground">{videosError}</p>
        </Card>
      </div>
    );
  }

  if (selectedVideo && playlist) {
    return <VideoPlayerEnhanced video={selectedVideo} playlist={playlist} onBack={handleBack} />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header otimizado */}
      <div className="flex items-center gap-4 mb-6">
        {selectedArea && (
          <Button variant="outline" onClick={handleBack} size="sm" className="bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20 hover:border-red-500/50 font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {selectedArea ? `${selectedArea} - Videoaulas` : 'Áreas de Videoaulas'}
          </h1>
          <p className="text-muted-foreground">
            {selectedArea 
              ? `${videoAreas[selectedArea]?.videos.length || 0} playlists disponíveis` 
              : 'Escolha uma área para começar seus estudos'
            }
          </p>
        </div>
      </div>

      {/* Barra de busca otimizada */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={selectedArea ? "Buscar playlist..." : "Buscar área de estudo..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-red-200 dark:border-red-800 focus:border-red-500 focus:ring-red-500"
        />
      </div>

      {!selectedArea ? (
        // Grid de áreas com thumbnails dos vídeos
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(filteredAreas).map(([area, data]) => (
            <Card
              key={area}
              className="group hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border-2 hover:border-red-500/30 bg-gradient-to-br from-background to-background/80 backdrop-blur-sm"
              onClick={() => handleAreaSelect(area)}
            >
              <div className="relative aspect-video overflow-hidden">
                {/* Thumbnail da área */}
                {areaThumbnails[area] ? (
                  <img
                    src={areaThumbnails[area]}
                    alt={area}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={() => {
                      // Fallback para imagem padrão
                      setAreaThumbnails(prev => ({ ...prev, [area]: '' }));
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-red-600/20 via-pink-600/10 to-red-600/20" />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <div className="bg-red-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                    {data.videos.length} PLAYLIST{data.videos.length !== 1 ? 'S' : ''}
                  </div>
                </div>
                
                {/* Ícone central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white transform group-hover:scale-110 transition-transform duration-300">
                    <div className="relative mb-2">
                      <div className="w-16 h-16 bg-red-600/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Video className="h-8 w-8 text-white" />
                      </div>
                      <PlayCircle className="h-6 w-6 absolute -bottom-1 -right-1 text-white animate-pulse" />
                    </div>
                  </div>
                </div>
                
                {/* Efeito hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-pink-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:via-pink-500/5 group-hover:to-red-500/10 transition-all duration-500" />
              </div>
              
              <CardContent className="p-4 bg-gradient-to-b from-background to-background/95">
                <h3 className="font-bold text-lg mb-2 group-hover:text-red-500 transition-colors text-center line-clamp-1">
                  📹 {area}
                </h3>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Videoaulas completas</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Grid de vídeos da área selecionada
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoAreas[selectedArea]?.videos
            .filter(video => !searchTerm || video.nome.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((video, index) => (
              <Card
                key={video.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 hover:border-red-500/30"
                onClick={() => handleVideoSelect(video)}
              >
                <div className="relative aspect-video bg-gradient-to-br from-red-500/20 to-pink-500/20">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Badge de playlist */}
                  <div className="absolute top-3 left-3 bg-black/80 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 backdrop-blur-sm">
                    <Clock className="h-3 w-3" />
                    Playlist
                  </div>

                  {/* Número da playlist */}
                  <div className="absolute top-3 right-3 bg-red-600/80 text-white px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                    #{index + 1}
                  </div>

                  {/* Overlay de hover */}
                  <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-300" />
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                    {video.nome}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Clique para assistir a playlist completa
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      {/* Mensagem quando não há resultados */}
      {((selectedArea && videoAreas[selectedArea]?.videos.filter(video => 
          !searchTerm || video.nome.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0) || 
        (!selectedArea && Object.keys(filteredAreas).length === 0)) && (
        <Card className="text-center p-8 border-red-200 dark:border-red-800">
          <Video className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-4">Nenhum resultado encontrado</h3>
          <p className="text-muted-foreground">
            Tente buscar por outro termo ou verifique se há conteúdo cadastrado.
          </p>
        </Card>
      )}
    </div>
  );
};
