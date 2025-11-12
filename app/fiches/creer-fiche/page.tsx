"use client"

import { useState } from "react"
import { Database, FileText, BookOpen, ChevronDown, X, Check, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { coursesData } from "@/data/courses"

export default function FicheGeneratorPage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
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
      description: "Créer à partir de votre base de données",
      gradient: "from-[#C8D8FF] to-[#D8E4FF]",
      iconBg: "bg-[#E8F0FF]",
      iconColor: "text-[#6B8EFF]",
      href: "/fiches/creer-fiche/database/?subject=" + subjects.find(s => s.name === selectedSubject)?.id,
    },
    {
      id: "file",
      title: "À partir d'un fichier",
      icon: FileText,
      description: "Importer un fichier existant",
      gradient: "from-[#D8C8FF] to-[#E8D8FF]",
      iconBg: "bg-[#F0E8FF]",
      iconColor: "text-[#9B7FFF]",
      href: "/fiches/creer-fiche/fichier",
    },
    {
      id: "exam",
      title: "À partir d'un examen",
      icon: BookOpen,
      description: "Utiliser un examen comme modèle",
      gradient: "from-[#D0F0E0] to-[#E0F8E8]",
      iconBg: "bg-[#E8F8F0]",
      iconColor: "text-[#5FBF8F]",
      href: "/fiches/creer-fiche/examen",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F0FF] via-[#FAF5FF] to-[#FFF8FF]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
          <Link href="/">
            <img
              src="/images/design-mode/dinobot-logo.jpg"
              alt="DinoBot"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>

          <button className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#D8C8FF] to-[#E8D8FF] text-[#5B3FDD] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all hover:scale-105 flex-shrink-0">
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Fiche</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={() => setIsSubjectModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] text-[#4B6FFF] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all hover:scale-105 min-w-0"
          >
            <span className="truncate">{selectedSubject}</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          </button>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 px-2">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 animate-pulse" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
                Comment souhaitez-vous créer ?
              </h2>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 animate-pulse" />
            </div>
            <p className="text-sm sm:text-base text-slate-600">Choisissez votre méthode de création préférée</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-2">
            {options.map((option) => {
              const Icon = option.icon
              return (
                <Link
                  key={option.id}
                  href={option.href}
                  className={`group relative flex flex-col items-center gap-3 sm:gap-4 p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 ${
                    selectedOption === option.id
                      ? `bg-gradient-to-br ${option.gradient} shadow-xl scale-105`
                      : "bg-white shadow-lg hover:shadow-2xl"
                  }`}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${option.iconBg} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-md`}
                  >
                    <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${option.iconColor}`} />
                  </div>

                  <div className="text-center space-y-1 sm:space-y-2">
                    <span className="text-base sm:text-lg font-bold text-slate-800 block">{option.title}</span>
                    <span className="text-xs sm:text-sm text-slate-600 block leading-tight">{option.description}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>

      {isSubjectModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex md:items-center md:justify-center items-end"
          onClick={() => setIsSubjectModalOpen(false)}
        >
          <div
            className="bg-white rounded-t-[2rem] md:rounded-[2rem] w-full md:max-w-md p-8 animate-slide-up max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Choisis ta matière</h3>
              <button
                onClick={() => setIsSubjectModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-2 -mr-2"
              >
                <X className="w-6 h-6" />
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
                    selectedSubject === subject.name ? subject.bgColor + " shadow-md" : "bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                      selectedSubject === subject.name ? "bg-white/60" : "bg-white"
                    }`}
                  >
                    {subject.icon}
                  </div>
                  <span className={`font-bold text-lg flex-1 text-left ${subject.color}`}>{subject.name}</span>
                  {selectedSubject === subject.name && <Check className={`w-6 h-6 flex-shrink-0 ${subject.color}`} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
