"use client"

import { useState, useEffect, type TouchEvent } from "react"
import { ChevronLeft, ChevronDown, ChevronUp, Lightbulb } from "lucide-react"
import Link from "next/link"
import { coursesData } from "@/data/courses"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

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
      if (currentCard < totalCards - 1) {
        setCard(currentCard + 1)
      }
    }

    if (touchStart - touchEnd < -75) {
      if (currentCard > 0) {
        setCard(currentCard - 1)
      }
    }
  }

  const subjects = coursesData.subjects.map(subject => ({
    name: subject.name,
    icon: subject.icon,
    bgColor: subject.bgColor,
    color: subject.color
  }))

  const exampleCards = generatedData?.revision.examples.map(ex => ({
    title: ex.question,
    problem: "",
    resolution: ex.resolution || [],
    answer: ex.answer
  })) || []

  const formulaCards = generatedData?.revision.formulas || []
  const revisionCards = generatedData?.revision.revisionCards || []

  const definitionCards = generatedData?.revision.definitions || []
  const errorCards = generatedData?.revision.errors || []

  const hasAnyData = exampleCards.length > 0 ||
    formulaCards.length > 0 ||
    revisionCards.length > 0 ||
    definitionCards.length > 0 ||
    errorCards.length > 0

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px]" />
      </div>

      <header className="sticky top-0 z-50 glass">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/fiches" className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦕</span>
            <div>
              <div className="font-semibold">{generatedData?.chapter || "Chapitre"}</div>
              <div className="text-xs text-muted-foreground">{generatedData?.subject || "Matière"}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveSubTab("fiche")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeSubTab === "fiche"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "hover:bg-muted"
              }`}
            >
              Fiche
            </button>
            <button
              onClick={() => setActiveSubTab("infos")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeSubTab === "infos"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "hover:bg-muted"
              }`}
            >
              Infos clés
            </button>
            <Link
              href="/fiches/flashcard"
              className="px-4 py-2 rounded-full text-sm font-medium hover:bg-muted transition-all"
            >
              Flashcards
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 px-4 py-6 pb-24">
        {activeSubTab === "fiche" && (
          <>
            {generatedData ? (
              <div className="max-w-3xl mx-auto space-y-4">
                <div className="p-6 rounded-2xl glass">
                  <button
                    onClick={() => setSection1Open(!section1Open)}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">1</span>
                      <h2 className="font-bold uppercase tracking-tight">Définitions</h2>
                    </div>
                    {section1Open ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>

                  {section1Open && (
                    <div className="mt-4 space-y-4">
                      {definitionCards.map((def, idx) => (
                        <div key={idx} className="pl-13">
                          <h3 className="font-semibold mb-2">{def.title}</h3>
                          <div className="text-sm text-muted-foreground prose prose-sm prose-headings:font-semibold prose-p:text-muted-foreground">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{def.definition}</ReactMarkdown>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6 rounded-2xl glass">
                  <button
                    onClick={() => setSection2Open(!section2Open)}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-lg">2</span>
                      <h2 className="font-bold uppercase tracking-tight">Formules</h2>
                    </div>
                    {section2Open ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>

                  {section2Open && (
                    <div className="mt-4 space-y-4">
                      {formulaCards.map((formula, idx) => (
                        <div key={idx} className="pl-13">
                          <h3 className="font-semibold mb-2">{formula.title}</h3>
                          <div className="text-sm text-muted-foreground mb-2 prose prose-sm prose-p:text-muted-foreground">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{formula.explanation}</ReactMarkdown>
                          </div>
                          {formula.example && (
                            <div className="text-sm font-medium text-purple-600 bg-purple-500/10 inline-block px-3 py-1.5 rounded-xl prose prose-sm prose-p:text-purple-600 prose-p:mb-0">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>{formula.example}</ReactMarkdown>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto text-center py-16">
                <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🦕</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Aucune fiche générée</h3>
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
            )}
          </>
        )}

        {activeSubTab === "infos" && (
          <>
            {!hasAnyData ? (
              <div className="max-w-3xl mx-auto text-center py-16">
                <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🦕</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Aucun contenu disponible</h3>
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
              <div className="max-w-3xl mx-auto space-y-6">
                {exampleCards.length > 0 && (
                  <div className="p-6 rounded-2xl glass">
                    <button
                      onClick={() => setExemplesOpen(!exemplesOpen)}
                      className="w-full flex items-center justify-between mb-4"
                    >
                      <h2 className="text-lg font-bold">Exemples</h2>
                      {exemplesOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
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
                                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-t-2xl p-4">
                                  <div className="font-semibold prose prose-sm prose-p:font-semibold">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.title}</ReactMarkdown>
                                  </div>
                                </div>
                                <div className="p-4 border-t border-border">
                                  {card.resolution.length > 0 && (
                                    <>
                                      <h4 className="font-semibold text-sm mb-2">Résolution</h4>
                                      <div className="text-sm text-muted-foreground prose prose-sm space-y-1 mb-4">
                                        {card.resolution.map((line, i) => (
                                          <p key={i} className="text-muted-foreground"><ReactMarkdown remarkPlugins={[remarkGfm]}>{line}</ReactMarkdown></p>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                  <h4 className="font-semibold text-sm mb-2">Réponse</h4>
                                  <div className="text-sm text-muted-foreground prose prose-sm prose-p:text-muted-foreground">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.answer}</ReactMarkdown>
                                  </div>
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
                              className={`w-2 h-2 rounded-full transition-all ${index === currentExampleCard ? "bg-purple-500" : "bg-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {formulesOpen && formulaCards.length > 0 && (
                  <div className="p-6 rounded-2xl glass">
                    <button
                      onClick={() => setFormulesOpen(!formulesOpen)}
                      className="w-full flex items-center justify-between mb-4"
                    >
                      <h2 className="text-lg font-bold">Formules importantes</h2>
                      {formulesOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
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
                                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-t-2xl p-4">
                                  <h3 className="font-semibold">{card.title}</h3>
                                </div>
                                <div className="p-4 border-t border-border">
                                  <h4 className="font-semibold text-sm mb-2">Explication</h4>
                                  <div className="text-sm text-muted-foreground prose prose-sm prose-p:text-muted-foreground mb-3">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.explanation}</ReactMarkdown>
                                  </div>
                                  <h4 className="font-semibold text-sm mb-2">Exemple</h4>
                                  <div className="text-sm font-medium text-purple-600 bg-purple-500/10 inline-block px-3 py-1.5 rounded-xl prose prose-sm prose-p:text-purple-600 prose-p:mb-0">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.example}</ReactMarkdown>
                                  </div>
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
                              className={`w-2 h-2 rounded-full transition-all ${index === currentFormulaCard ? "bg-purple-500" : "bg-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {errorCards.length > 0 && (
                  <div className="p-6 rounded-2xl glass">
                    <button
                      onClick={() => setErreursOpen(!erreursOpen)}
                      className="w-full flex items-center justify-between mb-4"
                    >
                      <h2 className="text-lg font-bold">Erreurs fréquentes</h2>
                      {erreursOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
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
                                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-t-2xl p-4">
                                  <h3 className="font-semibold">{card.title}</h3>
                                </div>
                                <div className="p-4 border-t border-border flex items-start gap-3">
                                  <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <h4 className="font-semibold text-sm mb-1">Le conseil de DinoBot</h4>
                                    <div className="text-sm text-muted-foreground prose prose-sm prose-p:text-muted-foreground">
                                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.advice}</ReactMarkdown>
                                    </div>
                                  </div>
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
                              className={`w-2 h-2 rounded-full transition-all ${index === currentErrorCard ? "bg-amber-500" : "bg-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      {subjectSelectorOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
          <div className="bg-background w-full md:max-w-md md:rounded-2xl rounded-t-2xl p-6 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Choisis ta matière</h3>
              <button onClick={() => setSubjectSelectorOpen(false)} className="p-2 -mr-2 rounded-full hover:bg-muted">
                <ChevronDown className="w-5 h-5" />
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
