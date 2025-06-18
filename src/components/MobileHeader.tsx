import { Scale, Search, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { MobileSidebar } from './MobileSidebar';
interface MobileHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
export const MobileHeader = ({
  sidebarOpen,
  setSidebarOpen
}: MobileHeaderProps) => {
  const [hasNotifications] = useState(true);
  return <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/20 safe-area-pt">
        <div className="px-4 py-3 bg-zinc-950">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <Scale className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text">LegalStudy Pro</h1>
                <p className="text-xs text-muted-foreground">Sua plataforma jurídica</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-primary/10">
                <Search className="h-5 w-5 text-amber-400" />
              </Button>
              
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-primary/10 relative">
                <Bell className="h-5 w-5 text-amber-400" />
                {hasNotifications && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />}
              </Button>

              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-300" onClick={() => setSidebarOpen(true)}>
                <Menu className={`h-5 w-5 text-amber-400 transition-transform duration-300 ${sidebarOpen ? 'rotate-90' : 'rotate-0'}`} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>;
};