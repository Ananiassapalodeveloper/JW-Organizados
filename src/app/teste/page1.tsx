import { ImprovedReaderWatchTower } from "@/components/testeComponents/improved-reader-watch-tower"

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">Sistema de Designações</h1>
        <ImprovedReaderWatchTower />
      </div>
    </div>
  )
}

