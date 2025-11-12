"use client";

import { useState, useEffect } from "react";
import { useCourses } from "@/hooks/use-courses";
import { Button } from "@/components/ui/button";
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

export default function CoursPage() {
  const { getSubjects, getChaptersBySubject } = useCourses();
  const subjects = getSubjects();

  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || "chimie");
  const [selectedChapterId, setSelectedChapterId] = useState("");

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);
  const chapters = selectedSubject ? getChaptersBySubject(selectedSubjectId) : [];
  const selectedChapter = chapters.find(c => c.id === selectedChapterId);

  // Sélectionner le premier chapitre par défaut
  useEffect(() => {
    if (chapters.length > 0 && !selectedChapterId) {
      setSelectedChapterId(chapters[0].id);
    }
  }, [selectedSubjectId, chapters, selectedChapterId]);

  // Navigation entre chapitres
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
      <div className="min-h-screen flex w-full from-purple-50 via-white to-blue-50">
        {/* Sidebar avec shadcn */}
        <Sidebar className="border-r">
          <SidebarContent className="gap-0">
            <SidebarGroup className="px-3 py-4">
              <SidebarGroupLabel className="flex items-center gap-2 text-lg mb-4 px-2">
                <BookOpen className="w-5 h-5" />
                <span className="font-bold  from-purple-600 to-blue-600 bg-clip-text ">
                  Mes Cours
                </span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {/* Sélection de la matière */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-3 px-2">
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
                          className={`p-4 rounded-lg text-left transition-all ${
                            selectedSubjectId === subject.id
                              ? "shadow-md scale-105"
                              : "hover:shadow-sm hover:scale-102"
                          }`}
                          style={{
                            backgroundColor: selectedSubjectId === subject.id ? subject.bgColor : "#f9fafb",
                            color: selectedSubjectId === subject.id ? subject.color : "#6b7280",
                          }}
                        >
                          <div className="text-2xl mb-2">{subject.icon}</div>
                          <div className="font-semibold text-xs wrap-break-word">{subject.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Liste des chapitres */}
                  <div className="px-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-3 px-2">
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
                                  : "#374151",
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

        {/* Contenu principal */}
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 p-4 print:hidden sticky top-0 z-10">
            <div className="flex items-center justify-between max-w-5xl mx-auto">
              <SidebarTrigger />
              
              {selectedSubject && selectedChapter && (
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedSubject.icon}</span>
                  <div>
                    <div className="text-sm text-gray-500">{selectedSubject.name}</div>
                    <div className="font-semibold">{selectedChapter.name}</div>
                  </div>
                </div>
              )}

              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Imprimer
              </Button>
            </div>
          </header>

          {/* Contenu du cours */}
          <article className="max-w-4xl mx-auto p-8 print:p-4 flex-1">
            {selectedSubject && selectedChapter ? (
              <div>
                {/* En-tête du chapitre */}
                <div className="mb-8 print:mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge
                      style={{
                        backgroundColor: selectedSubject.bgColor,
                        color: selectedSubject.color,
                      }}
                      className="text-lg px-4 py-1"
                    >
                      {selectedSubject.name}
                    </Badge>
                  </div>
                  <h1 className="text-4xl font-bold mb-3 print:text-3xl">
                    {selectedChapter.name}
                  </h1>
                  <p className="text-lg text-gray-600 print:text-base">
                    {selectedChapter.description}
                  </p>
                </div>

                {/* Parties du cours */}
                <div className="space-y-12 print:space-y-8">
                  {selectedChapter.parts.map((part, index) => (
                    <section key={part.id} className="break-inside-avoid">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0 print:w-8 print:h-8"
                          style={{ backgroundColor: selectedSubject.color }}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold mb-4 print:text-xl">
                            {part.name}
                          </h2>
                          <div className="prose prose-lg max-w-none print:prose-base">
                            <div className="whitespace-pre-line leading-relaxed">
                              {part.content}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mots-clés */}
                      {part.keywords && part.keywords.length > 0 && (
                        <div className="mt-4 ml-14 print:ml-12">
                          <div className="text-sm font-semibold text-gray-600 mb-2">
                            📌 Mots-clés :
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

                {/* Navigation entre chapitres */}
                <div className="flex justify-between mt-12 pt-8 border-t print:hidden">
                  <Button
                    variant="outline"
                    onClick={goToPreviousChapter}
                    disabled={chapters.findIndex(c => c.id === selectedChapterId) === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Chapitre précédent
                  </Button>
                  <Button
                    variant="outline"
                    onClick={goToNextChapter}
                    disabled={
                      chapters.findIndex(c => c.id === selectedChapterId) ===
                      chapters.length - 1
                    }
                  >
                    Chapitre suivant
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Sélectionnez une matière et un chapitre pour commencer
                </p>
              </div>
            )}
          </article>
        </main>
      </div>

      {/* Styles pour l'impression */}
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
