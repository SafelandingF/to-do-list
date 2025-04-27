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
      <div className="">
        <div>
          <SidebarProvider
            open={props?.isFold}
            defaultOpen={false}
            className="h-auto"
          >
            <AppSidebar
              handleFold={props?.handleFold}
              isFold={props?.isFold}
            ></AppSidebar>
          </SidebarProvider>
        </div>
      </div>
    </>
  );
};

export default Layout;
