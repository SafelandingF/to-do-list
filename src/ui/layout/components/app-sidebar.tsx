import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import clsx from 'clsx';
import { Home, Popsicle } from 'lucide-react';

const Note = () => {
  return (
    <>
      <span>123123123</span>
    </>
  );
};

export function AppSidebar(porps: {
  handleFold?: () => void;
  isFold?: boolean;
}) {
  return (
    <Sidebar
      collapsible="icon"
      className={clsx(
        'transition-all',
        { 'h-10 w-5': !porps.isFold },
        {
          'h-15 w-auto': porps.isFold
        }
      )}
    >
      <SidebarMenuButton>
        <a href="#" onClick={porps.handleFold}>
          <Home scale={1.5} />
        </a>
        {porps.isFold && (
          <>
            <span>123123123</span>
          </>
        )}
      </SidebarMenuButton>
    </Sidebar>
  );
}
