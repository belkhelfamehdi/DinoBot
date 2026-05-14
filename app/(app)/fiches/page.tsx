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

  useEffect(() => {
    const allFiches: SavedFiche[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith("generatedFicheData_")) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || "{}")
          if (data.chapter) {
            allFiches.push({
              subject: data.subject || "Physique-Chimie",
              subjectId: data.subjectId || "physique-chimie",
              chapter: data.chapter,
              createdAt: data.createdAt || new Date().toISOString(),
              subjectIcon: data.subjectIcon || "⚗️",
              ficheKey: key,
            })
          }
        } catch (e) {
          console.error("Error parsing saved fiche:", e)
        }
      }
    }
    setSavedFiches(allFiches)
  }, [])

  const subjects = coursesData.subjects.map((s) => ({
    id: s.id,
    name: s.name,
    icon: s.icon,
    bgColor: s.bgColor,
    color: s.color,
  }))

  const groupedByDate: Record<string, ReturnType<typeof buildFicheItem>[]> = {}

  savedFiches.forEach((fiche) => {
    const date = new Date(fiche.createdAt)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    let dateKey: string
    if (date.toDateString() === today.toDateString()) dateKey = "Aujourd'hui"
    else if (date.toDateString() === yesterday.toDateString()) dateKey = "Hier"
    else dateKey = date.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })

    if (!groupedByDate[dateKey]) groupedByDate[dateKey] = []

    const subject = coursesData.subjects.find((s) => s.id === fiche.subjectId)
    groupedByDate[dateKey].push(
      buildFicheItem(fiche, {
        color: subject?.color || "#7C3AED",
        bgColor: subject?.bgColor || "#F0E7FF",
      })
    )
  })

  const allFiches = Object.keys(groupedByDate).map((date) => ({
    date,
    items: groupedByDate[date],
  }))

  const filteredFiches =
    selectedSubject === "Toutes"
      ? allFiches
      : allFiches
          .map((g) => ({ date: g.date, items: g.items.filter((f) => f.subject === selectedSubject) }))
          .filter((g) => g.items.length > 0)

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })

  const handleDeleteFiche = (ficheKey: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    localStorage.removeItem(ficheKey)
    setSavedFiches((prev) => prev.filter((f) => f.ficheKey !== ficheKey))
  }

  const handleFicheClick = (ficheKey: string) => {
    const ficheData = localStorage.getItem(ficheKey)
    if (ficheData) {
      localStorage.setItem("generatedFicheData", ficheData)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <h1 className="text-lg font-bold flex-1">Mes fiches</h1>
          <button
            onClick={() => setIsSubjectModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm"
          >
            {selectedSubject}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <Link
            href="/fiches/creer-fiche"
            className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
          >
            <Plus className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground mb-6">
            {savedFiches.length} fiche{savedFiches.length !== 1 ? "s" : ""} sauvegardée{savedFiches.length !== 1 ? "s" : ""}
          </p>

          <div className="space-y-8">
            {filteredFiches.length === 0 ? (
              <div className="text-center py-16 bg-background/60 backdrop-blur border border-border rounded-3xl">
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
                    {dateGroup.items.map((fiche) => (
                      <Link
                        key={fiche.id}
                        href="/fiches/revision"
                        onClick={() => handleFicheClick(fiche.ficheKey)}
                        className="block rounded-2xl bg-background/60 backdrop-blur border border-border hover:shadow-xl transition-all overflow-hidden group"
                      >
                        <div className="px-4 py-2" style={{ backgroundColor: fiche.colors.bgColor }}>
                          <p className="text-sm font-semibold" style={{ color: fiche.colors.color }}>
                            {fiche.subject} — {fiche.title}
                          </p>
                        </div>
                        <div className="px-4 py-4 flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                            style={{ backgroundColor: fiche.colors.bgColor }}
                          >
                            {fiche.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-0.5">{formatTime(fiche.createdAt)}</p>
                            <p className="font-semibold truncate">{fiche.title}</p>
                            <p className="text-xs text-muted-foreground">Généré par IA</p>
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
                    ))}
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
            className="relative bg-background rounded-t-[2rem] md:rounded-[2rem] w-full md:max-w-md overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-background border-b border-border px-6 py-5">
              <h3 className="text-xl font-bold">Filtrer par matière</h3>
            </div>
            <div className="p-6 space-y-2 max-h-[70vh] overflow-y-auto">
              <button
                onClick={() => { setSelectedSubject("Toutes"); setIsSubjectModalOpen(false) }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  selectedSubject === "Toutes" ? "bg-muted" : "hover:bg-muted"
                }`}
              >
                <div className="text-3xl">📚</div>
                <span className="font-semibold flex-1 text-left">Toutes les matières</span>
                {selectedSubject === "Toutes" && <Check className="w-5 h-5 text-purple-500" />}
              </button>
              {subjects.map((subject) => (
                <button
                  key={subject.name}
                  onClick={() => { setSelectedSubject(subject.name); setIsSubjectModalOpen(false) }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-muted"
                  style={{ backgroundColor: selectedSubject === subject.name ? subject.bgColor : undefined }}
                >
                  <div className="text-3xl">{subject.icon}</div>
                  <span className="font-semibold flex-1 text-left" style={{ color: subject.color }}>
                    {subject.name}
                  </span>
                  {selectedSubject === subject.name && <Check className="w-5 h-5" style={{ color: subject.color }} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function buildFicheItem(
  fiche: SavedFiche,
  colors: { color: string; bgColor: string }
) {
  const date = new Date(fiche.createdAt)
  return {
    id: `fiche-${date.getTime()}`,
    ficheKey: fiche.ficheKey || `generatedFicheData_${date.getTime()}`,
    subject: fiche.subject,
    title: fiche.chapter,
    icon: fiche.subjectIcon,
    createdAt: fiche.createdAt,
    colors,
  }
}
