import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "././profile-form"
import { Badge } from "@/components/ui/badge"

export default function SettingsProfilePage() {
  return (

    <div className="space-y-6 mt-10">
      <div>
        <h3 className="text-lg font-medium">Registo de membro</h3>
        <p className="text-sm text-muted-foreground">
        Registar um novo membro <Badge>4</Badge>
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}
