import { Search, Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
export const DesktopHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return <header className="fixed top-0 right-0 left-72 z-30 bg-background/95 backdrop-blur-xl border-b border-border/20">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar ferramentas, leis, artigos..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 bg-secondary/50 border-border/50 focus:bg-background" />
          </div>
          
          {/* User Actions */}
          <div className="flex items-center gap-3">
            
            
            
            
            
          </div>
        </div>
      </div>
    </header>;
};