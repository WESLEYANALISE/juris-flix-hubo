
import { useState, useEffect } from 'react';

const YOUTUBE_API_KEY = 'AIzaSyBW9q3wYmx-cvCv5RLz3ex9SCVB5KcftaE';
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  publishedAt: string;
  channelTitle: string;
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  itemCount: number;
  videos: YouTubeVideo[];
}

export const useYouTube = (playlistUrl?: string) => {
  const [playlist, setPlaylist] = useState<YouTubePlaylist | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractPlaylistId = (url: string): string | null => {
    const regex = /[?&]list=([^&#]*)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const formatDuration = (duration: string): string => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';

    const hours = parseInt(match[1]?.replace('H', '') || '0');
    const minutes = parseInt(match[2]?.replace('M', '') || '0');
    const seconds = parseInt(match[3]?.replace('S', '') || '0');

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!playlistUrl) return;

    const fetchPlaylistData = async () => {
      setLoading(true);
      setError(null);

      try {
        const playlistId = extractPlaylistId(playlistUrl);
        if (!playlistId) {
          throw new Error('ID da playlist não encontrado na URL');
        }

        // Buscar informações da playlist
        const playlistResponse = await fetch(
          `${YOUTUBE_BASE_URL}/playlists?part=snippet,contentDetails&id=${playlistId}&key=${YOUTUBE_API_KEY}`
        );

        if (!playlistResponse.ok) {
          throw new Error('Erro ao buscar dados da playlist');
        }

        const playlistData = await playlistResponse.json();
        const playlistInfo = playlistData.items[0];

        if (!playlistInfo) {
          throw new Error('Playlist não encontrada');
        }

        // Buscar vídeos da playlist
        const videosResponse = await fetch(
          `${YOUTUBE_BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${YOUTUBE_API_KEY}`
        );

        if (!videosResponse.ok) {
          throw new Error('Erro ao buscar vídeos da playlist');
        }

        const videosData = await videosResponse.json();
        
        // Buscar detalhes dos vídeos (incluindo duração)
        const videoIds = videosData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');
        const videoDetailsResponse = await fetch(
          `${YOUTUBE_BASE_URL}/videos?part=contentDetails,snippet&id=${videoIds}&key=${YOUTUBE_API_KEY}`
        );

        const videoDetailsData = await videoDetailsResponse.json();

        const videos: YouTubeVideo[] = videoDetailsData.items.map((video: any) => ({
          id: video.id,
          title: video.snippet.title,
          description: video.snippet.description,
          thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url,
          duration: formatDuration(video.contentDetails.duration),
          publishedAt: video.snippet.publishedAt,
          channelTitle: video.snippet.channelTitle,
        }));

        const playlistResult: YouTubePlaylist = {
          id: playlistId,
          title: playlistInfo.snippet.title,
          description: playlistInfo.snippet.description,
          thumbnail: playlistInfo.snippet.thumbnails.medium?.url || playlistInfo.snippet.thumbnails.default?.url,
          itemCount: playlistInfo.contentDetails.itemCount,
          videos,
        };

        setPlaylist(playlistResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistData();
  }, [playlistUrl]);

  return { playlist, loading, error };
};
