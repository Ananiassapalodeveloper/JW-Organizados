import { Metadata } from "next"

import { Button } from "@/components/ui/button"

import { CalendarDateRangePicker } from "@/app/dashboard/components/date-range-picker"
import { MainNav } from "@/app/dashboard/components/main-nav"
// import { Overview } from "@/app/dashboard/components/overview"
import { Search } from "@/app/dashboard/components/search"
import TeamSwitcher from "@/app/dashboard/components/team-switcher"
import { UserNav } from "@/app/dashboard/components/user-nav"
import { Users } from "lucide-react"


export const metadata: Metadata = {
  title: "Visão geral",
  description: "Visão geral da congregação praça Nova 3",
}



interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function MainPageLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-4">
            <Users size={32} strokeWidth={3} />
            <span>Organizado</span>
          </h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>Baixar</Button>
          </div>
        </div>
        { children}
      </div>
    </div>
  )
}
