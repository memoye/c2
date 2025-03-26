import { AppSidebar, AppSidebarSkeleton } from "../navigation/app-sidebar";
import { SidebarProvider } from "../providers/sidebar-provider";
import { SidebarInset } from "../ui/sidebar";
import { DashboardHeader } from "../ui/dashboard-header";
import { Skeleton } from "../ui/skeleton";
import { ThemeToggle } from "../ui/theme-toggle";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export const DashboardLayoutSkeleton = ({ withNav }: { withNav?: boolean }) => {
  return (
    <SidebarProvider>
      <AppSidebarSkeleton withNav={withNav} />
      <SidebarInset>
        <div className="bg-background sticky top-0 z-10 flex h-16 items-center justify-between rounded-none border-b px-4">
          <div className="flex items-center gap-3" aria-busy="true">
            <Skeleton className="size-8 rounded-sm" />
            <Skeleton className="h-4 w-16 rounded-sm" />
          </div>

          <div className="flex items-center gap-4">
            <Skeleton className="size-8" aria-busy="true" />
            <Skeleton className="h-8 w-12" aria-busy="true" />
            <ThemeToggle />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4" aria-busy="true">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Skeleton className="aspect-video rounded-xl" />
            <Skeleton className="aspect-video rounded-xl" />
            <Skeleton className="aspect-video rounded-xl" />
          </div>
          <Skeleton className="flex-1" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
