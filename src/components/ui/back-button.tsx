import type { ReactNode } from "react";
import { MoveLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export function BackButton({
  icon = <MoveLeftIcon className="size-4" />,
  text = "Go Back",
  className,
}: {
  icon?: ReactNode;
  text?: string;
  className?: string;
}) {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      className={cn("hover:bg-muted", className)}
      variant="ghost"
      onClick={() => navigate(-1)}
    >
      {icon} {text}
    </Button>
  );
}
