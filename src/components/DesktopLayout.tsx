
import { ReactNode, useState } from 'react';
import { DesktopSidebar } from '@/components/DesktopSidebar';
import { DesktopHeader } from '@/components/DesktopHeader';
import { FooterMenu } from '@/components/FooterMenu';
import { SuporteTab } from '@/components/SuporteTab';

interface DesktopLayoutProps {
  children: ReactNode;
}

export const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <DesktopSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-72'}`}>
        {/* Desktop Header */}
        <DesktopHeader />
        
        {/* Desktop Top Menu (adapted from Footer Menu) */}
        <div className="pt-20 px-4">
          <div className="max-w-7xl mx-auto mb-4">
            <FooterMenu isVisible={true} />
          </div>
        </div>
        
        {/* Main Content */}
        <main className="pt-4 pb-80">
          {children}
        </main>
      </div>

      {/* Support Tab */}
      <SuporteTab />
    </div>
  );
};
