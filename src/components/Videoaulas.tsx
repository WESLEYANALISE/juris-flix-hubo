
import { useState, useMemo } from 'react';
import { useVideos } from '@/hooks/useVideos';
import { useYouTube } from '@/hooks/useYouTube';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Play, Clock, Heart, BookOpen, Star, Eye } from 'lucide-react';
import { VideoPlayer } from '@/components/VideoPlayer';

export const Videoaulas = () => {
  const { videos, loading: videosLoading, error: videosError } = useVideos();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedPlaylistUrl, setSelectedPlaylistUrl] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('videoaulas-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [watchedVideos, setWatchedVideos] = useState<string[]>(() => {
    const saved = localStorage.getItem('videoaulas-watched');
    return saved ? JSON.parse(saved) : [];
  });

  const { playlist, loading: playlistLoading } = useYouTube(selectedPlaylistUrl);

  const filteredVideos = useMemo(() => {
    return videos.filter(video =>
      video.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.area.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [videos, searchTerm]);

  const groupedVideos = useMemo(() => {
    const groups: { [key: string]: typeof videos } = {};
    filteredVideos.forEach(video => {
      if (!groups[video.area]) {
        groups[video.area] = [];
      }
      groups[video.area].push(video);
    });
    return groups;
  }, [filteredVideos]);

  const toggleFavorite = (videoId: string) => {
    const newFavorites = favorites.includes(videoId)
      ? favorites.filter(id => id !== videoId)
      : [...favorites, videoId];
    
    setFavorites(newFavorites);
    localStorage.setItem('videoaulas-favorites', JSON.stringify(newFavorites));
  };

  const markAsWatched = (videoId: string) => {
    if (!watchedVideos.includes(videoId)) {
      const newWatched = [...watchedVideos, videoId];
      setWatchedVideos(newWatched);
      localStorage.setItem('videoaulas-watched', JSON.stringify(newWatched));
    }
  };

  const handlePlayVideo = (video: any) => {
    setSelectedVideo(video);
    setSelectedPlaylistUrl(video.link);
    markAsWatched(video.id.toString());
  };

  if (videosLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-muted rounded-t-lg" />
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </CardHeader>
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
          <CardTitle className="text-red-500 mb-4">Erro ao carregar videoaulas</CardTitle>
          <p className="text-muted-foreground">{videosError}</p>
        </Card>
      </div>
    );
  }

  if (selectedVideo && playlist) {
    return (
      <VideoPlayer
        video={selectedVideo}
        playlist={playlist}
        onBack={() => {
          setSelectedVideo(null);
          setSelectedPlaylistUrl('');
        }}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        watchedVideos={watchedVideos}
        onMarkAsWatched={markAsWatched}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-4">Videoaulas Jurídicas</h1>
        <p className="text-muted-foreground mb-6">
          Acesse nossa biblioteca de videoaulas organizadas por área do Direito
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por área ou nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{videos.length}</p>
              <p className="text-sm text-muted-foreground">Playlists</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-2xl font-bold">{favorites.length}</p>
              <p className="text-sm text-muted-foreground">Favoritos</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Eye className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{watchedVideos.length}</p>
              <p className="text-sm text-muted-foreground">Assistidos</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Videos Grid by Area */}
      {Object.entries(groupedVideos).map(([area, areaVideos]) => (
        <div key={area} className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
            <Star className="h-5 w-5 text-accent-legal" />
            {area}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areaVideos.map((video) => (
              <Card key={video.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative aspect-video bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-legal/20 to-primary/20 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white drop-shadow-lg" />
                  </div>
                  
                  {/* Status Badges */}
                  <div className="absolute top-2 left-2 flex gap-2">
                    {favorites.includes(video.id.toString()) && (
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        Favorito
                      </div>
                    )}
                    {watchedVideos.includes(video.id.toString()) && (
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        Assistido
                      </div>
                    )}
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      onClick={() => handlePlayVideo(video)}
                      className="bg-white text-black hover:bg-gray-200"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Assistir Playlist
                    </Button>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-accent-legal transition-colors">
                    {video.nome}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Playlist
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePlayVideo(video)}
                      className="flex-1 mr-2"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Assistir
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(video.id.toString())}
                      className={`${
                        favorites.includes(video.id.toString())
                          ? 'text-red-500 hover:text-red-600'
                          : 'text-muted-foreground hover:text-red-500'
                      }`}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          favorites.includes(video.id.toString()) ? 'fill-current' : ''
                        }`} 
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {filteredVideos.length === 0 && (
        <Card className="text-center p-8">
          <CardTitle className="mb-4">Nenhuma videoaula encontrada</CardTitle>
          <p className="text-muted-foreground">
            Tente buscar por outro termo ou verifique se há videoaulas cadastradas.
          </p>
        </Card>
      )}
    </div>
  );
};
