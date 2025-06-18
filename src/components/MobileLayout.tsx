
import { ReactNode, useState } from 'react';
import { FooterMenu } from '@/components/FooterMenu';
import { MobileHeader } from '@/components/MobileHeader';
import { SuporteTab } from '@/components/SuporteTab';

interface MobileLayoutProps {
  children: ReactNode;
}

export const MobileLayout = ({ children }: MobileLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col py-0">
      {/* Mobile Header */}
      <MobileHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main Content with proper spacing for fixed elements */}
      <main className="flex-1 pt-16 pb-96 overflow-x-hidden">
        {children}
      </main>
      
      {/* Bottom Navigation - hidden when sidebar is open */}
      <FooterMenu isVisible={!sidebarOpen} />
      
      {/* Support Tab */}
      <SuporteTab />
    </div>
  );
};
