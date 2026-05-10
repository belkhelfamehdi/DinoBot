"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Printer, CheckCircle2, XCircle, ChevronLeft, Loader2, RotateCcw, Brain } from "lucide-react"
import { toast } from "sonner"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface GeneratedData {
  subject: string
  subjectId: string
  subjectIcon: string
  subjectColor: string
  subjectBgColor: string
  chapter: string
  parts: string[]
  difficulty: number
  revision: {
    definitions: Array<{ title: string; definition: string }>
    formulas: Array<{ title: string; explanation: string; example: string }>
    examples: Array<{ question: string; answer: string }>
    revisionCards: Array<{ title: string; methods: string[] }>
    errors: Array<{ title: string; advice: string }>
  }
  flashcards: Array<{ question: string; answer: string }>
  quiz: Array<{
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }>
  createdAt: string
}

export default function RevisionPage() {
  const [mode, setMode] = useState<"fiche" | "quizz">("fiche")
  const [ficheTab, setFicheTab] = useState<"cours" | "infos">("cours")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null)

  useEffect(() => {
    const savedData = sessionStorage.getItem('generatedFicheData')
    if (savedData) {
      setGeneratedData(JSON.parse(savedData))
    }
  }, [])

  const quizQuestions = generatedData?.quiz || []

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (!showResults) {
      setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answerIndex })
    }
  }

  const handleSubmitQuiz = () => {
    if (Object.keys(selectedAnswers).length !== quizQuestions.length) {
      toast.error("Réponds à toutes les questions")
      return
    }
    setShowResults(true)
  }

  const handleResetQuiz = () => {
    setSelectedAnswers({})
    setShowResults(false)
    setCurrentQuestion(0)
  }

  const calculateScore = () => {
    let correct = 0
    quizQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const handlePrint = () => {
    window.print()
  }

  if (!generatedData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
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
            <span className="text-2xl">{generatedData.subjectIcon}</span>
            <div>
              <div className="font-semibold">{generatedData.chapter}</div>
              <div className="text-xs text-muted-foreground">{generatedData.subject}</div>
            </div>
          </div>
          <div className="flex-1" />
          <button
            onClick={handlePrint}
            className="p-2 rounded-full hover:bg-muted transition-colors print:hidden"
            aria-label="Imprimer"
          >
            <Printer className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-3">
            {mode === "fiche" ? (
              <>
                <button
                  onClick={() => setFicheTab("cours")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    ficheTab === "cours"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "hover:bg-muted"
                  }`}
                >
                  Fiche
                </button>
                <button
                  onClick={() => setFicheTab("infos")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    ficheTab === "infos"
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
              </>
            ) : (
              <button className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Quiz
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("fiche")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              mode === "fiche"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                : "glass hover:shadow-md"
            }`}
          >
            Fiche de cours
          </button>
          <button
            onClick={() => setMode("quizz")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              mode === "quizz"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                : "glass hover:shadow-md"
            }`}
          >
            Quiz
          </button>
        </div>

        {mode === "fiche" && (
          <div className="max-w-3xl mx-auto">
            {ficheTab === "cours" && (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl glass">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">1</span>
                    Définitions
                  </h2>
                  <div className="space-y-4">
                    {generatedData.revision.definitions.map((def, i) => (
                      <div key={i} className="pl-10">
                        <h3 className="font-semibold mb-1">{def.title}</h3>
                        <div className="text-sm text-muted-foreground prose prose-sm prose-headings:font-semibold prose-p:text-muted-foreground">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{def.definition}</ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl glass">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm">2</span>
                    Formules
                  </h2>
                  <div className="space-y-4">
                    {generatedData.revision.formulas.map((f, i) => (
                      <div key={i} className="pl-20">
                        <h3 className="font-semibold mb-1">{f.title}</h3>
                        <div className="text-sm text-muted-foreground mb-2 prose prose-sm prose-headings:font-semibold prose-p:text-muted-foreground">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{f.explanation}</ReactMarkdown>
                        </div>
                        <div className="text-xs text-purple-600 font-medium bg-purple-500/10 inline-block px-2 py-1 rounded prose prose-sm prose-p:text-purple-600 prose-p:mb-0">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{f.example}</ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {generatedData.revision.errors.length > 0 && (
                  <div className="p-6 rounded-2xl glass">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm">!</span>
                      Erreurs fréquentes
                    </h2>
                    <div className="space-y-4">
                      {generatedData.revision.errors.map((err, i) => (
                        <div key={i} className="pl-20">
                          <h3 className="font-semibold mb-1">{err.title}</h3>
                          <div className="text-sm text-muted-foreground prose prose-sm prose-headings:font-semibold prose-p:text-muted-foreground">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{err.advice}</ReactMarkdown>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {ficheTab === "infos" && (
              <div className="space-y-4">
                {generatedData.revision.examples.length > 0 && (
                  <div className="p-6 rounded-2xl glass">
                    <h2 className="text-lg font-bold mb-4">Exemples</h2>
                    <div className="space-y-4">
                      {generatedData.revision.examples.map((ex, i) => (
                        <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5">
                          <div className="font-medium mb-2 prose prose-sm prose-p:font-medium prose-p:mb-2">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{ex.question}</ReactMarkdown>
                          </div>
                          <div className="text-sm text-muted-foreground prose prose-sm prose-p:text-muted-foreground">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{ex.answer}</ReactMarkdown>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {generatedData.revision.revisionCards.length > 0 && (
                  <div className="p-6 rounded-2xl glass">
                    <h2 className="text-lg font-bold mb-4">Conseils de révision</h2>
                    <div className="space-y-4">
                      {generatedData.revision.revisionCards.map((card, i) => (
                        <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-green-500/5 to-emerald-500/5">
                          <h3 className="font-semibold mb-2">{card.title}</h3>
                          <ul className="space-y-1">
                            {card.methods.map((m, j) => (
                              <li key={j} className="text-sm text-muted-foreground flex gap-2">
                                <span className="text-green-500">✓</span>
                                {m}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {mode === "quizz" && (
          <div className="max-w-3xl mx-auto">
            {quizQuestions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-10 h-10 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Aucun quiz disponible</h3>
                <p className="text-muted-foreground mb-6">
                  Génère du contenu pour accéder au quiz
                </p>
                <Link
                  href="/fiches/creer-fiche"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
                >
                  Créer une fiche
                </Link>
              </div>
            ) : (
              <>
                {!showResults && (
                  <div className="mb-6">
                    <div className="flex gap-1 mb-2">
                      {quizQuestions.map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded-full transition-all ${
                            selectedAnswers[i] !== undefined ? "bg-purple-500" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-center text-muted-foreground">
                      {Object.keys(selectedAnswers).length} / {quizQuestions.length} répondues
                    </p>
                  </div>
                )}

                {showResults && (
                  <div className="mb-6 p-6 rounded-2xl glass text-center">
                    <p className="text-sm text-muted-foreground mb-2">Score final</p>
                    <div className="text-5xl font-bold text-gradient mb-2">
                      {Math.round((calculateScore() / quizQuestions.length) * 100)}%
                    </div>
                    <p className="text-muted-foreground">
                      {calculateScore()} / {quizQuestions.length} bonnes réponses
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {quizQuestions.map((q, qIndex) => {
                    const isCorrect = selectedAnswers[qIndex] === q.correctAnswer
                    const hasAnswered = selectedAnswers[qIndex] !== undefined

                    return (
                      <div key={qIndex} className="p-6 rounded-2xl glass">
                        <div className="flex items-start gap-3 mb-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            showResults
                              ? isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                              : "bg-purple-500 text-white"
                          }`}>
                            {qIndex + 1}
                          </div>
                          <p className="flex-1 font-medium">{q.question}</p>
                        </div>

                        <div className="space-y-2">
                          {q.options.map((option, oIndex) => {
                            const isSelected = selectedAnswers[qIndex] === oIndex
                            const isCorrectAnswer = oIndex === q.correctAnswer

                            return (
                              <button
                                key={oIndex}
                                onClick={() => handleAnswerSelect(qIndex, oIndex)}
                                disabled={showResults}
                                className={`w-full text-left p-4 rounded-xl border transition-all ${
                                  showResults
                                    ? isCorrectAnswer
                                      ? "border-green-500 bg-green-500/10"
                                      : isSelected && !isCorrectAnswer
                                        ? "border-red-500 bg-red-500/10"
                                        : "border-border bg-muted/50"
                                    : isSelected
                                      ? "border-purple-500 bg-purple-500/10"
                                      : "border-border hover:border-purple-500/50"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-sm">{option}</span>
                                  {showResults && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                                  {showResults && isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-red-500" />}
                                </div>
                              </button>
                            )
                          })}
                        </div>

                        {showResults && (
                          <div className="mt-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <p className="text-sm font-semibold text-purple-700 mb-1">Explication</p>
                            <div className="text-sm text-muted-foreground prose prose-sm prose-p:text-muted-foreground">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>{q.explanation}</ReactMarkdown>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 flex justify-center gap-4">
                  {!showResults ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(selectedAnswers).length !== quizQuestions.length}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Valider mes réponses
                    </button>
                  ) : (
                    <button
                      onClick={handleResetQuiz}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Recommencer
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          header, .sticky {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
