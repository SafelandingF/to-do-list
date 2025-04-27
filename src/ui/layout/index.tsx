import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import React from 'react';

interface LayoutProps {
  isFold: boolean;
  chosenWorkShop?: string;
  children?: React.ReactNode;

  handleFold: () => void;
}

const Layout = (props?: LayoutProps) => {
  return (
    <>
      <div className=" bg-zinc-800">
        <div>
          <SidebarProvider open={props?.isFold} defaultOpen={false}>
            <AppSidebar></AppSidebar>
            <main>
              <button className=" bg-neutral-200" onClick={props?.handleFold}>
                buttons
              </button>
              {props?.children}
            </main>
          </SidebarProvider>
        </div>
      </div>
    </>
  );
};

export default Layout;
