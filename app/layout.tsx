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

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ModalProvider } from "@/components/providers/modal-provider";
import { Socket } from "socket.io";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";

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
  // console.log('RootLayout children:', children); // Add this line

  return (
    <ClerkProvider dynamic>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(font.className, "text-white dark:bg-[#313338]")}
        >
          <ThemeProvider 
          attribute="class" 
          defaultTheme="dark"
          enableSystem={false} 
          storageKey="discord-theme"
          >
            <SocketProvider >
              <ModalProvider />
              <QueryProvider>
              {children} 
              </QueryProvider>
            </SocketProvider>
            <ModalProvider />   
            {children} {/* Ensure children is rendered here */}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
