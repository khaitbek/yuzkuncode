import { type ComponentProps } from "react";
import RQProvider from "./rq-provider";
import { SessionProvider } from "./session-provider";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: ComponentProps<"div">) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>
          <RQProvider>{children}</RQProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
