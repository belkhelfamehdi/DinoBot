"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Check, Plus } from "lucide-react"
import Link from "next/link"
import { coursesData } from "@/data/courses"

interface SavedFiche {
  subject: string
  subjectId: string
  chapter: string
  createdAt: string
  subjectIcon: string
  ficheKey?: string
}

export default function ToutesLesFichesPage() {
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("Toutes")
  const [savedFiches, setSavedFiches] = useState<SavedFiche[]>([])

  useEffect(() => {
    // Charger toutes les fiches sauvegardées depuis sessionStorage
    const allFiches: SavedFiche[] = []
    
    // Parcourir tous les items du sessionStorage
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key?.startsWith('generatedFicheData_')) {
        try {
          const data = JSON.parse(sessionStorage.getItem(key) || '{}')
          if (data.chapter) {
            allFiches.push({
              subject: data.subject || "Physique-Chimie",
              subjectId: data.subjectId || "physique-chimie",
              chapter: data.chapter,
              createdAt: data.createdAt || new Date().toISOString(),
              subjectIcon: data.subjectIcon || "⚗️",
              ficheKey: key // Stocker la clé pour retrouver la fiche plus tard
            })
          }
        } catch (e) {
          console.error('Error parsing saved fiche:', e)
        }
      }
    }
    
    setSavedFiches(allFiches)
  }, [])

  const subjects = coursesData.subjects.map((subject: { id: any; name: any; icon: any; bgColor: any; color: any }) => {
    return {
      id: subject.id,
      name: subject.name,
      icon: subject.icon,
      bgColor: subject.bgColor,
      color: subject.color,
    }
  })

  // Grouper les fiches par date
  const groupedByDate: { [key: string]: any[] } = {}
  
  savedFiches.forEach(fiche => {
    const date = new Date(fiche.createdAt)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    let dateKey = ""
    if (date.toDateString() === today.toDateString()) {
      dateKey = "Aujourd'hui"
    } else if (date.toDateString() === yesterday.toDateString()) {
      dateKey = "Hier"
    } else {
      dateKey = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
    }
    
    if (!groupedByDate[dateKey]) {
      groupedByDate[dateKey] = []
    }
    
    // Récupérer les couleurs depuis coursesData
    const subject = coursesData.subjects.find(s => s.id === fiche.subjectId)
    const colors = {
      color: subject?.color || "#7C3AED",
      bgColor: subject?.bgColor || "#F0E7FF",
    }
    
    groupedByDate[dateKey].push({
      id: `fiche-${date.getTime()}`,
      ficheKey: fiche.ficheKey || `generatedFicheData_${date.getTime()}`,
      subject: fiche.subject,
      subjectId: fiche.subjectId,
      title: fiche.chapter,
      subtitle: "Généré par IA",
      type: "fiche",
      createdAt: fiche.createdAt,
      icon: fiche.subjectIcon,
      colors: colors
    })
  })

  // Convertir en format de tableau
  const allFiches = Object.keys(groupedByDate).map(date => ({
    date,
    items: groupedByDate[date]
  }))

  // Filtrer les fiches par matière sélectionnée
  const filteredFiches = selectedSubject === "Toutes"
    ? allFiches
    : allFiches.map(group => ({
      date: group.date,
      items: group.items.filter(fiche => fiche.subject === selectedSubject)
    })).filter(group => group.items.length > 0)

  // Formater le temps d'affichage
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
    const months = ["jan.", "fév.", "mars", "avril", "mai", "juin", "juil.", "août", "sep.", "oct.", "nov.", "déc."]

    const dayName = days[date.getDay()]
    const day = date.getDate()
    const month = months[date.getMonth()]
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${dayName} ${day} ${month} à ${hours}h${minutes}`
  }

  // Obtenir le type de fiche formaté
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "fiche": return "Fiche - Révision"
      case "flashcard": return "FlashCard"
      case "quiz": return "Quiz"
      default: return "Fiche"
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] pb-8">
      <header className="sticky top-0 z-50 bg-white px-3 sm:px-6 py-3 sm:py-4 shadow-md">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dinobot-logo-FNB6LHXRYN4MNMmqlZz3BvbXUAwPPz.png"
              alt="Dinobot"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
            <button className="bg-gradient-to-r from-[#D8C8FF] to-[#E8D8FF] hover:from-[#C8B8FF] hover:to-[#D8C8FF] rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <span className="text-[#5B3FDD] font-bold text-xs sm:text-sm tracking-tight">Fiche</span>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5B3FDD]" />
            </button>
            <button
              onClick={() => setIsSubjectModalOpen(true)}
              className="flex-1 bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] hover:from-[#B8C8FF] hover:to-[#C8D8FF] rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all shadow-md hover:shadow-lg flex items-center justify-between gap-1.5 sm:gap-2 min-w-0"
            >
              <span className="text-[#5B7FFF] font-bold text-xs sm:text-sm tracking-tight truncate">
                {selectedSubject}
              </span>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5B7FFF] flex-shrink-0" />
            </button>
          </div>
          <Link href="/fiches/creer-fiche">
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all flex-shrink-0">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </Link>
        </div>
      </header>

      <main className="px-3 sm:px-6 mt-4 sm:mt-6">
        <div className="bg-white rounded-[2rem] px-4 sm:px-5 py-5 sm:py-6 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 sm:mb-6 tracking-tight">
            Toutes tes fiches
          </h2>

          <div className="space-y-6 sm:space-y-8">
            {filteredFiches.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-slate-500 text-lg font-medium">
                  Aucune fiche pour cette matière
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  Crée ta première fiche !
                </p>
              </div>
            ) : (
              filteredFiches.map((dateGroup, idx) => (
                <div key={idx}>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">
                    {dateGroup.date}
                  </h3>
                  <div className="space-y-2.5 sm:space-y-3">
                    {dateGroup.items.map((fiche) => {
                      const colors = fiche.colors
                      
                      const handleFicheClick = (e: React.MouseEvent) => {
                        e.preventDefault()
                        // Charger les données de cette fiche spécifique dans la clé active
                        const ficheData = sessionStorage.getItem(fiche.ficheKey)
                        if (ficheData) {
                          sessionStorage.setItem('generatedFicheData', ficheData)
                          window.location.href = '/fiches/revision'
                        }
                      }
                      
                      return (
                        <Link
                          key={fiche.id}
                          href="/fiches/revision"
                          onClick={handleFicheClick}
                          className="block bg-white rounded-[1.5rem] shadow-md hover:shadow-lg transition-all overflow-hidden group"
                        >
                          <div
                            className="px-3 sm:px-4 py-2 sm:py-2.5"
                            style={{ backgroundColor: colors.color }}
                          >
                            <p className="text-white text-xs sm:text-sm font-bold tracking-tight">
                              {fiche.subject} - {getTypeLabel(fiche.type)}
                            </p>
                          </div>
                          <div className="px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2.5 sm:gap-3">
                            <div
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-[1rem] flex items-center justify-center flex-shrink-0 shadow-sm"
                              style={{ backgroundColor: colors.bgColor }}
                            >
                              <div className="text-lg sm:text-xl">{fiche.icon}</div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm text-slate-500 font-medium mb-0.5">
                                {formatTime(fiche.createdAt)}
                              </p>
                              <p className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
                                {fiche.title}
                              </p>
                              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{fiche.subtitle}</p>
                            </div>
                            <div className="text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all flex-shrink-0">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {isSubjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSubjectModalOpen(false)} />
          <div className="relative bg-white rounded-t-[2rem] md:rounded-[2rem] w-full md:max-w-lg overflow-hidden shadow-2xl animate-in slide-in-from-bottom">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-5">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Choisis ta matière</h3>
            </div>
            <div className="p-6 space-y-2 max-h-[70vh] overflow-y-auto">
              <button
                onClick={() => {
                  setSelectedSubject("Toutes")
                  setIsSubjectModalOpen(false)
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-[1.25rem] transition-all hover:scale-[1.01] ${selectedSubject === "Toutes" ? "bg-slate-100" : "bg-white hover:bg-slate-50"
                  }`}
              >
                <div className="text-3xl">📚</div>
                <span className="text-base font-bold tracking-tight flex-1 text-left text-slate-700">
                  Toutes les matières
                </span>
                {selectedSubject === "Toutes" && <Check className="w-6 h-6 text-slate-700" />}
              </button>
              {subjects.map((subject) => {
                const isSelected = selectedSubject === subject.name
                return (
                  <button
                    key={subject.name}
                    onClick={() => {
                      setSelectedSubject(subject.name)
                      setIsSubjectModalOpen(false)
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-[1.25rem] transition-all hover:scale-[1.01]"
                    style={{
                      backgroundColor: isSelected ? subject.bgColor : "#ffffff",
                      color: isSelected ? subject.color : "#64748b"
                    }}
                  >
                    <div className="text-3xl">{subject.icon}</div>
                    <span className="text-base font-bold tracking-tight flex-1 text-left" style={{ color: subject.color }}>
                      {subject.name}
                    </span>
                    {isSelected && <Check className="w-6 h-6" style={{ color: subject.color }} />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
