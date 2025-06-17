
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AppFunction {
  id: number;
  funcao: string;
  descricao: string;
  link: string;
}

export const useAppFunctions = () => {
  const [functions, setFunctions] = useState<AppFunction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFunctions = async () => {
      try {
        const { data, error } = await supabase
          .from('APP')
          .select('id, funcao, descricao, link')
          .order('id');

        if (error) throw error;
        setFunctions(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar funções');
      } finally {
        setLoading(false);
      }
    };

    fetchFunctions();
  }, []);

  return { functions, loading, error };
};
