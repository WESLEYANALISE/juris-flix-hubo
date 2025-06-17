
import { Scale, Search, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { MobileSidebar } from '@/components/MobileSidebar';

export const MobileHeader = () => {
  const [hasNotifications, setHasNotifications] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 glass-effect-legal border-b border-border/20 safe-area-pt">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Hamburger Menu and Logo */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(true)}
                className="h-10 w-10 rounded-full hover:bg-primary/10 hover:animate-legal-float lg:hidden"
              >
                <Menu className="h-5 w-5 text-primary animate-legal-icon-float" />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-legal rounded-xl flex items-center justify-center shadow-lg card-depth-2 animate-legal-shimmer hover:animate-legal-glow">
                  <Scale className="h-6 w-6 text-white animate-legal-icon-float" />
                </div>
                <div>
                  <h1 className="text-lg font-bold gradient-text-legal animate-legal-text-glow">LegalStudy Pro</h1>
                  <p className="text-xs text-muted-foreground animate-fade-in-legal">Sua plataforma jurídica</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full hover:bg-primary/10 hover:animate-legal-float"
              >
                <Search className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-300" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full hover:bg-primary/10 relative hover:animate-legal-float"
              >
                <Bell className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-300" />
                {hasNotifications && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-legal-pulse" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};
