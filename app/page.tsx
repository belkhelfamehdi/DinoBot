"use client"

import { FileText, BookOpen, Sparkles, Plus, List } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F0FF] via-[#FAF5FF] to-[#FFF8FF]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-center gap-2 sm:gap-3">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dinobot-logo-FNB6LHXRYN4MNMmqlZz3BvbXUAwPPz.png"
            alt="DinoBot"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-center leading-tight">
            DinoBot - Générateur de Fiches
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 animate-pulse" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">Bienvenue sur DinoBot</h2>
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 animate-pulse" />
            </div>
            <p className="text-base sm:text-lg text-slate-600 px-2">
              Créez et gérez vos fiches de révision intelligemment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Link
              href="/fiches/creer-fiche"
              className="group relative flex flex-col items-center gap-3 sm:gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#C8D8FF] to-[#D8E4FF] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/60 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8 sm:w-10 sm:h-10 text-[#4B6FFF]" />
              </div>
              <div className="text-center space-y-1 sm:space-y-2">
                <span className="text-lg sm:text-xl font-bold text-slate-800 block">Créer une fiche</span>
                <span className="text-xs sm:text-sm text-slate-600 block">Générez une nouvelle fiche de révision</span>
              </div>
            </Link>

            <Link
              href="/fiches"
              className="group relative flex flex-col items-center gap-3 sm:gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#D8C8FF] to-[#E8D8FF] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/60 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <List className="w-8 h-8 sm:w-10 sm:h-10 text-[#9B7FFF]" />
              </div>
              <div className="text-center space-y-1 sm:space-y-2">
                <span className="text-lg sm:text-xl font-bold text-slate-800 block">Mes fiches</span>
                <span className="text-xs sm:text-sm text-slate-600 block">Consultez toutes vos fiches</span>
              </div>
            </Link>

            <Link
              href="/cours"
              className="group relative flex flex-col items-center gap-3 sm:gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FFD8C8] to-[#FFE8D8] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/60 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF7F4B]" />
              </div>
              <div className="text-center space-y-1 sm:space-y-2">
                <span className="text-lg sm:text-xl font-bold text-slate-800 block">Mes cours</span>
                <span className="text-xs sm:text-sm text-slate-600 block">Consultez vos cours détaillés</span>
              </div>
            </Link>
            
          </div>
          

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-5 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">Fonctionnalités</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">Fiches complètes</h4>
                <p className="text-xs sm:text-sm text-slate-600">Définitions, formules et exemples détaillés</p>
              </div>

              <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                  <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-purple-500" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">Flashcards</h4>
                <p className="text-xs sm:text-sm text-slate-600">Révisez avec des cartes mémo interactives</p>
              </div>

              <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-green-500" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">IA intégrée</h4>
                <p className="text-xs sm:text-sm text-slate-600">Génération intelligente de contenu</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
