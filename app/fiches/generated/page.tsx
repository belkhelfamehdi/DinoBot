"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Download, Share2, Printer } from "lucide-react"

interface GeneratedFiche {
  subject: string
  subjectIcon: string
  subjectColor: string
  chapter: string
  parts: string[]
  difficulty: number
  content: string
  createdAt: string
}

export default function GeneratedFichePage() {
  const router = useRouter()
  const [fiche, setFiche] = useState<GeneratedFiche | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedData = sessionStorage.getItem('generatedFiche')
    if (storedData) {
      setFiche(JSON.parse(storedData))
    } else {
      router.push('/fiches/creer-fiche/database')
    }
    setLoading(false)
  }, [router])

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    if (!fiche) return
    
    const blob = new Blob([fiche.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fiche-${fiche.subject}-${fiche.chapter}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F0FF] via-[#FAF5FF] to-[#FFF8FF] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!fiche) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F0FF] via-[#FAF5FF] to-[#FFF8FF]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm print:hidden">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/fiches/creer-fiche/database"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              title="Imprimer"
            >
              <Printer className="w-5 h-5 text-slate-600" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              title="Télécharger"
            >
              <Download className="w-5 h-5 text-slate-600" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              title="Partager"
            >
              <Share2 className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header de la fiche */}
          <div 
            className="px-6 sm:px-8 py-6 text-white"
            style={{ backgroundColor: fiche.subjectColor }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{fiche.subjectIcon}</span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{fiche.chapter}</h1>
                <p className="text-white/90 text-sm">{fiche.subject}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {fiche.parts.map((part, index) => (
                <span 
                  key={index}
                  className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium"
                >
                  {part}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm text-white/90">
              <span>Difficulté : {fiche.difficulty}/3</span>
              <span>•</span>
              <span>{new Date(fiche.createdAt).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>

          {/* Contenu de la fiche */}
          <div className="px-6 sm:px-8 py-8">
            <div className="prose prose-slate max-w-none">
              <div className="whitespace-pre-wrap text-slate-800 leading-relaxed">
                {fiche.content}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 py-6 bg-slate-50 border-t border-slate-200 print:hidden">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push('/fiches/creer-fiche/database')}
                className="flex-1 bg-white border-2 border-purple-200 text-purple-600 font-semibold py-3 px-6 rounded-xl hover:bg-purple-50 transition-all"
              >
                Créer une nouvelle fiche
              </button>
              <button
                onClick={() => router.push('/fiches')}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all"
              >
                Voir mes fiches
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Styles pour l'impression */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
