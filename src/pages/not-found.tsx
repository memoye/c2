import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Link } from "react-router";
import { useAtomValue } from "jotai";
import { isAuthenticatedAtom } from "@/atoms/auth-atoms";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { GridViewIcon } from "@/components/ui/icons";

export function NotFound() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  if (isAuthenticated)
    return (
      <DashboardLayout>
        <div className="flex h-full min-h-[calc(100dvh-10rem)] w-full place-items-center">
          <div className="mx-auto flex flex-col items-center text-center">
            <h1 className="text-brand text-9xl font-black">404</h1>
            <p className="text-muted-foreground mt-4 mb-3">
              The page you are looking does not exist or might have moved to a
              different address.
              <br /> Contact{" "}
              <a
                className="text-primary font-medium"
                href="mailto:hello@chronica.legal"
                target="_blank"
              >
                hello@chronica.legal
              </a>{" "}
              for further assistance.
            </p>
            <div className="mt-6 flex w-full items-center justify-center gap-4">
              <BackButton className="!text-brand" />
              <Button
                type="button"
                variant="brand"
                asChild
                className="space-x-2"
              >
                <Link to="/dashboard">
                  <GridViewIcon /> Go to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );

  return (
    <div className="flex h-full min-h-[calc(100dvh-10rem)] w-full place-items-center">
      <div className="mx-auto flex flex-col items-center text-center">
        <h1 className="text-primary text-9xl font-black">404</h1>
        <p className="text-foreground-light mt-4 mb-3">
          The page you are looking does not exist or might have moved to a
          different address.
          <br /> Contact{" "}
          <a
            className="text-primary font-medium"
            href="mailto:hello@chronica.legal"
            target="_blank"
          >
            hello@chronica.legal
          </a>{" "}
          for further assistance.
        </p>
        <div className="mt-6 flex w-full items-center justify-center gap-4">
          <BackButton />
          <Button type="button" asChild className="space-x-2">
            <Link to="/">
              <HomeIcon size={16} /> Go home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
