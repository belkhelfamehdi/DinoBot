"use client"

import { useState, useEffect, type TouchEvent } from "react"
import { ChevronLeft, MoreVertical, X, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

interface GeneratedData {
  subject: string
  chapter: string
  revision: {
    definitions: Array<{ title: string; definition: string }>
    formulas: Array<{ title: string; explanation: string; example: string }>
    examples: Array<{ question: string; resolution?: string[]; answer: string }>
    revisionCards: Array<{ title: string; methods: string[] }>
    errors: Array<{ title: string; advice: string }>
  }
}

export default function CoursePage() {
  const [selectedSubject, setSelectedSubject] = useState("Physique-Chimie")
  const [activeSubTab, setActiveSubTab] = useState<"fiche" | "infos">("fiche")
  const [subjectSelectorOpen, setSubjectSelectorOpen] = useState(false)
  const [section1Open, setSection1Open] = useState(true)
  const [section2Open, setSection2Open] = useState(true)

  const [exemplesOpen, setExemplesOpen] = useState(true)
  const [currentExampleCard, setCurrentExampleCard] = useState(0)
  const [definitionsOpen, setDefinitionsOpen] = useState(true)
  const [currentDefinitionCard, setCurrentDefinitionCard] = useState(0)
  const [formulesOpen, setFormulesOpen] = useState(true)
  const [currentFormulaCard, setCurrentFormulaCard] = useState(0)
  const [conseilsOpen, setConseilsOpen] = useState(true)
  const [currentRevisionCard, setCurrentRevisionCard] = useState(0)
  const [demonstrationsOpen, setDemonstrationsOpen] = useState(true)
  const [currentDemoCard, setCurrentDemoCard] = useState(0)
  const [erreursOpen, setErreursOpen] = useState(true)
  const [currentErrorCard, setCurrentErrorCard] = useState(0)
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null)

  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    const savedData = sessionStorage.getItem('generatedFicheData')
    if (savedData) {
      const data = JSON.parse(savedData)
      setGeneratedData(data)
      setSelectedSubject(data.subject || "Physique-Chimie")
    }
  }, [])

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (currentCard: number, setCard: (n: number) => void, totalCards: number) => {
    if (touchStart - touchEnd > 75) {
      // Swiped left
      if (currentCard < totalCards - 1) {
        setCard(currentCard + 1)
      }
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right
      if (currentCard > 0) {
        setCard(currentCard - 1)
      }
    }
  }

  const subjects = [
    { name: "Mathématiques", icon: "📐", color: "from-[#C8D8FF] to-[#D8E4FF]" },
    { name: "Physique-Chimie", icon: "⚗️", color: "from-[#D8C8FF] to-[#E8D8FF]" },
    { name: "SVT", icon: "🌿", color: "from-[#D0F0E0] to-[#E0F8E8]" },
    { name: "Français", icon: "📚", color: "from-[#FFD8D8] to-[#FFE8E8]" },
  ]

  const exampleCards = generatedData?.revision.examples.map(ex => ({
    title: ex.question,
    problem: "",
    resolution: ex.resolution || [],
    answer: ex.answer
  })) || []

  const formulaCards = generatedData?.revision.formulas || []

  const revisionCards = generatedData?.revision.revisionCards || []

  const demoCards: Array<{
    title: string
    hypotheses: string[]
    demonstration: string[]
    application: string
  }> = []

  const definitionCards = generatedData?.revision.definitions || []

  const errorCards = generatedData?.revision.errors || []

  const hasAnyData = exampleCards.length > 0 || 
                     formulaCards.length > 0 || 
                     revisionCards.length > 0 || 
                     demoCards.length > 0 || 
                     definitionCards.length > 0 || 
                     errorCards.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F0FF] via-[#FAF5FF] to-[#FFF8FF] flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 border-b border-gray-100 shadow-md">
        <Link href="/fiches" className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </Link>

        <div className="flex items-center gap-3 flex-1 justify-center">

        </div>

        <button className="p-2 -mr-2 opacity-0 pointer-events-none">
          <MoreVertical className="w-6 h-6 text-gray-900" />
        </button>
      </header>

      <div className="bg-gradient-to-r from-[#D8C8FF] to-[#E8D8FF] px-4 py-4 flex gap-3 justify-center sticky top-[57px] z-10 shadow-md">
        <button
          onClick={() => setActiveSubTab("fiche")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeSubTab === "fiche"
              ? "bg-white text-purple-700 shadow-md"
              : "bg-[#E8D8FF] text-purple-700 hover:bg-[#F0E4FF]"
          }`}
        >
          Fiche
        </button>
        <button
          onClick={() => setActiveSubTab("infos")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeSubTab === "infos"
              ? "bg-white text-purple-700 shadow-md"
              : "bg-[#E8D8FF] text-purple-700 hover:bg-[#F0E4FF]"
          }`}
        >
          Savoir faire
        </button>
        <Link
          href="/fiches/flashcard"
          className="px-5 py-2 rounded-full text-sm font-medium transition-all bg-[#E8D8FF] text-purple-700 hover:bg-[#F0E4FF]"
        >
          Flashcards
        </Link>
      </div>

      <div className="px-4 py-4 bg-gradient-to-b from-[#F0E4FF] to-transparent border-b border-purple-100">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          {generatedData?.chapter || "Acides et bases"}
        </h1>
      </div>

      <main className="flex-1 px-4 py-6 pb-24 overflow-y-auto bg-white">
        {activeSubTab === "fiche" && (
          <>
            {generatedData ? (
              <>
                {/* Section 1: Définitions */}
                <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
                  <button
                    onClick={() => setSection1Open(!section1Open)}
                    className="w-full flex items-center justify-between gap-3 mb-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-blue-500">1.</span>
                      <h2 className="text-base font-bold text-gray-900 uppercase tracking-tight">
                        RÉFÉRENCES ET DÉFINITIONS
                      </h2>
                    </div>
                    {section1Open ? (
                      <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    )}
                  </button>

                  {section1Open && (
                    <div className="space-y-4 mt-4">
                      {definitionCards.map((def, idx) => (
                        <div key={idx}>
                          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase">{def.title}</h3>
                          <ul className="space-y-3 text-sm text-gray-800">
                            <li className="leading-relaxed">
                              - {def.definition}
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Section 2: Formules */}
                <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
                  <button
                    onClick={() => setSection2Open(!section2Open)}
                    className="w-full flex items-center justify-between gap-3 mb-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-purple-500">2.</span>
                      <h2 className="text-base font-bold text-gray-900 uppercase tracking-tight">FORMULES ET CALCULS</h2>
                    </div>
                    {section2Open ? (
                      <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    )}
                  </button>

                  {section2Open && (
                    <div className="space-y-4 mt-4">
                      {formulaCards.map((formula, idx) => (
                        <div key={idx}>
                          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase">{formula.title}</h3>
                          <ul className="space-y-3 text-sm text-gray-800">
                            <li className="leading-relaxed">
                              - {formula.explanation}
                              {formula.example && (
                                <div className="my-2 pl-4">
                                  <span className="text-purple-500 font-medium">{formula.example}</span>
                                </div>
                              )}
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="text-6xl mb-4">🦖</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Aucune fiche générée</h3>
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
            )}
          </>
        )}

        {activeSubTab === "infos" && (
          <>
            {!hasAnyData ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="text-6xl mb-4">🦖</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Aucun contenu disponible</h3>
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
            <div className="mb-6">
              <button
                onClick={() => setExemplesOpen(!exemplesOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-xl font-bold text-gray-900">Exemples</h2>
                {exemplesOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {exemplesOpen && (
                <div className="relative">
                  <div
                    className="overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => handleTouchEnd(currentExampleCard, setCurrentExampleCard, exampleCards.length)}
                  >
                    <div
                      className="flex transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${currentExampleCard * 100}%)` }}
                    >
                      {exampleCards.map((card, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-1">
                          <div className="bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] rounded-t-2xl p-4">
                            <h3 className="font-bold text-base leading-snug text-slate-800">
                              {card.title}{card.problem ? `: ${card.problem}` : ""}
                            </h3>
                          </div>
                          <div className="bg-white rounded-b-2xl p-4 border border-t-0 border-gray-200 shadow-sm">
                            {card.resolution.length > 0 && (
                              <>
                                <h4 className="font-bold text-sm text-gray-900 mb-2">Résolution</h4>
                                <div className="text-xs text-gray-700 space-y-1 mb-4">
                                  {card.resolution.map((line, i) => (
                                    <p key={i} className="leading-relaxed">
                                      {line}
                                    </p>
                                  ))}
                                </div>
                              </>
                            )}
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Réponse</h4>
                            <p className="text-xs text-gray-700 leading-relaxed">{card.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {exampleCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentExampleCard(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentExampleCard ? "bg-gray-800" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <button
                onClick={() => setDefinitionsOpen(!definitionsOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-xl font-bold text-gray-900">Définitions clés</h2>
                {definitionsOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {definitionsOpen && (
                <div className="relative">
                  <div
                    className="overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() =>
                      handleTouchEnd(currentDefinitionCard, setCurrentDefinitionCard, definitionCards.length)
                    }
                  >
                    <div
                      className="flex transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${currentDefinitionCard * 100}%)` }}
                    >
                      {definitionCards.map((card, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-1">
                          <div className="bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] rounded-t-2xl p-4">
                            <h3 className="font-bold text-base leading-snug text-slate-800">{card.title}</h3>
                          </div>
                          <div className="bg-white rounded-b-2xl p-4 border border-t-0 border-gray-200 shadow-sm">
                            <p className="text-sm text-gray-700 leading-relaxed">{card.definition}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {definitionCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentDefinitionCard(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentDefinitionCard ? "bg-gray-800" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <button
                onClick={() => setFormulesOpen(!formulesOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-xl font-bold text-gray-900">Formules importantes</h2>
                {formulesOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {formulesOpen && (
                <div className="relative">
                  <div
                    className="overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => handleTouchEnd(currentFormulaCard, setCurrentFormulaCard, formulaCards.length)}
                  >
                    <div
                      className="flex transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${currentFormulaCard * 100}%)` }}
                    >
                      {formulaCards.map((card, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-1">
                          <div className="bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] rounded-t-2xl p-4">
                            <h3 className="font-bold text-base leading-snug text-slate-800">{card.title}</h3>
                          </div>
                          <div className="bg-white rounded-b-2xl p-4 border border-t-0 border-gray-200 shadow-sm">
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Explication</h4>
                            <p className="text-xs text-gray-700 leading-relaxed mb-3">{card.explanation}</p>
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Exemple concret</h4>
                            <p className="text-xs text-gray-700 leading-relaxed">{card.example}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {formulaCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentFormulaCard(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentFormulaCard ? "bg-gray-800" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <button
                onClick={() => setConseilsOpen(!conseilsOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-xl font-bold text-gray-900">Conseils de révision</h2>
                {conseilsOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {conseilsOpen && (
                <div className="relative">
                  <div
                    className="overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => handleTouchEnd(currentRevisionCard, setCurrentRevisionCard, revisionCards.length)}
                  >
                    <div
                      className="flex transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${currentRevisionCard * 100}%)` }}
                    >
                      {revisionCards.map((card, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-1">
                          <div className="bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] rounded-t-2xl p-4">
                            <h3 className="font-bold text-sm leading-snug text-slate-800">{card.title}</h3>
                          </div>
                          <div className="bg-white rounded-b-2xl p-4 border border-t-0 border-gray-200 shadow-sm">
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Méthodes recommandées</h4>
                            <ul className="space-y-2">
                              {card.methods.map((method, i) => (
                                <li key={i} className="text-xs text-gray-700 leading-relaxed flex gap-2">
                                  <span className="flex-shrink-0">•</span>
                                  <span>{method}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {revisionCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentRevisionCard(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentRevisionCard ? "bg-gray-800" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <button
                onClick={() => setDemonstrationsOpen(!demonstrationsOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-xl font-bold text-gray-900">Démonstrations clés</h2>
                {demonstrationsOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {demonstrationsOpen && (
                <div className="relative">
                  <div
                    className="overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => handleTouchEnd(currentDemoCard, setCurrentDemoCard, demoCards.length)}
                  >
                    <div
                      className="flex transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${currentDemoCard * 100}%)` }}
                    >
                      {demoCards.map((card, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-1">
                          <div className="bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] rounded-t-2xl p-4">
                            <h3 className="font-bold text-base leading-snug text-slate-800">{card.title}</h3>
                          </div>
                          <div className="bg-white rounded-b-2xl p-4 border border-t-0 border-gray-200 shadow-sm">
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Hypothèses</h4>
                            <ul className="space-y-1 mb-3">
                              {card.hypotheses.map((hyp, i) => (
                                <li key={i} className="text-xs text-gray-700 leading-relaxed flex gap-2">
                                  <span className="flex-shrink-0">•</span>
                                  <span>{hyp}</span>
                                </li>
                              ))}
                            </ul>
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Démonstration</h4>
                            <div className="text-xs text-gray-700 space-y-1 mb-3">
                              {card.demonstration.map((line, i) => (
                                <p key={i} className="leading-relaxed">
                                  {line}
                                </p>
                              ))}
                            </div>
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Application</h4>
                            <p className="text-xs text-gray-700 leading-relaxed">{card.application}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {demoCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentDemoCard(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentDemoCard ? "bg-gray-800" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <button
                onClick={() => setErreursOpen(!erreursOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-xl font-bold text-gray-900">Erreurs fréquentes</h2>
                {erreursOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {erreursOpen && (
                <div className="relative">
                  <div
                    className="overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => handleTouchEnd(currentErrorCard, setCurrentErrorCard, errorCards.length)}
                  >
                    <div
                      className="flex transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${currentErrorCard * 100}%)` }}
                    >
                      {errorCards.map((card, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-1">
                          <div className="bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] rounded-t-2xl p-4">
                            <h3 className="font-bold text-base leading-snug text-slate-800">{card.title}</h3>
                          </div>
                          <div className="bg-white rounded-b-2xl p-4 border border-t-0 border-gray-200 shadow-sm">
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Le conseil de DinoBot</h4>
                            <p className="text-xs text-gray-700 leading-relaxed">{card.advice}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {errorCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentErrorCard(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentErrorCard ? "bg-gray-800" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
              </>
            )}
          </>
        )}
      </main>

      {subjectSelectorOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
          <div className="bg-white w-full md:max-w-md md:rounded-2xl rounded-t-2xl p-6 animate-in slide-in-from-bottom md:slide-in-from-bottom-0">
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
                      ? "bg-gradient-to-r " + subject.color + " text-white shadow-lg"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-900"
                  }`}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                    {subject.icon}
                  </div>
                  <span className="font-bold text-lg">{subject.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
