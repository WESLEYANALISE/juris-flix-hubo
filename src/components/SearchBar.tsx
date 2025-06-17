
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({ 
  onSearch, 
  placeholder = "Buscar funções...", 
  className = "" 
}: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-background/50 border border-border/50 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
                   text-foreground placeholder:text-muted-foreground
                   transition-all duration-300 hover:bg-background/70"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-background/80"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
};
