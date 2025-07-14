
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NoticiaJuridica {
  portal: string;
  link: string;
  logo: string;
}

export const useNoticiasJuridicas = () => {
  const [noticias, setNoticias] = useState<NoticiaJuridica[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        // A tabela NOTICIAS JURIDICAS não existe no schema atual
        // Por enquanto, vamos retornar dados mockados
        setNoticias([
          {
            portal: 'Consultor Jurídico',
            link: 'https://www.conjur.com.br',
            logo: '/conjur-logo.png'
          },
          {
            portal: 'Migalhas',
            link: 'https://www.migalhas.com.br',
            logo: '/migalhas-logo.png'
          },
          {
            portal: 'Jus Brasil',
            link: 'https://www.jusbrasil.com.br',
            logo: '/jusbrasil-logo.png'
          }
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar notícias');
        console.error('Erro ao buscar notícias jurídicas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  return { noticias, loading, error };
};
