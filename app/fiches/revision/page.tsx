"use client"

import { useState } from "react"
import { Printer, CheckCircle2, XCircle } from "lucide-react"
import CoursePage from "@/components/course-page"

export default function RevisionPage() {
  const [mode, setMode] = useState<"fiche" | "quizz">("fiche")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const quizQuestions = [
    {
      question: "Quelle est la définition d'un acide selon Brønsted-Lowry ?",
      options: [
        "Une espèce qui libère des ions OH⁻",
        "Une espèce qui accepte un proton H⁺",
        "Une espèce qui donne un proton H⁺",
        "Une espèce qui libère des ions H⁺",
      ],
      correctAnswer: 2,
      explanation: "Selon Brønsted-Lowry, un acide est un donneur de proton H⁺.",
    },
    {
      question: "Quelle formule permet de calculer le pH d'une solution ?",
      options: ["pH = log₁₀[H₃O⁺]", "pH = −log₁₀[H₃O⁺]", "pH = [H₃O⁺] × 10", "pH = 14 − [H₃O⁺]"],
      correctAnswer: 1,
      explanation: "Le pH est défini par pH = −log₁₀[H₃O⁺].",
    },
    {
      question: "Qu'est-ce qu'une solution tampon ?",
      options: [
        "Une solution qui change rapidement de pH",
        "Une solution qui résiste aux variations de pH",
        "Une solution avec un pH toujours égal à 7",
        "Une solution contenant uniquement des acides forts",
      ],
      correctAnswer: 1,
      explanation:
        "Une solution tampon résiste aux variations de pH grâce à un couple acide/base conjugué en proportions comparables.",
    },
    {
      question: "Quelle est l'équation de Henderson-Hasselbalch ?",
      options: [
        "pH = pKₐ − log₁₀([A⁻]/[AH])",
        "pH = pKₐ + log₁₀([AH]/[A⁻])",
        "pH = pKₐ + log₁₀([A⁻]/[AH])",
        "pH = pKₐ × [A⁻]/[AH]",
      ],
      correctAnswer: 2,
      explanation: "L'équation de Henderson-Hasselbalch est pH = pKₐ + log₁₀([A⁻]/[AH]).",
    },
    {
      question: "Pour un acide fort, comment calcule-t-on le pH ?",
      options: ["pH = 14 + log₁₀(Cₐ)", "pH = −log₁₀(Cₐ)", "pH = ½(pKₐ − log₁₀(Cₐ))", "pH = pKₐ"],
      correctAnswer: 1,
      explanation: "Pour un acide fort qui se dissocie totalement, pH = −log₁₀(Cₐ) où Cₐ est la concentration.",
    },
    {
      question: "Quelle est la valeur du produit ionique de l'eau Kₑ à 25°C ?",
      options: ["10⁻⁷", "10⁻¹⁴", "10⁻¹", "14"],
      correctAnswer: 1,
      explanation: "Le produit ionique de l'eau Kₑ = [H₃O⁺][OH⁻] = 10⁻¹⁴ à 25°C.",
    },
    {
      question: "Qu'est-ce qu'une espèce amphotère ?",
      options: [
        "Une espèce qui ne réagit ni comme acide ni comme base",
        "Une espèce qui peut agir comme acide ou comme base",
        "Une espèce qui est toujours neutre",
        "Une espèce qui a un pH de 7",
      ],
      correctAnswer: 1,
      explanation: "Une espèce amphotère peut agir comme acide ou comme base selon le milieu (ex: H₂O, HCO₃⁻).",
    },
    {
      question: "Si le pKₐ d'un acide est petit, que peut-on dire de cet acide ?",
      options: ["C'est un acide faible", "C'est un acide fort", "C'est une base forte", "Son pH est élevé"],
      correctAnswer: 1,
      explanation: "Plus le pKₐ est petit, plus l'acide est fort car il se dissocie facilement.",
    },
  ]

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
