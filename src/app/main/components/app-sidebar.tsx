import * as React from "react"

import { SearchForm } from "./search-form"
import { VersionSwitcher } from "./version-switcher"
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
import { setThemeColor } from "@/app/dashboard/components/Meetingype"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Designação",
      url: "#",
      items: [
        {
          title: "Reunião do meio de semana",
          url: "#",
        },
        {
          title: "Reunião do fim de semana",
          url: "#",
        },
        {
          title: "Visão geral da reunião da semana",
          url: "#",
        }
      ],
    },
    {
      title: "Congregação",
      url: "#",
      items: [
        {
          title: "Publicadores",
          url: "#",
        },
        {
          title: "Assistência",
          url: "#",
          isActive: true,
        },
        {
          title: "Grupo",
          url: "#",
        },
        {
          title: "Remoção",
          url: "#",
        },
        {
          title: "Departamento",
          url: "#",
        }
      ],
    },
    {
      title: "Relatório",
      url: "#",
      items: [
        {
          title: "Pioneiro regular",
          url: "#",
        },
        {
          title: "Pioneiro Auxiliar",
          url: "#",
        },
        {
          title: "Publicador",
          url: "#",
        }
      ],
    },
    {
      title: "Privilégio de serviço",
      url: "#",
      items: [
        {
          title: "Contas",
          url: "#",
        },
        {
          title: "Literatura",
          url: "#",
        },
        {
          title: "Audio/Som",
          url: "#",
        },
        {
          title: "Território",
          url: "#",
        },
        {
          title: "Manutenção",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item,i) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className={setThemeColor(i)}>{item.title}</SidebarGroupLabel>
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
