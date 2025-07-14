
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Video {
  id: number;
  area: string;
  nome: string;
  link: string;
}

export const useVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // A tabela VIDEOS não existe no schema atual
        // Por enquanto, vamos retornar dados mockados
        setVideos([
          {
            id: 1,
            area: 'Direito Civil',
            nome: 'Introdução ao Direito Civil',
            link: 'https://www.youtube.com/watch?v=example1'
          },
          {
            id: 2,
            area: 'Direito Penal',
            nome: 'Conceitos Básicos de Direito Penal',
            link: 'https://www.youtube.com/watch?v=example2'
          },
          {
            id: 3,
            area: 'Direito Constitucional',
            nome: 'Princípios Constitucionais',
            link: 'https://www.youtube.com/watch?v=example3'
          }
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar vídeos');
        console.error('Erro ao buscar vídeos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, loading, error };
};
