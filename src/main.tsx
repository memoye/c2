import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { DEFAULT_UI_THEME, THEME_STORAGE_KEY } from "./lib/constants";
import { LoadingBarContainer } from "react-top-loading-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./components/providers/theme-provider";

import "./index.css";

const queryClient = new QueryClient();

// Listen for silent renew errors
window.addEventListener("message", (event) => {
  if (event.data.type === "oidc-silent-renew-error") {
    console.error("Silent renew failed:", event.data.error);
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider
      defaultTheme={DEFAULT_UI_THEME}
      storageKey={THEME_STORAGE_KEY}
    >
      <LoadingBarContainer props={{ color: "var(--brand)" }}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </LoadingBarContainer>
    </ThemeProvider>
    ,
  </StrictMode>,
);
