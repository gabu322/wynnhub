"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalculatorIcon, ClipboardListIcon, HouseIcon } from "lucide-react";

import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarRail,
   SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar() {
   const pathname = usePathname();

   const links = [
      {
         href: "/calculator",
         label: "Auto Calculator",
         icon: CalculatorIcon,
      },
      {
         href: "/planner",
         label: "Manual Planner",
         icon: ClipboardListIcon,
      },
   ];

   return (
      <Sidebar collapsible="offcanvas">
         <SidebarHeader>
            <div className="flex items-center justify-between gap-2">
               <SidebarMenu>
                  <SidebarMenuItem>
                     <SidebarMenuButton asChild size="lg" tooltip="Wynnhub">
                        <Link href="/">
                           <HouseIcon />
                           <span>Wynnhub</span>
                        </Link>
                     </SidebarMenuButton>
                  </SidebarMenuItem>
               </SidebarMenu>
               <SidebarTrigger className="md:hidden" aria-label="Close sidebar" />
            </div>
         </SidebarHeader>

         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel>Tools</SidebarGroupLabel>
               <SidebarMenu>
                  {links.map((link) => {
                     const Icon = link.icon;

                     return (
                        <SidebarMenuItem key={link.href}>
                           <SidebarMenuButton asChild tooltip={link.label} isActive={pathname === link.href}>
                              <Link href={link.href}>
                                 <Icon />
                                 <span>{link.label}</span>
                              </Link>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     );
                  })}
               </SidebarMenu>
            </SidebarGroup>
         </SidebarContent>

         <SidebarRail />
      </Sidebar>
   );
}
