
import { ReactNode } from 'react';
import { FooterMenu } from '@/components/FooterMenu';
import { MobileHeader } from '@/components/MobileHeader';

interface MobileLayoutProps {
  children: ReactNode;
}

export const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile Header */}
      <MobileHeader />
      
      {/* Main Content with proper spacing for fixed elements */}
      <main className="flex-1 pt-16 pb-24 overflow-x-hidden">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <FooterMenu />
    </div>
  );
};
