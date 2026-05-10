"use client"

import { FileText, BookOpen, Sparkles, Plus, List, Zap, Brain, Target, Trophy, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [ficheCount, setFicheCount] = useState(0)

  useEffect(() => {
    setMounted(true)
    const count = sessionStorage.length
    const generatedCount = Array.from({ length: count }).filter((_, i) => {
      const key = sessionStorage.key(i)
      return key?.startsWith('generatedFicheData_')
    }).length
    setFicheCount(generatedCount)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[80px]" />
      </div>

      <header className="sticky top-0 z-50 glass">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-2xl">🦕</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">DinoBot</h1>
              <p className="text-xs text-muted-foreground">Ton assistant de révision</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/fiches" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Mes fiches
            </Link>
            <Link href="/cours" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Cours
            </Link>
            <Link 
              href="/fiches/creer-fiche"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-105 transition-all"
            >
              Créer une fiche
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <section className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 ${mounted ? 'animate-bounce-subtle' : 'opacity-0'}`}>
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Propulsé par l'IA</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">
              Révise plus intelligemment
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Génère des fiches de révision, flashcards et quiz en quelques clics. 
              DinoBot transforme tes cours en outils de mémorisation efficaces.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Link
              href="/fiches/creer-fiche"
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                  <Plus className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Créer une fiche</h3>
                <p className="text-sm text-muted-foreground">Génère une nouvelle fiche de révision personnalisée</p>
              </div>
            </Link>

            <Link
              href="/fiches"
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  <List className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Mes fiches</h3>
                <p className="text-sm text-muted-foreground"> Consulte toutes tes fiches sauvegardées</p>
              </div>
            </Link>

            <Link
              href="/cours"
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Mes cours</h3>
                <p className="text-sm text-muted-foreground">Accède à tes cours détaillés par matière</p>
              </div>
            </Link>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="p-6 rounded-2xl glass text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-purple-500" />
              </div>
              <p className="text-2xl font-bold">{ficheCount}</p>
              <p className="text-xs text-muted-foreground">Fiches générées</p>
            </div>
            <div className="p-6 rounded-2xl glass text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">4</p>
              <p className="text-xs text-muted-foreground">Matières disponibles</p>
            </div>
            <div className="p-6 rounded-2xl glass text-center">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-pink-500" />
              </div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">Modes de révision</p>
            </div>
            <div className="p-6 rounded-2xl glass text-center">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-2xl font-bold">IA</p>
              <p className="text-xs text-muted-foreground">Groq + Llama</p>
            </div>
          </section>

          <section className="mb-16">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-500" />
              Fonctionnalités
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: FileText, title: "Fiches complètes", desc: "Définitions, formules et exemples détaillés", color: "purple" },
                { icon: BookOpen, title: "Flashcards", desc: "Cartes mémo interactives avec rotation 3D", color: "blue" },
                { icon: Target, title: "Quiz interactif", desc: "Teste tes connaissances avec correction instantanée", color: "pink" },
                { icon: Brain, title: "IA intelligente", desc: "Contenu généré adapté à ton niveau", color: "green" },
                { icon: Sparkles, title: "Personnalisable", desc: "Difficulty et prompts personnalisables", color: "amber" },
                { icon: BookOpen, title: "Base de cours", desc: "Accède à tous tes cours en un clic", color: "cyan" },
              ].map((feature, i) => (
                <div 
                  key={i}
                  className={`p-5 rounded-2xl border border-${feature.color}-500/20 bg-gradient-to-br from-${feature.color}-500/5 to-transparent hover:border-${feature.color}-500/40 transition-all`}
                >
                  <feature.icon className={`w-6 h-6 text-${feature.color}-500 mb-3`} />
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30 animate-float">
              <span className="text-3xl">🦕</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Prêt à réviser ?</h3>
            <p className="text-muted-foreground mb-6">Commence par créer ta première fiche de révision</p>
            <Link
              href="/fiches/creer-fiche"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-105 transition-all btn-shimmer"
            >
              <Plus className="w-5 h-5" />
              Créer ma première fiche
            </Link>
          </section>
        </div>
      </main>

      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            DinoBot © 2024 - Propulsé par l'IA Groq
          </p>
        </div>
      </footer>
    </div>
  )
}
