import { AppSidebar } from "../navigation/app-sidebar";
import { SidebarProvider } from "../providers/sidebar-provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { ThemeToggle } from "../ui/theme-toggle";
import { SidebarInset, SidebarTrigger } from "../ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { BellIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />

            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh]" />
          <div className="bg-muted/50 min-h-screen w-full" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function DashboardHeader() {
  return (
    <header className="bg-sidebar/80 sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b backdrop-blur transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex h-16 w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 !h-4" />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto flex h-16 items-center">
          <NotificationsDropdown className="p-2" />
          <Separator orientation="vertical" className="mx-2 !h-4" />
          <ThemeToggle className="p-2" />
        </div>
      </div>
    </header>
  );
}

const items = [
  {
    title: "A notification ",
    description: "This is a how a notification looks ",
    read: false,
  },
  {
    title: "A new notification ",
    description: "This is a how an unread notification looks ",
    read: true,
  },
];

export function NotificationsDropdown({ className }: { className?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className={className}>
          <span className="relative">
            <BellIcon />
            {!!items?.filter((item) => !item.read).length && (
              <span className="bg-destructive absolute top-0 inline-block size-2 rounded-full" />
            )}
            <span className="sr-only">Notifications</span>
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="ml-5 w-[300px]"
        sideOffset={10}
      >
        <DropdownMenuLabel className="py-3">
          <h3>Notifications</h3>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-1">
          {items?.length
            ? items?.map((item) => {
                return (
                  <DropdownMenuItem
                    className={cn(
                      "",
                      item.read ? "bg-background" : "bg-sidebar-accent",
                    )}
                    key={item.title}
                  >
                    <div>
                      <h4 className="text-base font-medium">{item.title}</h4>
                      <p className="max-w-full truncate">{item.description}</p>
                    </div>
                  </DropdownMenuItem>
                );
              })
            : ""}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button className="w-full">See all notifications</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
