"use client"

import { Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { coursesData } from "@/data/courses"

export default function FicheGeneratorPage() {
  const router = useRouter()

  const subjects = coursesData.subjects.map((s) => ({
    id: s.id,
    name: s.name,
    icon: s.icon,
    bgColor: s.bgColor,
    color: s.color,
  }))

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Création intelligente</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Choisir une matière</h1>
            <p className="text-muted-foreground">Sélectionne la matière pour laquelle tu veux créer une fiche</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => router.push(`/fiches/creer-fiche/database?subject=${subject.id}`)}
                className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:border-purple-500/40 hover:shadow-xl transition-all text-left group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: subject.bgColor }}
                >
                  {subject.icon}
                </div>
                <div>
                  <p className="font-bold" style={{ color: subject.color }}>{subject.name}</p>
                  <p className="text-sm text-muted-foreground">Générer une fiche</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
