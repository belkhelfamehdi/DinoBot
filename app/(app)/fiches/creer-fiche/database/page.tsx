"use client"

import { useState, Suspense } from "react"
import { BookOpen, FileText, X, Sparkles, Loader2, ChevronDown } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCourses } from "@/hooks/use-courses"
import { toast } from "sonner"

function DatabaseGeneratorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { getSubjectById, getSubjectByName, getChaptersBySubject, getPartsByChapter } = useCourses()

  const subjectParam = searchParams.get("subject") || "chimie"
  const subject = getSubjectById(subjectParam) ?? getSubjectByName(subjectParam) ?? getSubjectById("chimie")
  const subjectId = subject?.id || "chimie"
  const chapters = getChaptersBySubject(subjectId)

  const [selectedChapter, setSelectedChapter] = useState(chapters[0]?.id || "")
  const [selectedParts, setSelectedParts] = useState<string[]>([])
  const [showPartsDropdown, setShowPartsDropdown] = useState(false)
  const [difficulty, setDifficulty] = useState(2)
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)

  const availableParts = getPartsByChapter(subjectId, selectedChapter)

  const addPart = (partId: string) => {
    if (!selectedParts.includes(partId)) setSelectedParts((prev) => [...prev, partId])
    setShowPartsDropdown(false)
  }

  const removePart = (partId: string) => setSelectedParts((prev) => prev.filter((id) => id !== partId))

  const handleGenerate = async () => {
    if (selectedParts.length === 0) { toast.error("Sélectionne au moins une partie"); return }
    setLoading(true)
    try {
      const selectedChapterData = chapters.find((ch) => ch.id === selectedChapter)
      const selectedPartsData = availableParts.filter((p) => selectedParts.includes(p.id))
      const response = await fetch("/api/chat-fiche", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cours: subject?.name || "Chimie",
          chapitre: selectedChapterData?.name || "",
          parties: selectedPartsData.map((p) => p.name),
          difficulte: difficulty,
          promptPerso: prompt || undefined,
        }),
      })
      const data = await response.json()
      if (data.success) {
        const timestamp = Date.now()
        const ficheKey = `generatedFicheData_${timestamp}`
        const ficheData = JSON.stringify({
          subject: subject?.name,
          subjectId: subject?.id,
          subjectIcon: subject?.icon,
          subjectColor: subject?.color,
          subjectBgColor: subject?.bgColor,
          chapter: selectedChapterData?.name,
          parts: selectedPartsData.map((p) => p.name),
          difficulty,
          revision: data.data.revision,
          flashcards: data.data.flashcards,
          quiz: data.data.quiz,
          createdAt: new Date().toISOString(),
        })
        localStorage.setItem(ficheKey, ficheData)
        localStorage.setItem("generatedFicheData", ficheData)
        toast.success("Fiche générée avec succès !")
        router.push("/fiches/revision")
      } else {
        toast.error("Erreur lors de la génération")
      }
    } catch {
      toast.error("Erreur de connexion au serveur")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                {subject?.icon} {subject?.name}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Configure ta fiche</h1>
            <p className="text-muted-foreground">Personnalise les paramètres de génération</p>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-background/60 backdrop-blur border border-border">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <BookOpen className="w-4 h-4 text-purple-500" />
                Chapitre
              </label>
              <select
                value={selectedChapter}
                onChange={(e) => { setSelectedChapter(e.target.value); setSelectedParts([]) }}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
              >
                {chapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>{chapter.name}</option>
                ))}
              </select>
            </div>

            <div className="p-6 rounded-2xl bg-background/60 backdrop-blur border border-border">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <FileText className="w-4 h-4 text-purple-500" />
                Parties à inclure
              </label>
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2 px-4 py-3 rounded-xl bg-background border border-border min-h-[52px]">
                  {selectedParts.length === 0 && (
                    <span className="text-sm text-muted-foreground">Aucune partie sélectionnée</span>
                  )}
                  {selectedParts.map((partId) => {
                    const part = availableParts.find((p) => p.id === partId)
                    return (
                      <span key={partId} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-700 text-sm font-medium">
                        {part?.name}
                        <button onClick={() => removePart(partId)} className="hover:bg-purple-200 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )
                  })}
                  <button
                    onClick={() => setShowPartsDropdown(!showPartsDropdown)}
                    className="ml-auto p-1.5 hover:bg-muted rounded-lg transition-colors"
                  >
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                {showPartsDropdown && (
                  <div className="absolute z-10 w-full mt-2 rounded-xl bg-background/95 backdrop-blur border border-border overflow-hidden shadow-xl">
                    {availableParts
                      .filter((part) => !selectedParts.includes(part.id))
                      .map((part) => (
                        <button
                          key={part.id}
                          onClick={() => addPart(part.id)}
                          className="w-full px-4 py-3 text-left hover:bg-muted transition-colors text-sm"
                        >
                          {part.name}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-background/60 backdrop-blur border border-border">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Difficulté
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range" min="1" max="3" value={difficulty}
                  onChange={(e) => setDifficulty(Number(e.target.value))}
                  className="flex-1 accent-purple-500"
                />
                <div className="flex gap-1">
                  {[1, 2, 3].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                        difficulty === level
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {difficulty === 1 ? "Niveau débutant" : difficulty === 2 ? "Niveau intermédiaire" : "Niveau avancé"}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background/60 backdrop-blur border border-border">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Prompt personnalisé{" "}
                <span className="text-muted-foreground text-xs font-normal">(optionnel)</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ajoute des instructions spécifiques pour la génération..."
                maxLength={1000}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none min-h-[120px] resize-none transition-all"
              />
              <div className="text-right text-xs text-muted-foreground mt-1">{prompt.length}/1000</div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || selectedParts.length === 0}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Génération en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Générer ma fiche
                </span>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DatabaseGeneratorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
          <span className="text-muted-foreground">Chargement...</span>
        </div>
      </div>
    }>
      <DatabaseGeneratorContent />
    </Suspense>
  )
}
