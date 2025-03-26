import {
  BadgeCheck,
  Bell,
  ChevronDownIcon,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms/auth-atoms";
import { Separator } from "../ui/separator";

export function UserActions() {
  const { profile } = useAtomValue(userAtom) ?? {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          variant="ghost"
          className="data-[state=open]:bg-accent group data-[state=open]:text-accent-foreground focus-visible:ring-accent h-10 rounded-full !px-1.5"
        >
          <Avatar className="size-8 rounded-full">
            <AvatarImage src={profile?.picture} alt={profile?.name} />
            <AvatarFallback className="rounded-lg">
              {profile?.given_name?.charAt(0) || ""}
              {profile?.family_name?.charAt(0) || ""}
            </AvatarFallback>
          </Avatar>
          <div className="sr-only grid flex-1 text-left text-sm leading-tight md:not-sr-only">
            <span className="truncate text-xs font-medium">
              {profile?.given_name} {profile?.family_name}
            </span>
            <span className="truncate text-xs font-light">{profile?.role}</span>
          </div>
          <Separator
            orientation="vertical"
            className="bg-background hidden h-full opacity-0 transition-opacity group-hover:opacity-100 md:inline-block"
          />
          <ChevronDownIcon className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex cursor-default items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={profile?.picture} alt={profile?.name} />
              <AvatarFallback className="rounded-lg">
                {profile?.given_name?.charAt(0) || ""}
                {profile?.family_name?.charAt(0) || ""}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {profile?.given_name} {profile?.family_name}
              </span>
              <span title={profile?.email} className="truncate text-[10px]">
                {profile?.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
