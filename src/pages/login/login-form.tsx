import { useEffect } from "react";
import { useLoadingBar } from "react-top-loading-bar";
import { ArrowRight } from "lucide-react";
import { login } from "@/services/connect";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const { start, complete } = useLoadingBar();

  async function handleOIDCLogin() {
    start();
    try {
      await login();
    } catch (error) {
      console.log("Error logging in: ", error);
    } finally {
      complete();
    }
  }

  useEffect(() => {
    return () => complete();
  }, [complete]);

  return (
    <div className="w-full max-w-sm space-y-6">
      <Button
        type="button"
        onClick={handleOIDCLogin}
        variant="brand"
        className="relative h-12 w-full text-lg font-medium transition-all hover:scale-[1.02]"
      >
        <span className="flex items-center justify-center gap-2">
          <span className="max-[250px]:hidden">Continue to</span> Login
          <ArrowRight className="h-5 w-5" />
        </span>
      </Button>
      {/* <form className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label className="opacity-50" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            disabled
          />
        </div>
        <Button variant="brand" type="submit" className="w-full" disabled>
          Login
        </Button>
      </form>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Button
          type="button"
          onClick={handleOIDCLogin}
          variant="outline"
          className="relative w-full"
        >
          <span className="pointer-events-none absolute bottom-[calc(100%+(--spacing(1)))] left-0 mr-2 flex items-center gap-0.5 text-[8px] text-green-600">
            <CheckIcon className="size-2" /> Recommended
          </span>

          <span className="flex items-center gap-2">
            <KeyIcon />
            Login with Open ID
          </span>
        </Button>
        <Button
          variant="outline"
          className="w-full disabled:select-none"
          disabled
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Continue with Google
        </Button>
      </div> */}
    </div>
  );
}
