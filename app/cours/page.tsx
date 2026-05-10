"use client";

import { useState, useEffect } from "react";
import { useCourses } from "@/hooks/use-courses";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChevronLeft, ChevronRight, BookOpen, Printer } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function CoursPage() {
  const { getSubjects, getChaptersBySubject } = useCourses();
  const subjects = getSubjects();

  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || "chimie");
  const [selectedChapterId, setSelectedChapterId] = useState("");

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);
  const chapters = selectedSubject ? getChaptersBySubject(selectedSubjectId) : [];
  const selectedChapter = chapters.find(c => c.id === selectedChapterId);

  useEffect(() => {
    if (chapters.length > 0 && !selectedChapterId) {
      setSelectedChapterId(chapters[0].id);
    }
  }, [selectedSubjectId, chapters, selectedChapterId]);

  const goToPreviousChapter = () => {
    const currentIndex = chapters.findIndex(c => c.id === selectedChapterId);
    if (currentIndex > 0) {
      setSelectedChapterId(chapters[currentIndex - 1].id);
      globalThis.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextChapter = () => {
    const currentIndex = chapters.findIndex(c => c.id === selectedChapterId);
    if (currentIndex < chapters.length - 1) {
      setSelectedChapterId(chapters[currentIndex + 1].id);
      globalThis.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    globalThis.print();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <Sidebar className="border-r border-border">
          <SidebarContent className="gap-0">
            <SidebarGroup className="px-3 py-4">
              <SidebarGroupLabel className="flex items-center gap-2 text-lg mb-4 px-2">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-sm">🦕</span>
                  </div>
                  <span className="font-bold text-gradient">
                    Cours
                  </span>
                </Link>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-3 px-2">
                      Matières
                    </p>
                    <div className="grid grid-cols-2 gap-3 px-2">
                      {subjects.map((subject) => (
                        <button
                          key={subject.id}
                          onClick={() => {
                            setSelectedSubjectId(subject.id);
                            setSelectedChapterId("");
                          }}
                          className={`p-4 rounded-xl text-left transition-all ${
                            selectedSubjectId === subject.id
                              ? "shadow-lg scale-105"
                              : "hover:shadow-sm"
                          }`}
                          style={{
                            backgroundColor: selectedSubjectId === subject.id ? subject.bgColor : "var(--muted)",
                            color: selectedSubjectId === subject.id ? subject.color : "var(--muted-foreground)",
                          }}
                        >
                          <div className="text-2xl mb-2">{subject.icon}</div>
                          <div className="font-semibold text-xs">{subject.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="px-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-3 px-2">
                      Chapitres
                    </p>
                    <div className="space-y-2">
                      {chapters.map((chapter) => (
                        <SidebarMenuItem key={chapter.id}>
                          <SidebarMenuButton
                            onClick={() => setSelectedChapterId(chapter.id)}
                            className={`w-full h-auto py-3 px-3 ${
                              selectedChapterId === chapter.id ? "shadow-sm" : ""
                            }`}
                            style={{
                              backgroundColor:
                                selectedChapterId === chapter.id
                                  ? selectedSubject?.bgColor
                                  : "transparent",
                              color:
                                selectedChapterId === chapter.id
                                  ? selectedSubject?.color
                                  : undefined,
                            }}
                          >
                            <div className="flex flex-col items-start w-full gap-1">
                              <span className="font-semibold text-sm leading-tight">
                                {chapter.name}
                              </span>
                              <span className="text-xs opacity-75 leading-tight">
                                {chapter.description}
                              </span>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  </div>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-background border-b border-border p-4 print:hidden sticky top-0 z-10">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <SidebarTrigger />
              
              {selectedSubject && selectedChapter && (
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedSubject.icon}</span>
                  <div>
                    <div className="text-sm text-muted-foreground">{selectedSubject.name}</div>
                    <div className="font-semibold">{selectedChapter.name}</div>
                  </div>
                </div>
              )}

              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:shadow-md transition-all"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Imprimer</span>
              </button>
            </div>
          </header>

          <article className="max-w-4xl mx-auto p-8 print:p-4 flex-1">
            {selectedSubject && selectedChapter ? (
              <div>
                <div className="mb-8 print:mb-6">
                  <Badge
                    style={{
                      backgroundColor: selectedSubject.bgColor,
                      color: selectedSubject.color,
                    }}
                    className="text-sm px-4 py-1.5 mb-4"
                  >
                    {selectedSubject.name}
                  </Badge>
                  <h1 className="text-4xl font-bold mb-3 print:text-3xl">
                    {selectedChapter.name}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {selectedChapter.description}
                  </p>
                </div>

                <div className="space-y-12 print:space-y-8">
                  {selectedChapter.parts.map((part, index) => (
                    <section key={part.id} className="break-inside-avoid">
                      <div className="flex items-start gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shrink-0 print:w-8 print:h-8"
                          style={{ backgroundColor: selectedSubject.color }}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold mb-4 print:text-xl">
                            {part.name}
                          </h2>
                          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-li:leading-relaxed prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline prose-code:text-purple-600 prose-code:bg-purple-500/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-l-purple-500 prose-blockquote:text-muted-foreground">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {part.content}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>

                      {part.keywords && part.keywords.length > 0 && (
                        <div className="ml-16 print:ml-12">
                          <div className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                            Mots-clés :
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {part.keywords.map((keyword) => (
                              <Badge
                                key={`${part.id}-${keyword}`}
                                variant="outline"
                                style={{
                                  borderColor: selectedSubject.color,
                                  color: selectedSubject.color,
                                }}
                                className="print:text-xs"
                              >
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </section>
                  ))}
                </div>

                <div className="flex justify-between mt-12 pt-8 border-t border-border print:hidden">
                  <button
                    onClick={goToPreviousChapter}
                    disabled={chapters.findIndex(c => c.id === selectedChapterId) === 0}
                    className="flex items-center gap-2 px-6 py-3 rounded-full glass disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Chapitre précédent
                  </button>
                  <button
                    onClick={goToNextChapter}
                    disabled={
                      chapters.findIndex(c => c.id === selectedChapterId) ===
                      chapters.length - 1
                    }
                    className="flex items-center gap-2 px-6 py-3 rounded-full glass disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all"
                  >
                    Chapitre suivant
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-purple-500" />
                </div>
                <p className="text-muted-foreground">
                  Sélectionnez une matière et un chapitre pour commencer
                </p>
              </div>
            )}
          </article>
        </main>
      </div>

      <style>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </SidebarProvider>
  );
}
