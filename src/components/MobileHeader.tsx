
import { Scale, Search, Bell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { MobileSidebar } from './MobileSidebar';

export const MobileHeader = () => {
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Scale className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">LegalStudy Pro</h1>
                <p className="text-xs text-muted-foreground">Sua plataforma jurídica</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full hover:bg-primary/10"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full hover:bg-primary/10 relative"
              >
                <Bell className="h-5 w-5" />
                {hasNotifications && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                )}
              </Button>

              {/* Hamburger Menu Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-300"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <div className="relative w-5 h-5">
                  <Menu className={`absolute inset-0 transition-all duration-300 ${
                    isSidebarOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`} />
                  <X className={`absolute inset-0 transition-all duration-300 ${
                    isSidebarOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                  }`} />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  );
};
