
import { useState, useEffect } from 'react';

interface Favorite {
  id: number;
  funcao: string;
  addedAt: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('legal-app-favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  const saveFavorites = (newFavorites: Favorite[]) => {
    setFavorites(newFavorites);
    localStorage.setItem('legal-app-favorites', JSON.stringify(newFavorites));
  };

  const addFavorite = (funcao: any) => {
    const newFavorite: Favorite = {
      id: funcao.id,
      funcao: funcao.funcao,
      addedAt: new Date().toISOString()
    };
    
    const updated = [...favorites, newFavorite];
    saveFavorites(updated);
  };

  const removeFavorite = (id: number) => {
    const updated = favorites.filter(fav => fav.id !== id);
    saveFavorites(updated);
  };

  const isFavorite = (id: number) => {
    return favorites.some(fav => fav.id === id);
  };

  const toggleFavorite = (funcao: any) => {
    if (isFavorite(funcao.id)) {
      removeFavorite(funcao.id);
    } else {
      addFavorite(funcao);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  };
};
