"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Check, Plus, Trash2, Clock, Sparkles } from "lucide-react"
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const allFiches: SavedFiche[] = []
    
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
              ficheKey: key
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

  const allFiches = Object.keys(groupedByDate).map(date => ({
    date,
    items: groupedByDate[date]
  }))

  const filteredFiches = selectedSubject === "Toutes"
    ? allFiches
    : allFiches.map(group => ({
      date: group.date,
      items: group.items.filter(fiche => fiche.subject === selectedSubject)
    })).filter(group => group.items.length > 0)

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }

  const handleDeleteFiche = (ficheKey: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    sessionStorage.removeItem(ficheKey)
    setSavedFiches(prev => prev.filter(f => f.ficheKey !== ficheKey))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px]" />
      </div>

      <header className="sticky top-0 z-50 glass">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-xl">🦕</span>
            </div>
            <span className="font-bold hidden sm:block">DinoBot</span>
          </Link>
          <div className="flex-1" />
          <button
            onClick={() => setIsSubjectModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm"
          >
            {selectedSubject}
            <ChevronDown className="w-4 h-4" />
          </button>
          <Link
            href="/fiches/creer-fiche"
            className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Mes fiches</h1>
            <p className="text-muted-foreground">
              {savedFiches.length} fiche{savedFiches.length !== 1 ? 's' : ''} sauvegardée{savedFiches.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="space-y-8">
            {filteredFiches.length === 0 ? (
              <div className="text-center py-16 glass rounded-3xl">
                <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📝</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {selectedSubject === "Toutes" ? "Aucune fiche" : `Aucune fiche ${selectedSubject}`}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {selectedSubject === "Toutes" ? "Crée ta première fiche !" : "Essaie avec une autre matière"}
                </p>
                <Link
                  href="/fiches/creer-fiche"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Créer une fiche
                </Link>
              </div>
            ) : (
              filteredFiches.map((dateGroup, idx) => (
                <div key={idx}>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {dateGroup.date}
                  </h3>
                  <div className="space-y-3">
                    {dateGroup.items.map((fiche) => {
                      const colors = fiche.colors
                      
                      const handleFicheClick = (e: React.MouseEvent) => {
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
                          className="block rounded-2xl glass hover:shadow-xl transition-all overflow-hidden group"
                        >
                          <div
                            className="px-4 py-2"
                            style={{ backgroundColor: colors.bgColor }}
                          >
                            <p className="text-sm font-semibold" style={{ color: colors.color }}>
                              {fiche.subject} - {fiche.title}
                            </p>
                          </div>
                          <div className="px-4 py-4 flex items-center gap-3">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                              style={{ backgroundColor: colors.bgColor }}
                            >
                              {fiche.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-muted-foreground mb-0.5">
                                {formatTime(fiche.createdAt)}
                              </p>
                              <p className="font-semibold truncate">{fiche.title}</p>
                              <p className="text-xs text-muted-foreground">{fiche.subtitle}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => handleDeleteFiche(fiche.ficheKey, e)}
                                className="p-2 rounded-full hover:bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <Sparkles className="w-4 h-4 text-purple-500" />
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
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center"
          onClick={() => setIsSubjectModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-background rounded-t-[2rem] md:rounded-[2rem] w-full md:max-w-md overflow-hidden shadow-2xl animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-background border-b border-border px-6 py-5">
              <h3 className="text-xl font-bold">Filtrer par matière</h3>
            </div>
            <div className="p-6 space-y-2 max-h-[70vh] overflow-y-auto">
              <button
                onClick={() => {
                  setSelectedSubject("Toutes")
                  setIsSubjectModalOpen(false)
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  selectedSubject === "Toutes" ? "glass" : "hover:bg-muted"
                }`}
              >
                <div className="text-3xl">📚</div>
                <span className="font-semibold flex-1 text-left">
                  Toutes les matières
                </span>
                {selectedSubject === "Toutes" && <Check className="w-5 h-5 text-purple-500" />}
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
                    className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.01]"
                    style={{
                      backgroundColor: isSelected ? subject.bgColor : undefined,
                    }}
                  >
                    <div className="text-3xl">{subject.icon}</div>
                    <span className="font-semibold flex-1 text-left" style={{ color: subject.color }}>
                      {subject.name}
                    </span>
                    {isSelected && <Check className="w-5 h-5" style={{ color: subject.color }} />}
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
