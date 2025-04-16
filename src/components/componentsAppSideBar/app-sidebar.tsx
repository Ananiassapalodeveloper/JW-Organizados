import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SetThemeColor } from "@/lib/color" 

// This is sample data.
const data = {
  navMain: [
    {
      title: "Designação",
      url: "#",
      items: [
        {
          title: "Visão Geral",
          url: "/main",
        },
        {
          title: "Atribuição de designação",
          url: "/main/atribuir",
        }
      ],
    },
    {
      title: "Congregação",
      url: "#",
      items: [
        {
          title: "Registar membros",
          url: "/main/registar",
          isActive: true,

        },
        {
          title: "Membros",
          url: "/main/membros",
        },
        
        {
          title: "Relatórios",
          url: "/main/relatorio",
        }
      ],
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} >
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item,i) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className={SetThemeColor(i)}>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
