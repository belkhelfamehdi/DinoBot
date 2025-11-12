"use client"

import { ArrowLeft, FileText, ChevronDown, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function FileGeneratorFichePage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)

  const handleGenerate = () => {
    router.push("/fiches/revision")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/fiches/creer-fiche">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/">
            <img
              src="/images/design-mode/dinobot-logo.jpg"
              alt="Dinobot"
              className="w-10 h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>

          <Button variant="default" className="bg-purple-600 hover:bg-purple-700 text-white text-sm h-10">
            <FileText className="mr-2 h-4 w-4" />
            Fiche
          </Button>

          <Button variant="outline" className="ml-auto bg-transparent text-sm h-10">
            Matière
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-10 text-purple-600">
            Créer une fiche à partir d'un fichier
          </h1>

          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="border-2 border-dashed border-purple-300 rounded-xl p-12 text-center hover:border-purple-500 transition-colors">
              <Upload className="w-16 h-16 mx-auto mb-4 text-purple-500" />
              <h3 className="text-lg font-semibold mb-2">Glissez votre fichier ici</h3>
              <p className="text-sm text-slate-600 mb-4">ou cliquez pour sélectionner</p>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.txt"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                  <span>Choisir un fichier</span>
                </Button>
              </label>
              {file && <p className="mt-4 text-sm text-purple-600 font-medium">Fichier sélectionné: {file.name}</p>}
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-6 text-lg font-bold"
              disabled={!file}
            >
              Générer ma fiche
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
