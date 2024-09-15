import type { Metadata } from "next";
// import localFont from "next/font/local";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import "./globals.css";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider"
import { cn } from "@/lib/utils";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social application",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(font.className, "bg-white dark:bg-[#313338]")}
        >
          <ThemeProvider attribute="class" enableSystem={false} storageKey="discord-theme">
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
