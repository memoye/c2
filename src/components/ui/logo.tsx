import { cn } from "@/lib/utils";
import logoIcon from "@/assets/images/logo-icon.png";
import logoIconFull from "@/assets/images/logo-full.png";
import logoIconWhite from "@/assets/images/logo-icon-white.png";
import logoIconGray from "@/assets/images/logo-icon-gray.png";

interface LogoProps {
  iconOnly?: boolean;
  className?: string;
  noColor?: boolean;
}

export function Logo({ iconOnly, className, noColor }: LogoProps) {
  if (iconOnly) {
    return noColor ? (
      <div
        className={cn(
          "flex cursor-pointer items-center justify-start gap-2 p-0.5 sm:gap-4",
          className,
        )}
      >
        <img
          className="size-8 object-contain dark:hidden"
          src={logoIconWhite}
          width={50}
          height={50}
          alt="Chronica"
        />
        <img
          className="hidden size-8 object-contain dark:inline-block"
          src={logoIconGray}
          width={50}
          height={50}
          alt="Chronica"
        />
      </div>
    ) : (
      <div
        className={cn(
          "flex cursor-pointer items-center justify-start gap-2 p-0.5 sm:gap-4",
          className,
        )}
      >
        <img
          className="size-8 object-contain"
          src={logoIcon}
          width={50}
          height={50}
          alt="Chronica"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center justify-start gap-2 p-0.5 sm:gap-4",
        className,
      )}
    >
      <img
        className="h-12 w-28 object-contain"
        src={logoIconFull}
        width={1800}
        height={535}
        alt="Chronica"
      />
    </div>
  );
}
