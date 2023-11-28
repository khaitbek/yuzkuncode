import { type ComponentProps } from "react";
import RQProvider from "./rq-provider";
import { SessionProvider } from "./session-provider";

export default function Providers({ children }: ComponentProps<"div">) {
  return (
    <>
      <SessionProvider>
        <RQProvider>{children}</RQProvider>
      </SessionProvider>
    </>
  );
}
