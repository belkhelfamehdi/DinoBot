import { coursesData } from '@/data/courses'

export interface Part {
  id: string
  name: string
  content: string
  keywords: string[]
}

export interface Chapter {
  id: string
  name: string
  description: string
  parts: Part[]
}

export interface Subject {
  id: string
  name: string
  icon: string
  bgColor: string
  color: string
  chapters: Chapter[]
}

export interface CoursesData {
  subjects: Subject[]
}

export function useCourses() {
  const data = coursesData

  const getSubjects = () => {
    return data.subjects
  }

  const getSubjectById = (subjectId: string) => {
    return data.subjects.find(s => s.id === subjectId)
  }

  const getChaptersBySubject = (subjectId: string) => {
    const subject = getSubjectById(subjectId)
    return subject?.chapters || []
  }

  const getChapterById = (subjectId: string, chapterId: string) => {
    const chapters = getChaptersBySubject(subjectId)
    return chapters.find(c => c.id === chapterId)
  }

  const getPartsByChapter = (subjectId: string, chapterId: string) => {
    const chapter = getChapterById(subjectId, chapterId)
    return chapter?.parts || []
  }

  const getPartById = (subjectId: string, chapterId: string, partId: string) => {
    const parts = getPartsByChapter(subjectId, chapterId)
    return parts.find(p => p.id === partId)
  }

  const searchCourses = (query: string) => {
    const results: Array<{
      subject: Subject
      chapter: Chapter
      part?: Part
    }> = []

    const lowerQuery = query.toLowerCase()

    for (const subject of data.subjects) {
      for (const chapter of subject.chapters) {
        // Recherche dans le chapitre
        if (
          chapter.name.toLowerCase().includes(lowerQuery) ||
          chapter.description.toLowerCase().includes(lowerQuery)
        ) {
          results.push({ subject, chapter })
        }

        // Recherche dans les parties
        for (const part of chapter.parts) {
          if (
            part.name.toLowerCase().includes(lowerQuery) ||
            part.content.toLowerCase().includes(lowerQuery) ||
            part.keywords.some(k => k.toLowerCase().includes(lowerQuery))
          ) {
            results.push({ subject, chapter, part })
          }
        }
      }
    }

    return results
  }

  return {
    subjects: data.subjects,
    getSubjects,
    getSubjectById,
    getChaptersBySubject,
    getChapterById,
    getPartsByChapter,
    getPartById,
    searchCourses
  }
}
