"use client"

import { useState, useEffect } from "react"
import { useCourses } from "@/hooks/use-courses"
import { ChevronLeft, ChevronRight, Printer, BookOpen } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function CoursPage() {
  const { getSubjects, getChaptersBySubject } = useCourses()
  const subjects = getSubjects()

  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || "chimie")
  const [selectedChapterId, setSelectedChapterId] = useState("")

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId)
  const chapters = selectedSubject ? getChaptersBySubject(selectedSubjectId) : []
  const selectedChapter = chapters.find((c) => c.id === selectedChapterId)

  useEffect(() => {
    if (chapters.length > 0 && !selectedChapterId) {
      setSelectedChapterId(chapters[0].id)
    }
  }, [selectedSubjectId, chapters, selectedChapterId])

  const goToPreviousChapter = () => {
    const i = chapters.findIndex((c) => c.id === selectedChapterId)
    if (i > 0) { setSelectedChapterId(chapters[i - 1].id); globalThis.scrollTo({ top: 0, behavior: "smooth" }) }
  }

  const goToNextChapter = () => {
    const i = chapters.findIndex((c) => c.id === selectedChapterId)
    if (i < chapters.length - 1) { setSelectedChapterId(chapters[i + 1].id); globalThis.scrollTo({ top: 0, behavior: "smooth" }) }
  }

  const currentIndex = chapters.findIndex((c) => c.id === selectedChapterId)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-purple-500" />
          <h1 className="font-bold text-lg flex-1">Mes cours</h1>
          <button onClick={() => globalThis.print()} className="p-2 rounded-lg hover:bg-muted transition-colors print:hidden">
            <Printer className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => { setSelectedSubjectId(subject.id); setSelectedChapterId("") }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                selectedSubjectId === subject.id
                  ? "text-white shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              style={selectedSubjectId === subject.id ? { backgroundColor: subject.color } : undefined}
            >
              <span>{subject.icon}</span>
              {subject.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 container mx-auto">
        <aside className="w-56 flex-shrink-0 border-r border-border py-4 hidden md:block">
          <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Chapitres</p>
          <nav className="space-y-0.5">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => setSelectedChapterId(chapter.id)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-all ${
                  selectedChapterId === chapter.id
                    ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium border-r-2 border-purple-500"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {chapter.name}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 max-w-3xl">
          {selectedChapter ? (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span>{selectedSubject?.icon}</span>
                  <span>{selectedSubject?.name}</span>
                  <span>›</span>
                  <span>{selectedChapter.name}</span>
                </div>
                <h2 className="text-2xl font-bold">{selectedChapter.name}</h2>
                {selectedChapter.description && (
                  <p className="text-muted-foreground mt-1">{selectedChapter.description}</p>
                )}
              </div>

              {selectedChapter.parts.map((part) => (
                <div key={part.id} className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 text-purple-600 dark:text-purple-400">{part.name}</h3>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{part.content}</ReactMarkdown>
                  </div>
                </div>
              ))}

              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <button
                  onClick={goToPreviousChapter}
                  disabled={currentIndex <= 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Précédent
                </button>
                <button
                  onClick={goToNextChapter}
                  disabled={currentIndex >= chapters.length - 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Sélectionne un chapitre</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
