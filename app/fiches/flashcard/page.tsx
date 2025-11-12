"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, X, ChevronDown } from "lucide-react"
import Link from "next/link"

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

  const subjects = [
    { name: "Mathématiques", icon: "📐", color: "from-[#C8D8FF] to-[#D8E4FF]" },
    { name: "Physique-Chimie", icon: "⚗️", color: "from-[#D8C8FF] to-[#E8D8FF]" },
    { name: "SVT", icon: "🌿", color: "from-[#D0F0E0] to-[#E0F8E8]" },
    { name: "Français", icon: "📚", color: "from-[#FFD8D8] to-[#FFE8E8]" },
  ]

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F0FF] via-[#FAF5FF] to-[#FFF8FF] flex flex-col">
      <header className="bg-white px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between sticky top-0 z-20 border-b border-gray-100 shadow-md">
        <Link href="/fiches/revision" className="p-1.5 sm:p-2 -ml-1.5 sm:-ml-2">
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-center min-w-0">
          <Link href="/">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dinobot-logo-FNB6LHXRYN4MNMmqlZz3BvbXUAwPPz.png"
              alt="Dinobot"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
            />
          </Link>
          <button
            onClick={() => setSubjectSelectorOpen(true)}
            className="bg-gradient-to-r from-[#6B8EFF] to-[#8BADFF] hover:from-[#5B7FFF] hover:to-[#7B9FFF] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-1.5 sm:gap-2 transition-all shadow-lg hover:shadow-xl truncate"
          >
            <span className="truncate">{selectedSubject}</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          </button>
        </div>
      </header>

      <div className="bg-gradient-to-r from-[#D8C8FF] to-[#E8D8FF] px-3 sm:px-4 py-3 sm:py-4 flex gap-2 sm:gap-3 justify-center sticky top-[49px] sm:top-[73px] z-10 overflow-x-auto">
        <Link
          href="/fiches/revision"
          className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all bg-[#E8D8FF] text-purple-700 hover:bg-[#F0E4FF] whitespace-nowrap"
        >
          Fiche
        </Link>
        <Link
          href="/fiches/revision"
          className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all bg-[#E8D8FF] text-purple-700 hover:bg-[#F0E4FF] whitespace-nowrap"
        >
          Infos clés
        </Link>
        <button className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all bg-white text-purple-700 shadow-md whitespace-nowrap">
          Flashcards
        </button>
      </div>

      <div className="px-3 sm:px-4 py-3 sm:py-4 bg-gradient-to-b from-[#F0E4FF] to-transparent border-b border-purple-100">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
          {generatedData?.chapter || "Acides et bases"}
        </h1>
      </div>

      <main className="flex-1 px-3 sm:px-4 py-4 sm:py-6 pb-20 sm:pb-24 overflow-y-auto bg-white">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Les cartes mémos de DinoBot</h2>

        {flashcards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="text-6xl mb-4">🦖</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Aucune flashcard disponible</h3>
            <p className="text-gray-600 text-center mb-6">
              Génère d'abord du contenu depuis le formulaire de création de fiche.
            </p>
            <Link
              href="/fiches/creer-fiche/database"
              className="bg-gradient-to-r from-[#6B8EFF] to-[#8BADFF] hover:from-[#5B7FFF] hover:to-[#7B9FFF] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Créer une fiche
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-4 text-center">
              <span className="text-sm sm:text-base font-semibold text-purple-600">
                Carte {currentFlashcard + 1} sur {flashcards.length}
              </span>
            </div>

        <div className="relative mb-4 sm:mb-6">
          <div
            onClick={handleFlashcardClick}
            className="cursor-pointer perspective-1000"
            style={{ minHeight: "280px" }}
          >
            <div
              className={`relative w-full transition-transform duration-500 transform-style-3d ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <div
                className="absolute inset-0 backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div className="bg-white border-4 border-[#C8D8FF] rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col items-center justify-center min-h-[280px] sm:min-h-[320px]">
                  <div className="text-xs sm:text-sm font-bold text-purple-500 mb-3 sm:mb-4 uppercase tracking-wide">
                    Question
                  </div>
                  <p className="text-base sm:text-lg font-semibold text-gray-900 text-center leading-relaxed">
                    {flashcards[currentFlashcard].question}
                  </p>
                  <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500 italic">
                    Cliquez pour voir la réponse
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-0 backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="bg-gradient-to-br from-[#C8D8FF] to-[#D8E4FF] rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col items-center justify-center min-h-[280px] sm:min-h-[320px]">
                  <div className="text-xs sm:text-sm font-bold text-blue-700 mb-3 sm:mb-4 uppercase tracking-wide">
                    Réponse
                  </div>
                  <p className="text-base sm:text-lg font-medium text-slate-800 text-center leading-relaxed">
                    {flashcards[currentFlashcard].answer}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrevFlashcard()
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNextFlashcard()
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 rotate-180" />
          </button>
        </div>

        <div className="flex justify-center gap-1.5 mb-6 sm:mb-8 flex-wrap">
          {flashcards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentFlashcard(index)
                setIsFlipped(false)
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentFlashcard ? "bg-gray-800" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 sm:p-6 border border-purple-100">
          <h3 className="font-bold text-sm sm:text-base text-purple-900 mb-2 sm:mb-3">💡 Conseils de révision</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-purple-800">
            <li>✓ Révisez régulièrement pour mieux mémoriser</li>
            <li>✓ Essayez de répondre avant de retourner la carte</li>
            <li>✓ Notez les cartes difficiles pour y revenir</li>
          </ul>
        </div>
          </>
        )}
      </main>

      {subjectSelectorOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
          <div className="bg-white w-full md:max-w-md md:rounded-2xl rounded-t-2xl p-6 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Choisis ta matière</h3>
              <button onClick={() => setSubjectSelectorOpen(false)} className="p-2 -mr-2">
                <X className="w-5 h-5 text-gray-600" />
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
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    selectedSubject === subject.name
                      ? "bg-gradient-to-r " + subject.color + " shadow-lg"
                      : "bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                    {subject.icon}
                  </div>
                  <span className="font-bold text-lg text-slate-900">{subject.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
