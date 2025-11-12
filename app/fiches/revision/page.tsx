"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Printer, CheckCircle2, XCircle } from "lucide-react"
import CoursePage from "@/components/course-page"

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F0FF] via-[#FAF5FF] to-[#FFF8FF]">
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-md">
        <div className="px-4 py-4 flex items-center justify-center gap-4">
          <button
            onClick={() => setMode("fiche")}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
              mode === "fiche"
                ? "bg-gradient-to-r from-[#6B8EFF] to-[#8BADFF] text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📄 Fiche de cours
          </button>
          <button
            onClick={() => setMode("quizz")}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
              mode === "quizz"
                ? "bg-gradient-to-r from-[#6B8EFF] to-[#8BADFF] text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ✅ Quizz
          </button>
        </div>
      </div>

      {mode === "fiche" && (
        <div className="relative">
          <button
            onClick={handlePrint}
            className="fixed top-20 right-4 z-30 bg-gradient-to-r from-[#6B8EFF] to-[#8BADFF] hover:from-[#5B7FFF] hover:to-[#7B9FFF] text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all print:hidden"
            aria-label="Imprimer en PDF"
          >
            <Printer className="w-5 h-5" />
          </button>
          <CoursePage />
        </div>
      )}

      {mode === "quizz" && (
        <div className="px-4 py-6 max-w-3xl mx-auto">
          {quizQuestions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="text-6xl mb-4">🦖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Aucun quiz disponible</h3>
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
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Quizz : Acides et Bases</h1>
              {showResults && (
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#6B8EFF]">
                    {calculateScore()}/{quizQuestions.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    {Math.round((calculateScore() / quizQuestions.length) * 100)}%
                  </div>
                </div>
              )}
            </div>

            {!showResults && (
              <div className="mb-4">
                <div className="flex gap-2 mb-4">
                  {quizQuestions.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 flex-1 rounded-full transition-colors ${
                        selectedAnswers[index] !== undefined ? "bg-[#6B8EFF]" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 text-center">
                  {Object.keys(selectedAnswers).length} / {quizQuestions.length} questions répondues
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {quizQuestions.map((q, qIndex) => (
              <div key={qIndex} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6B8EFF] to-[#8BADFF] text-white flex items-center justify-center font-bold flex-shrink-0">
                    {qIndex + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 flex-1">{q.question}</h3>
                </div>

                <div className="space-y-3">
                  {q.options.map((option, oIndex) => {
                    const isSelected = selectedAnswers[qIndex] === oIndex
                    const isCorrect = oIndex === q.correctAnswer
                    const showCorrectAnswer = showResults && isCorrect
                    const showWrongAnswer = showResults && isSelected && !isCorrect

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswerSelect(qIndex, oIndex)}
                        disabled={showResults}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          showCorrectAnswer
                            ? "border-green-500 bg-green-50"
                            : showWrongAnswer
                              ? "border-red-500 bg-red-50"
                              : isSelected
                                ? "border-[#6B8EFF] bg-blue-50"
                                : "border-gray-200 hover:border-gray-300 bg-white"
                        } ${showResults ? "cursor-default" : "cursor-pointer"}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm text-gray-800">{option}</span>
                          {showCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
                          {showWrongAnswer && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {showResults && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm font-semibold text-blue-900 mb-1">💡 Explication</p>
                    <p className="text-sm text-blue-800">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            {!showResults ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length !== quizQuestions.length}
                className="bg-gradient-to-r from-[#6B8EFF] to-[#8BADFF] hover:from-[#5B7FFF] hover:to-[#7B9FFF] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Valider mes réponses
              </button>
            ) : (
              <button
                onClick={handleResetQuiz}
                className="bg-gradient-to-r from-[#6B8EFF] to-[#8BADFF] hover:from-[#5B7FFF] hover:to-[#7B9FFF] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Recommencer le quizz
              </button>
            )}
          </div>
            </>
          )}
        </div>
      )}

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          header,
          button,
          .sticky {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
