import { data } from "./data";
import { NavMain } from "@/components/navigation/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LogoHeader } from "./nav-logo-header";
import { NavFooter } from "./nav-footer";
import { Skeleton } from "../ui/skeleton";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoHeader />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export function AppSidebarSkeleton({ withNav }: { withNav?: boolean }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <LogoHeader />
      </SidebarHeader>

      <SidebarContent aria-busy="true">
        {withNav ? (
          <NavMain items={data} />
        ) : (
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 8 }).map((_, i) => (
                <SidebarMenuItem key={i}>
                  <Skeleton className="h-10 w-full" />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter aria-busy="true">
        <Skeleton className="h-10 w-full" />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
