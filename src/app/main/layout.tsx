import { AppSidebar } from "@/app/main/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Layout from "@/contexts/SearchContext"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Visão geral",
  description: "Visão geral da congregação praça Nova 3",
}



interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function MainPageLayout({ children }: SettingsLayoutProps) {
  return (
    <Layout>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className=" overflow-y-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Congregação
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Grupos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </Layout>
  )
}
