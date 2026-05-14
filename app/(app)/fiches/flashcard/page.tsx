"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, RotateCcw, FlipHorizontal, Lightbulb } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface GeneratedData {
  subject: string
  chapter: string
  flashcards: Array<{ question: string; answer: string }>
}

export default function FlashcardPage() {
  const [currentFlashcard, setCurrentFlashcard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null)

  useEffect(() => {
    const savedData = localStorage.getItem("generatedFicheData")
    if (savedData) setGeneratedData(JSON.parse(savedData))
  }, [])

  const flashcards = generatedData?.flashcards || []

  const handleNextFlashcard = () => {
    setIsFlipped(false)
    setCurrentFlashcard((prev) => (prev + 1) % flashcards.length)
  }

  const handlePrevFlashcard = () => {
    setIsFlipped(false)
    setCurrentFlashcard((prev) => (prev - 1 + flashcards.length) % flashcards.length)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/fiches/revision" className="p-1.5 -ml-1.5 rounded-lg hover:bg-muted transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <p className="font-semibold">Flashcards</p>
            <p className="text-xs text-muted-foreground">{generatedData?.chapter || "Chapitre"}</p>
          </div>
          <div className="flex-1" />
          <div className="flex gap-1">
            <Link href="/fiches/revision" className="px-3 py-1.5 rounded-full text-sm hover:bg-muted text-muted-foreground transition-all">Fiche</Link>
            <span className="px-3 py-1.5 rounded-full text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium">Flashcards</span>
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
            <p className="text-muted-foreground mb-6">Génère d&apos;abord du contenu depuis le formulaire</p>
            <Link
              href="/fiches/creer-fiche"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
            >
              Créer une fiche
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-lg">
            <p className="text-sm text-muted-foreground text-center mb-6">
              Carte <span className="font-semibold text-purple-600">{currentFlashcard + 1}</span> sur {flashcards.length}
            </p>

            <div className="relative mb-6" style={{ minHeight: "320px" }}>
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="absolute inset-0 cursor-pointer"
                style={{ perspective: "1000px" }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-500"
                  style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl bg-background/60 backdrop-blur border border-border"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                      <FlipHorizontal className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="text-lg font-medium text-center mb-4 prose prose-sm dark:prose-invert">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{flashcards[currentFlashcard].question}</ReactMarkdown>
                    </div>
                    <p className="text-sm text-muted-foreground">Cliquez pour voir la réponse</p>
                  </div>
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <Lightbulb className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="text-lg font-medium text-center prose prose-sm dark:prose-invert">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{flashcards[currentFlashcard].answer}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevFlashcard() }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-background/60 backdrop-blur border border-border flex items-center justify-center hover:shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNextFlashcard() }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-background/60 backdrop-blur border border-border flex items-center justify-center hover:shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              {flashcards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrentFlashcard(index); setIsFlipped(false) }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentFlashcard ? "bg-purple-500 scale-125" : "bg-muted hover:bg-purple-500/50"
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-center mb-8">
              <button
                onClick={() => { setCurrentFlashcard(0); setIsFlipped(false) }}
                className="p-3 rounded-full bg-background/60 backdrop-blur border border-border hover:shadow-lg transition-all"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-purple-500" />
                Conseils de révision
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Révisez régulièrement pour mieux mémoriser</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Essayez de répondre avant de retourner la carte</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Notez les cartes difficiles pour y revenir</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
