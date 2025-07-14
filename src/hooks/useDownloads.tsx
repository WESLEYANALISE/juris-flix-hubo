
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Download {
  area: string;
  livro: string;
  imagem: string;
  sobre: string;
  download: string;
  profissao: string;
  logo: string;
  'proficao do logo': string;
}

export const useDownloads = () => {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        // A tabela DOWNLOADS não existe no schema atual
        // Por enquanto, vamos usar dados da biblioteca_juridica como alternativa
        const { data, error } = await supabase
          .from('biblioteca_juridica')
          .select('area, livro, imagem, sobre, download')
          .order('area');

        if (error) throw error;
        
        // Transformar dados para o formato esperado
        const transformedData = (data || []).map(item => ({
          area: item.area || '',
          livro: item.livro || '',
          imagem: item.imagem || '',
          sobre: item.sobre || '',
          download: item.download || '',
          profissao: '',
          logo: '',
          'proficao do logo': ''
        }));
        
        setDownloads(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar downloads');
        console.error('Erro ao buscar downloads:', err);
        
        // Fallback para dados mockados
        setDownloads([
          {
            area: 'Direito Civil',
            livro: 'Código Civil Comentado',
            imagem: '/placeholder.jpg',
            sobre: 'Código Civil com comentários',
            download: '#',
            profissao: 'Advogado',
            logo: '/logo.png',
            'proficao do logo': 'Advogado'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  return { downloads, loading, error };
};
