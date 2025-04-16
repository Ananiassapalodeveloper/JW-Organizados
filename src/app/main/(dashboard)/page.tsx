import { Metadata } from "next"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { AssistencesBothMeetingsChart} from "@/components/charts/AssistencesBothMeetingsChart"
import { MeetingTypePage } from "../../../components/componentsCalendarAppNav/Meetingype"

export const metadata: Metadata = {
  title: "Visão geral",
  description: "Visão geral da congregação praça Nova 3",
}




export default function DashboardPage() {
  return (
    <main className="">
    <Tabs defaultValue="overview" className="space-y-4" orientation="vertical">
      <TabsList >
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="des1">
          Reunião da semana
        </TabsTrigger>
       

      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4">
          <AssistencesBothMeetingsChart />
        </div>
      </TabsContent>

      <TabsContent value="des1" className="space-y-4">
        <MeetingTypePage />
      </TabsContent>
    </Tabs>
    </main>
  )
}
