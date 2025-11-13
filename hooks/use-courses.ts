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

  const getSubjectByName = (subjectName: string) => {
    return data.subjects.find(s => s.name.toLowerCase() === subjectName.toLowerCase())
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

  return {
    subjects: data.subjects,
    getSubjects,
    getSubjectById,
    getSubjectByName,
    getChaptersBySubject,
    getChapterById,
    getPartsByChapter,
    getPartById
  }
}
