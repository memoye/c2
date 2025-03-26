import dashboardScreenshot from "@/assets/images/dashboard-overview.png";
import { Outlet } from "react-router";

export default function OnboardingLayout() {
  return (
    <div className="relative flex h-dvh items-center overflow-hidden overflow-y-auto lg:px-0">
      <div className="sticky inset-y-0 hidden h-dvh w-full flex-1 lg:block xl:max-w-[653px]">
        <div className="bg-brand text-brand-foreground relative hidden h-full flex-col px-10 py-16 lg:flex">
          <div className="absolute inset-0" />
          <div className="relative z-20 flex flex-col items-center space-y-[5.125rem] text-center text-lg font-semibold lg:text-3xl">
            <p className="mx-auto">
              A Simple way to manage <br /> everything about your firm.
            </p>

            <div className="relative mr-10">
              <img
                src={dashboardScreenshot}
                alt="Chronica dashboard overview "
                className="rounded-lg duration-1000 select-none"
                draggable={false}
                width={541}
                height={570}
              />

              <div className="absolute -right-8 bottom-5 h-[150px] w-[150px] rounded-lg bg-white xl:h-[282px] xl:w-[303px]" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-2">
        <Outlet />
      </div>
    </div>
  );
}
