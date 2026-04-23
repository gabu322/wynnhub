import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const robotoSans = Roboto({
   variable: "--font-roboto-sans",
   subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
   variable: "--font-roboto-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Wynnhub",
   description: "Mount feed tools, calculator, planner, and timing reference.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" className={`${robotoSans.variable} ${robotoMono.variable} h-full antialiased`}>
         <body className="min-h-full flex flex-col">
            <TooltipProvider>
               <SidebarProvider defaultOpen>
                  <AppSidebar />
                  <div className="w-full">
                     <header className="sticky top-0 z-20 border-b bg-background px-4 py-3 md:hidden">
                        <div className="mx-auto flex w-full max-w-6xl items-center gap-2">
                           <SidebarTrigger aria-label="Open sidebar" />
                           <span className="text-sm font-semibold">Wynnhub</span>
                        </div>
                     </header>
                     {children}
                  </div>
               </SidebarProvider>
            </TooltipProvider>
         </body>
      </html>
   );
}
