"use client";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { type ComponentProps } from "react";

export function SessionProvider({ children }: ComponentProps<"div">) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
