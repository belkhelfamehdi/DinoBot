"use client"

import { FileText, BookOpen, Sparkles, Plus, Zap, Brain, Target, Trophy, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const featureColorClasses = {
  purple: {
    border: "border-purple-500/20",
    bg: "from-purple-500/5",
    hover: "hover:border-purple-500/40",
    icon: "text-purple-500",
  },
  blue: {
    border: "border-blue-500/20",
    bg: "from-blue-500/5",
    hover: "hover:border-blue-500/40",
    icon: "text-blue-500",
  },
  pink: {
    border: "border-pink-500/20",
    bg: "from-pink-500/5",
    hover: "hover:border-pink-500/40",
    icon: "text-pink-500",
  },
  green: {
    border: "border-green-500/20",
    bg: "from-green-500/5",
    hover: "hover:border-green-500/40",
    icon: "text-green-500",
  },
  amber: {
    border: "border-amber-500/20",
    bg: "from-amber-500/5",
    hover: "hover:border-amber-500/40",
    icon: "text-amber-500",
  },
  cyan: {
    border: "border-cyan-500/20",
    bg: "from-cyan-500/5",
    hover: "hover:border-cyan-500/40",
    icon: "text-cyan-500",
  },
} as const

type FeatureColor = keyof typeof featureColorClasses

const features: Array<{ icon: React.ElementType; title: string; desc: string; color: FeatureColor }> = [
  { icon: FileText, title: "Fiches complètes", desc: "Définitions, formules et exemples détaillés", color: "purple" },
  { icon: BookOpen, title: "Flashcards", desc: "Cartes mémo interactives avec rotation 3D", color: "blue" },
  { icon: Target, title: "Quiz interactif", desc: "Teste tes connaissances avec correction instantanée", color: "pink" },
  { icon: Brain, title: "IA intelligente", desc: "Contenu généré adapté à ton niveau", color: "green" },
  { icon: Sparkles, title: "Personnalisable", desc: "Difficulté et prompts personnalisables", color: "amber" },
  { icon: BookOpen, title: "Base de cours", desc: "Accède à tous tes cours en un clic", color: "cyan" },
]

export default function HomePage() {
  const [ficheCount, setFicheCount] = useState(0)

  useEffect(() => {
    const count = localStorage.length
    const generatedCount = Array.from({ length: count }).filter((_, i) => {
      const key = localStorage.key(i)
      return key?.startsWith("generatedFicheData_")
    }).length
    setFicheCount(generatedCount)
  }, [])

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <section className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Propulsé par l&apos;IA</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
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
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <Plus className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Créer une fiche</h3>
              <p className="text-sm text-muted-foreground">Génère une nouvelle fiche de révision personnalisée</p>
            </Link>

            <Link
              href="/fiches"
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mes fiches</h3>
              <p className="text-sm text-muted-foreground">Consulte toutes tes fiches sauvegardées</p>
            </Link>

            <Link
              href="/cours"
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mes cours</h3>
              <p className="text-sm text-muted-foreground">Accède à tes cours détaillés par matière</p>
            </Link>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Brain, value: ficheCount.toString(), label: "Fiches générées", colorClass: "text-purple-500", bgClass: "bg-purple-500/20" },
              { icon: Zap, value: "4", label: "Matières disponibles", colorClass: "text-blue-500", bgClass: "bg-blue-500/20" },
              { icon: Target, value: "3", label: "Modes de révision", colorClass: "text-pink-500", bgClass: "bg-pink-500/20" },
              { icon: Trophy, value: "IA", label: "Groq + Llama", colorClass: "text-green-500", bgClass: "bg-green-500/20" },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-background/60 backdrop-blur border border-border text-center">
                <div className={`w-12 h-12 rounded-xl ${stat.bgClass} flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className={`w-6 h-6 ${stat.colorClass}`} />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </section>

          <section className="mb-16">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-500" />
              Fonctionnalités
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, i) => {
                const c = featureColorClasses[feature.color]
                return (
                  <div
                    key={i}
                    className={`p-5 rounded-2xl border ${c.border} bg-gradient-to-br ${c.bg} to-transparent ${c.hover} transition-all`}
                  >
                    <feature.icon className={`w-6 h-6 ${c.icon} mb-3`} />
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
              <span className="text-3xl">🦕</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Prêt à réviser ?</h3>
            <p className="text-muted-foreground mb-6">Commence par créer ta première fiche de révision</p>
            <Link
              href="/fiches/creer-fiche"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              Créer ma première fiche
            </Link>
          </section>
        </div>
      </main>

      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">DinoBot © 2024 — Propulsé par l&apos;IA Groq</p>
        </div>
      </footer>
    </div>
  )
}
