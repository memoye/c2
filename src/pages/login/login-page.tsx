import type { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { LoginForm } from "./login-form";

export default function LoginPage({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className="bg-background relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <Link
                to="/"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex items-center justify-center rounded-md">
                  <Logo iconOnly className="[&>img]:size-10" />
                </div>
                <span className="sr-only">Chronica.</span>
              </Link>
              <h1 className="text-brand text-center text-xl font-bold">
                Welcome to Chronica<span className="font-light">&trade;</span>
              </h1>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/onboarding" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>

            <LoginForm />
          </div>

          <div className="text-muted-foreground hover:[&_a]:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
            By clicking "continue", you agree to our{" "}
            <Link to="/terms-of-service">Terms of Service</Link> and{" "}
            <Link to="/terms-of-service#privacy">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
