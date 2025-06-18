
import { useState, useMemo } from 'react';
import { useVideos } from '@/hooks/useVideos';
import { useYouTube } from '@/hooks/useYouTube';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Play, ArrowLeft, Clock, PlayCircle, Video, FileText, Expand } from 'lucide-react';
import { VideoPlayerEnhanced } from '@/components/VideoPlayerEnhanced';

export const VideoAreasGrid = () => {
  const { videos, loading: videosLoading, error: videosError } = useVideos();
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedPlaylistUrl, setSelectedPlaylistUrl] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { playlist, loading: playlistLoading } = useYouTube(selectedPlaylistUrl);

  // Agrupar vídeos por área com primeira thumbnail
  const videoAreas = useMemo(() => {
    const areas: { [key: string]: { videos: typeof videos; firstVideo: any } } = {};
    
    videos.forEach(video => {
      if (!areas[video.area]) {
        areas[video.area] = { videos: [], firstVideo: video };
      }
      areas[video.area].videos.push(video);
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
      setShowNotes(false);
      setIsFullscreen(false);
    } else if (selectedArea) {
      setSelectedArea('');
    }
  };

  // Extrair thumbnail do YouTube
  const getYouTubeThumbnail = (url: string) => {
    const regex = /[?&]list=([^&#]*)/;
    const match = url.match(regex);
    if (match) {
      const playlistId = match[1];
      return `https://img.youtube.com/vi/playlist/${playlistId}/0.jpg`;
    }
    
    // Fallback para vídeo individual
    const videoRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const videoMatch = url.match(videoRegex);
    if (videoMatch) {
      return `https://img.youtube.com/vi/${videoMatch[1]}/maxresdefault.jpg`;
    }
    
    return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop&crop=center";
  };

  if (videosLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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
    return (
      <div className="w-full">
        <VideoPlayerEnhanced
          video={selectedVideo}
          playlist={playlist}
          onBack={handleBack}
          showNotes={showNotes}
          onNotesToggle={() => setShowNotes(!showNotes)}
          isFullscreen={isFullscreen}
          onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header com navegação */}
      <div className="flex items-center gap-4 mb-6">
        {(selectedArea) && (
          <Button 
            variant="outline" 
            onClick={handleBack} 
            size="sm"
            className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold gradient-text mb-2">
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

      {/* Barra de busca */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={selectedArea ? "Buscar playlist..." : "Buscar área de estudo..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {!selectedArea ? (
        // Grid de áreas com capas reais das primeiras thumbnails
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(filteredAreas).map(([area, data]) => (
            <Card 
              key={area} 
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 hover:border-accent-legal/30"
              onClick={() => handleAreaSelect(area)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={getYouTubeThumbnail(data.firstVideo.link)}
                  alt={area}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop&crop=center";
                  }}
                />
                
                {/* Overlay com informações */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300" />
                
                {/* Badge de área */}
                <div className="absolute top-3 left-3 bg-red-600/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {data.videos.length} playlist{data.videos.length !== 1 ? 's' : ''}
                </div>
                
                {/* Ícone de play centralizado */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-accent-legal transition-colors text-center">
                  📹 {area}
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Videoaulas completas desta área
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Grid de vídeos da área selecionada com capas reais
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoAreas[selectedArea]?.videos
            .filter(video => 
              !searchTerm || video.nome.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((video) => (
            <Card 
              key={video.id} 
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleVideoSelect(video)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={getYouTubeThumbnail(video.link)}
                  alt={video.nome}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop&crop=center";
                  }}
                />
                
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-16 w-16 text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
                </div>
                
                {/* Badge de playlist */}
                <div className="absolute top-3 left-3 bg-black/80 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Playlist
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-accent-legal transition-colors">
                  {video.nome}
                </h3>
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
        <Card className="text-center p-8">
          <h3 className="font-semibold mb-4">Nenhum resultado encontrado</h3>
          <p className="text-muted-foreground">
            Tente buscar por outro termo ou verifique se há conteúdo cadastrado.
          </p>
        </Card>
      )}
    </div>
  );
};
