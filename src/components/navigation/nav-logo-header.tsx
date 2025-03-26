import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { useSidebar } from "@/hooks/use-sidebar";
import { Button } from "../ui/button";
import { Logo } from "../ui/logo";
import { isAuthenticatedAtom } from "@/atoms/auth-atoms";
import { useAtomValue } from "jotai";

export function LogoHeader() {
  const { isMobile, state } = useSidebar();
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  return (
    <Button
      variant="ghost"
      className={cn(
        "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground _py-2 h-12 items-start justify-start px-2 py-0 text-start transition-none",
        !isMobile &&
          state === "collapsed" &&
          "ml-1 size-7 p-0 hover:!bg-transparent",
      )}
      title="Chronica"
      asChild
    >
      <Link
        to={isAuthenticated ? "/dashboard" : "/"}
        className="flex items-center justify-center rounded-lg bg-transparent pb-1"
      >
        <Logo iconOnly={isMobile ? false : state === "collapsed"} />
      </Link>
    </Button>
  );
}
