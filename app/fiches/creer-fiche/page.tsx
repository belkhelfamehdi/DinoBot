"use client"

import { useState } from "react"
import { Database, FileText, BookOpen, ChevronDown, X, Check, Sparkles, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { coursesData } from "@/data/courses"

export default function FicheGeneratorPage() {
  const router = useRouter()
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("Mathématiques")

  const subjects = coursesData.subjects.map((subject: { id: any; name: any; icon: any; bgColor: any; color: any }) => {
    return {
      id: subject.id,
      name: subject.name,
      icon: subject.icon,
      bgColor: subject.bgColor,
      color: subject.color,
    }
  })

  const options = [
    {
      id: "database",
      title: "Base de données",
      icon: Database,
      description: "Sélectionne une matière et génère du contenu",
      gradient: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-600",
      href: "/fiches/creer-fiche/database/?subject=" + subjects.find(s => s.name === selectedSubject)?.id,
      badge: "Populaire",
    },
    {
      id: "file",
      title: "À partir d'un fichier",
      icon: FileText,
      description: "Importer un fichier existant (PDF, DOCX)",
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-600",
      href: "/fiches/creer-fiche/fichier",
      badge: "Bientôt",
    },
    {
      id: "exam",
      title: "À partir d'un examen",
      icon: BookOpen,
      description: "Utiliser un examen comme modèle",
      gradient: "from-green-500 to-emerald-500",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-600",
      href: "/fiches/creer-fiche/examen",
      badge: "Bientôt",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <header className="sticky top-0 z-50 glass">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-xl">🦕</span>
            </div>
            <span className="font-bold">DinoBot</span>
          </Link>
          <div className="flex-1" />
          <button
            onClick={() => setIsSubjectModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all"
          >
            <span className="truncate max-w-[150px]">{selectedSubject}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600">Création intelligente</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Comment souhaites-tu créer ?
            </h1>
            <p className="text-muted-foreground">
              Choisis ta méthode de création préférée
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {options.map((option) => {
              const Icon = option.icon
              return (
                <Link
                  key={option.id}
                  href={option.href}
                  className="group relative p-8 rounded-3xl glass hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {option.badge && (
                    <span className={`absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${option.gradient} text-white`}>
                      {option.badge}
                    </span>
                  )}
                  <div className={`w-14 h-14 rounded-2xl ${option.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${option.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                  <div className="flex items-center gap-1 text-sm font-medium text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Commencer</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>

      {isSubjectModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center"
          onClick={() => setIsSubjectModalOpen(false)}
        >
          <div
            className="bg-background rounded-t-[2rem] md:rounded-[2rem] w-full md:max-w-md p-6 animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Choisis ta matière</h3>
              <button
                onClick={() => setIsSubjectModalOpen(false)}
                className="p-2 -mr-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => {
                    setSelectedSubject(subject.name)
                    setIsSubjectModalOpen(false)
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    selectedSubject === subject.name 
                      ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20" 
                      : "hover:bg-muted"
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: subject.bgColor }}
                  >
                    {subject.icon}
                  </div>
                  <span className="font-semibold flex-1 text-left">{subject.name}</span>
                  {selectedSubject === subject.name && (
                    <Check className="w-5 h-5 text-purple-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
