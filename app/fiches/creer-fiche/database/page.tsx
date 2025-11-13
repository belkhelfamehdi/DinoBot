"use client"

import { useState, Suspense } from "react"
import { BookOpen, FileText, ChevronDown, X, Sparkles } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useCourses } from "@/hooks/use-courses"

function DatabaseGeneratorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { getSubjectById, getSubjectByName, getChaptersBySubject, getPartsByChapter } = useCourses()

  // Récupérer la matière depuis les paramètres URL (nom ou ID)
  const subjectParam = searchParams.get('subject') || 'chimie'
  
  // Essayer d'abord par ID, puis par nom
  let subject = getSubjectById(subjectParam)
  if (!subject) {
    subject = getSubjectByName(subjectParam)
  }
  // Si toujours pas trouvé, utiliser chimie par défaut
  if (!subject) {
    subject = getSubjectById('chimie')
  }
  
  const subjectId = subject?.id || 'chimie'
  const chapters = getChaptersBySubject(subjectId)

  const [selectedChapter, setSelectedChapter] = useState(chapters[0]?.id || "")
  const [selectedParts, setSelectedParts] = useState<string[]>([])
  const [showPartsDropdown, setShowPartsDropdown] = useState(false)
  const [difficulty, setDifficulty] = useState(2)
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)

  const availableParts = getPartsByChapter(subjectId, selectedChapter)

  const addPart = (partId: string) => {
    if (!selectedParts.includes(partId)) {
      setSelectedParts([...selectedParts, partId])
    }
    setShowPartsDropdown(false)
  }

  const removePart = (partId: string) => {
    setSelectedParts(selectedParts.filter((id) => id !== partId))
  }

  const handleGenerate = async () => {
    if (selectedParts.length === 0) {
      alert("Veuillez sélectionner au moins une partie")
      return
    }

    setLoading(true)
    try {
      const selectedChapterData = chapters.find(ch => ch.id === selectedChapter)
      const selectedPartsData = availableParts.filter(p => selectedParts.includes(p.id))

      const response = await fetch('/api/chat-fiche', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cours: subject?.name || 'Chimie',
          chapitre: selectedChapterData?.name || '',
          parties: selectedPartsData.map(p => p.name),
          difficulte: difficulty,
          promptPerso: prompt || undefined
        })
      })

      const data = await response.json()

      if (data.success) {
        const timestamp = Date.now()
        const ficheKey = `generatedFicheData_${timestamp}`
        
        // Stocker les données générées pour les pages revision et flashcard
        sessionStorage.setItem(ficheKey, JSON.stringify({
          subject: subject?.name,
          subjectId: subject?.id,
          subjectIcon: subject?.icon,
          subjectColor: subject?.color,
          subjectBgColor: subject?.bgColor,
          chapter: selectedChapterData?.name,
          parts: selectedPartsData.map(p => p.name),
          difficulty: difficulty,
          revision: data.data.revision,
          flashcards: data.data.flashcards,
          quiz: data.data.quiz,
          createdAt: new Date().toISOString()
        }))
        
        // Stocker aussi comme clé active pour les pages de visualisation
        sessionStorage.setItem('generatedFicheData', sessionStorage.getItem(ficheKey) || '')
        
        // Rediriger vers la page de révision
        router.push('/fiches/revision')
      } else {
        alert('Erreur lors de la génération de la fiche')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

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
          <h1 className="text-sm sm:text-base md:text-lg font-bold text-slate-800 truncate">
            Créer depuis la base de données
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-5 sm:p-8 space-y-6 sm:space-y-8">
            <div className="text-center pb-3 sm:pb-4 border-b border-slate-200">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1 sm:mb-2">
                Configuration de votre fiche
              </h3>
              <p className="text-sm sm:text-base text-slate-600">Personnalisez les paramètres de génération</p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-semibold text-slate-700">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                Choisir un Chapitre
              </label>
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-2xl bg-white shadow-md border-2 border-purple-100 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all hover:shadow-lg"
              >
                {chapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-semibold text-slate-700">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                Partie
              </label>
              <div className="relative">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-white shadow-md border-2 border-purple-100 min-h-[52px] sm:min-h-[56px] transition-all hover:shadow-lg">
                  {selectedParts.map((partId) => {
                    const part = availableParts.find((p) => p.id === partId)
                    return (
                      <span
                        key={partId}
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#D8C8FF] to-[#E8D8FF] text-purple-700 rounded-full text-xs sm:text-sm font-medium shadow-sm"
                      >
                        <span className="leading-tight">{part?.name}</span>
                        <button
                          className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                          onClick={() => removePart(partId)}
                        >
                          <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                      </span>
                    )
                  })}
                  <button
                    onClick={() => setShowPartsDropdown(!showPartsDropdown)}
                    className="ml-auto p-1 sm:p-1.5 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  </button>
                </div>

                {showPartsDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-purple-100 overflow-hidden">
                    {availableParts
                      .filter((part) => !selectedParts.includes(part.id))
                      .map((part) => (
                        <button
                          key={part.id}
                          onClick={() => addPart(part.id)}
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-left text-sm sm:text-base hover:bg-purple-50 transition-colors font-medium text-slate-700"
                        >
                          {part.name}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-semibold text-slate-700">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                Difficulté
              </label>
              <div className="flex items-center gap-3 sm:gap-5 bg-white rounded-2xl p-3 sm:p-4 shadow-md border-2 border-purple-100">
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={difficulty}
                  onChange={(e) => setDifficulty(Number(e.target.value))}
                  className="flex-1 accent-purple-500 h-2 rounded-full"
                />
                <span className="text-base sm:text-lg font-bold text-purple-600 min-w-[2.5rem] sm:min-w-[3rem] text-center bg-purple-50 px-2 sm:px-3 py-1 rounded-full">
                  {difficulty}/3
                </span>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-semibold text-slate-700">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                Personnaliser avec un prompt <span className="text-slate-500 text-xs font-normal">(optionnel)</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Rédigez ici vos instructions personnalisées..."
                maxLength={1000}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-2xl bg-white shadow-md border-2 border-purple-100 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none min-h-[120px] sm:min-h-[140px] resize-none transition-all hover:shadow-lg"
              />
              <div className="text-right text-xs sm:text-sm text-slate-500 font-medium">
                {prompt.length}/1000 caractères
              </div>
            </div>

            <div className="flex justify-center pt-4 sm:pt-6">
              <button
                onClick={handleGenerate}
                disabled={loading || selectedParts.length === 0}
                className="group relative bg-gradient-to-r from-[#C8D8FF] via-[#D8E4FF] to-[#E8F0FF] text-[#4B6FFF] px-10 sm:px-14 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="relative flex items-center justify-center gap-2">
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Génération en cours...
                  </span>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative flex items-center justify-center gap-1.5 sm:gap-2">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                      Générer ma fiche
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DatabaseGeneratorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#F5F0FF] via-[#FAF5FF] to-[#FFF8FF] flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 mx-auto mb-4 text-purple-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-slate-600 font-medium">Chargement...</p>
        </div>
      </div>
    }>
      <DatabaseGeneratorContent />
    </Suspense>
  )
}
