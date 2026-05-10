"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, RotateCcw, FlipHorizontal, Lightbulb } from "lucide-react"
import Link from "next/link"
import { coursesData } from "@/data/courses"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface GeneratedData {
  subject: string
  chapter: string
  flashcards: Array<{ question: string; answer: string }>
}

export default function FlashcardPage() {
  const [selectedSubject, setSelectedSubject] = useState("Physique-Chimie")
  const [subjectSelectorOpen, setSubjectSelectorOpen] = useState(false)
  const [currentFlashcard, setCurrentFlashcard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null)

  useEffect(() => {
    const savedData = sessionStorage.getItem('generatedFicheData')
    if (savedData) {
      const data = JSON.parse(savedData)
      setGeneratedData(data)
      setSelectedSubject(data.subject || "Physique-Chimie")
    }
  }, [])

  const subjects = coursesData.subjects.map(subject => ({
    name: subject.name,
    icon: subject.icon,
    bgColor: subject.bgColor,
    color: subject.color
  }))

  const flashcards = generatedData?.flashcards || []

  const handleFlashcardClick = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNextFlashcard = () => {
    setIsFlipped(false)
    setCurrentFlashcard((prev) => (prev + 1) % flashcards.length)
  }

  const handlePrevFlashcard = () => {
    setIsFlipped(false)
    setCurrentFlashcard((prev) => (prev - 1 + flashcards.length) % flashcards.length)
  }

  const handleReset = () => {
    setCurrentFlashcard(0)
    setIsFlipped(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px]" />
      </div>

      <header className="sticky top-0 z-50 glass">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/fiches/revision" className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦕</span>
            <div>
              <div className="font-semibold">Flashcards</div>
              <div className="text-xs text-muted-foreground">{generatedData?.chapter || "Chapitre"}</div>
            </div>
          </div>
          <div className="flex-1" />
          <button
            onClick={() => setSubjectSelectorOpen(true)}
            className="px-4 py-2 rounded-full glass text-sm"
          >
            {selectedSubject}
          </button>
        </div>
      </header>

      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2">
            <Link href="/fiches/revision" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-muted transition-all">
              Fiche
            </Link>
            <button className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              Flashcards
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-4 pb-24">
        {flashcards.length === 0 ? (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🦕</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Aucune flashcard disponible</h3>
            <p className="text-muted-foreground mb-6">
              Génère d'abord du contenu depuis le formulaire
            </p>
            <Link
              href="/fiches/creer-fiche"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
            >
              Créer une fiche
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-lg">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground">
                Carte <span className="font-semibold text-purple-600">{currentFlashcard + 1}</span> sur {flashcards.length}
              </p>
            </div>

            <div className="relative mb-6" style={{ minHeight: "320px" }}>
              <div
                onClick={handleFlashcardClick}
                className="absolute inset-0 cursor-pointer perspective-1000"
              >
                <div
                  className="relative w-full h-full transition-transform duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl glass"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                      <FlipHorizontal className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="text-lg font-medium text-center mb-4 prose prose-sm prose-p:font-medium prose-p:text-center">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{flashcards[currentFlashcard].question}</ReactMarkdown>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cliquez pour voir la réponse
                    </p>
                  </div>

                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <Lightbulb className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="text-lg font-medium text-center prose prose-sm prose-p:font-medium prose-p:text-center">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{flashcards[currentFlashcard].answer}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handlePrevFlashcard(); }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full glass flex items-center justify-center hover:shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNextFlashcard(); }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full glass flex items-center justify-center hover:shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              {flashcards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrentFlashcard(index); setIsFlipped(false); }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentFlashcard ? "bg-purple-500 scale-125" : "bg-muted hover:bg-purple-500/50"
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="p-3 rounded-full glass hover:shadow-lg transition-all"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-purple-500" />
                Conseils de révision
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Révisez régulièrement pour mieux mémoriser
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Essayez de répondre avant de retourner la carte
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Notez les cartes difficiles pour y revenir
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {subjectSelectorOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center"
          onClick={() => setSubjectSelectorOpen(false)}
        >
          <div
            className="bg-background rounded-t-[2rem] md:rounded-[2rem] w-full md:max-w-md p-6 animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Choisis ta matière</h3>
              <button onClick={() => setSubjectSelectorOpen(false)} className="p-2 -mr-2 rounded-full hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {subjects.map((subject) => (
                <button
                  key={subject.name}
                  onClick={() => {
                    setSelectedSubject(subject.name)
                    setSubjectSelectorOpen(false)
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all"
                  style={{
                    backgroundColor: selectedSubject === subject.name ? subject.bgColor : undefined,
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white/50">
                    {subject.icon}
                  </div>
                  <span className="font-semibold text-lg" style={{ color: subject.color }}>
                    {subject.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
