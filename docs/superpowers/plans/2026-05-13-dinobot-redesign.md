# DinoBot Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactoriser DinoBot pour avoir une sidebar partagée, localStorage, dark/light mode, et corriger tous les bugs identifiés.

**Architecture:** Création d'un route group Next.js `app/(app)/` avec un layout partagé (sidebar + ThemeProvider + background). Toutes les pages existantes sont déplacées dans ce groupe. Les headers et backgrounds dupliqués sont supprimés de chaque page.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, next-themes, shadcn/ui, @ai-sdk/groq

---

## File Map

| Fichier | Action | Responsabilité |
|---|---|---|
| `components/app-sidebar.tsx` | CRÉER | Sidebar icônes partagée avec nav + theme toggle |
| `app/(app)/layout.tsx` | CRÉER | Layout partagé : sidebar + ThemeProvider + background blobs |
| `app/(app)/page.tsx` | CRÉER (depuis `app/page.tsx`) | Accueil — fix localStorage + classes Tailwind statiques |
| `app/(app)/fiches/page.tsx` | CRÉER (depuis `app/fiches/page.tsx`) | Liste fiches — fix localStorage |
| `app/(app)/fiches/creer-fiche/page.tsx` | CRÉER (simplifié) | Sélection matière → pills cliquables uniquement |
| `app/(app)/fiches/creer-fiche/database/page.tsx` | CRÉER (depuis existant) | Config chapitre/parties — fix localStorage |
| `app/(app)/fiches/revision/page.tsx` | CRÉER (depuis existant) | Fiche + quiz — une seule barre de tabs, fix localStorage |
| `app/(app)/fiches/flashcard/page.tsx` | CRÉER (depuis existant) | Flashcards — suppression sélecteur matière, fix localStorage |
| `app/(app)/cours/page.tsx` | CRÉER (depuis existant) | Cours — suppression sidebar locale shadcn |
| `app/api/chat-fiche/route.ts` | MODIFIER | `streamText` → `generateText` |
| `app/page.tsx` | SUPPRIMER | Remplacé par `app/(app)/page.tsx` |
| `app/fiches/` | SUPPRIMER | Remplacé par `app/(app)/fiches/` |
| `app/cours/` | SUPPRIMER | Remplacé par `app/(app)/cours/` |
| `app/accueil/` | SUPPRIMER | Redirect client incorrect, inutile |

---

## Task 1 : AppSidebar component

**Files:**
- Create: `components/app-sidebar.tsx`

- [ ] **Étape 1 : Créer le fichier `components/app-sidebar.tsx`**

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, BookOpen, Plus, Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navItems = [
  { href: "/", icon: Home, label: "Accueil" },
  { href: "/fiches", icon: FileText, label: "Mes fiches" },
  { href: "/cours", icon: BookOpen, label: "Mes cours" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === "dark") setTheme("light")
    else if (theme === "light") setTheme("system")
    else setTheme("dark")
  }

  const ThemeIcon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor
  const themeLabel = theme === "dark" ? "Mode sombre" : theme === "light" ? "Mode clair" : "Système"

  return (
    <TooltipProvider delayDuration={300}>
      <aside className="fixed left-0 top-0 h-screen w-[68px] bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 z-40">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/30 mb-6 flex-shrink-0">
          🦕
        </div>

        <nav className="flex flex-col gap-1.5 items-center flex-1 w-full">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href)
            return (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Link
                    href={href}
                    className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-purple-500/15 text-purple-500"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-purple-500 rounded-r-full" />
                    )}
                    <Icon className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            )
          })}

          <div className="flex-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/fiches/creer-fiche"
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 hover:scale-105 transition-all mb-1.5 flex-shrink-0"
              >
                <Plus className="w-5 h-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Créer une fiche</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={cycleTheme}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-all flex-shrink-0"
              >
                <ThemeIcon className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">{themeLabel}</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  )
}
```

- [ ] **Étape 2 : Vérifier le build TypeScript**

```bash
cd /home/mehdibelkhelfa/Dev/Projects/DinoBot && pnpm tsc --noEmit 2>&1 | head -30
```

Attendu : pas d'erreurs sur `components/app-sidebar.tsx`

- [ ] **Étape 3 : Commit**

```bash
git add components/app-sidebar.tsx
git commit -m "feat: add shared AppSidebar component with nav and theme toggle"
```

---

## Task 2 : Route group layout

**Files:**
- Create: `app/(app)/layout.tsx`

- [ ] **Étape 1 : Créer le dossier et le fichier**

```bash
mkdir -p /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/\(app\)
```

- [ ] **Étape 2 : Créer `app/(app)/layout.tsx`**

```tsx
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="dinobot-theme">
      <div className="relative min-h-screen">
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[100px]" />
        </div>
        <AppSidebar />
        <div className="pl-[68px] min-h-screen">
          {children}
        </div>
      </div>
    </ThemeProvider>
  )
}
```

- [ ] **Étape 3 : Vérifier le build TypeScript**

```bash
cd /home/mehdibelkhelfa/Dev/Projects/DinoBot && pnpm tsc --noEmit 2>&1 | head -30
```

- [ ] **Étape 4 : Commit**

```bash
git add "app/(app)/layout.tsx"
git commit -m "feat: add (app) route group with shared sidebar layout"
```

---

## Task 3 : Page d'accueil

**Files:**
- Create: `app/(app)/page.tsx`
- Delete: `app/page.tsx`

- [ ] **Étape 1 : Créer `app/(app)/page.tsx`**

Le changement majeur : (a) `sessionStorage` → `localStorage`, (b) classes Tailwind dynamiques → mapping statique, (c) suppression du header et du background.

```tsx
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
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Propulsé par l'IA</span>
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
          <p className="text-sm text-muted-foreground">DinoBot © 2024 — Propulsé par l'IA Groq</p>
        </div>
      </footer>
    </div>
  )
}
```

- [ ] **Étape 2 : Supprimer l'ancien fichier**

```bash
rm /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/page.tsx
```

- [ ] **Étape 3 : Vérifier le build**

```bash
cd /home/mehdibelkhelfa/Dev/Projects/DinoBot && pnpm build 2>&1 | tail -20
```

Attendu : build réussi, route `/` résolue via `app/(app)/page.tsx`

- [ ] **Étape 4 : Commit**

```bash
git add "app/(app)/page.tsx" app/page.tsx
git commit -m "feat: migrate home page to (app) route group, fix localStorage and Tailwind classes"
```

---

## Task 4 : Page liste des fiches

**Files:**
- Create: `app/(app)/fiches/page.tsx`
- Delete: `app/fiches/page.tsx`

- [ ] **Étape 1 : Créer `app/(app)/fiches/page.tsx`**

Changements : `sessionStorage` → `localStorage`, suppression header + background blobs.

```tsx
"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Check, Plus, Trash2, Clock, Sparkles } from "lucide-react"
import Link from "next/link"
import { coursesData } from "@/data/courses"

interface SavedFiche {
  subject: string
  subjectId: string
  chapter: string
  createdAt: string
  subjectIcon: string
  ficheKey?: string
}

export default function ToutesLesFichesPage() {
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("Toutes")
  const [savedFiches, setSavedFiches] = useState<SavedFiche[]>([])

  useEffect(() => {
    const allFiches: SavedFiche[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith("generatedFicheData_")) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || "{}")
          if (data.chapter) {
            allFiches.push({
              subject: data.subject || "Physique-Chimie",
              subjectId: data.subjectId || "physique-chimie",
              chapter: data.chapter,
              createdAt: data.createdAt || new Date().toISOString(),
              subjectIcon: data.subjectIcon || "⚗️",
              ficheKey: key,
            })
          }
        } catch (e) {
          console.error("Error parsing saved fiche:", e)
        }
      }
    }
    setSavedFiches(allFiches)
  }, [])

  const subjects = coursesData.subjects.map((s) => ({
    id: s.id,
    name: s.name,
    icon: s.icon,
    bgColor: s.bgColor,
    color: s.color,
  }))

  const groupedByDate: Record<string, ReturnType<typeof buildFicheItem>[]> = {}

  savedFiches.forEach((fiche) => {
    const date = new Date(fiche.createdAt)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    let dateKey: string
    if (date.toDateString() === today.toDateString()) dateKey = "Aujourd'hui"
    else if (date.toDateString() === yesterday.toDateString()) dateKey = "Hier"
    else dateKey = date.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })

    if (!groupedByDate[dateKey]) groupedByDate[dateKey] = []

    const subject = coursesData.subjects.find((s) => s.id === fiche.subjectId)
    groupedByDate[dateKey].push(
      buildFicheItem(fiche, {
        color: subject?.color || "#7C3AED",
        bgColor: subject?.bgColor || "#F0E7FF",
      })
    )
  })

  const allFiches = Object.keys(groupedByDate).map((date) => ({
    date,
    items: groupedByDate[date],
  }))

  const filteredFiches =
    selectedSubject === "Toutes"
      ? allFiches
      : allFiches
          .map((g) => ({ date: g.date, items: g.items.filter((f) => f.subject === selectedSubject) }))
          .filter((g) => g.items.length > 0)

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })

  const handleDeleteFiche = (ficheKey: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    localStorage.removeItem(ficheKey)
    setSavedFiches((prev) => prev.filter((f) => f.ficheKey !== ficheKey))
  }

  const handleFicheClick = (ficheKey: string) => {
    const ficheData = localStorage.getItem(ficheKey)
    if (ficheData) {
      localStorage.setItem("generatedFicheData", ficheData)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <h1 className="text-lg font-bold flex-1">Mes fiches</h1>
          <button
            onClick={() => setIsSubjectModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm"
          >
            {selectedSubject}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <Link
            href="/fiches/creer-fiche"
            className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
          >
            <Plus className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground mb-6">
            {savedFiches.length} fiche{savedFiches.length !== 1 ? "s" : ""} sauvegardée{savedFiches.length !== 1 ? "s" : ""}
          </p>

          <div className="space-y-8">
            {filteredFiches.length === 0 ? (
              <div className="text-center py-16 bg-background/60 backdrop-blur border border-border rounded-3xl">
                <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📝</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {selectedSubject === "Toutes" ? "Aucune fiche" : `Aucune fiche ${selectedSubject}`}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {selectedSubject === "Toutes" ? "Crée ta première fiche !" : "Essaie avec une autre matière"}
                </p>
                <Link
                  href="/fiches/creer-fiche"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Créer une fiche
                </Link>
              </div>
            ) : (
              filteredFiches.map((dateGroup, idx) => (
                <div key={idx}>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {dateGroup.date}
                  </h3>
                  <div className="space-y-3">
                    {dateGroup.items.map((fiche) => (
                      <Link
                        key={fiche.id}
                        href="/fiches/revision"
                        onClick={() => handleFicheClick(fiche.ficheKey)}
                        className="block rounded-2xl bg-background/60 backdrop-blur border border-border hover:shadow-xl transition-all overflow-hidden group"
                      >
                        <div className="px-4 py-2" style={{ backgroundColor: fiche.colors.bgColor }}>
                          <p className="text-sm font-semibold" style={{ color: fiche.colors.color }}>
                            {fiche.subject} — {fiche.title}
                          </p>
                        </div>
                        <div className="px-4 py-4 flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                            style={{ backgroundColor: fiche.colors.bgColor }}
                          >
                            {fiche.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-0.5">{formatTime(fiche.createdAt)}</p>
                            <p className="font-semibold truncate">{fiche.title}</p>
                            <p className="text-xs text-muted-foreground">Généré par IA</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleDeleteFiche(fiche.ficheKey, e)}
                              className="p-2 rounded-full hover:bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <Sparkles className="w-4 h-4 text-purple-500" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {isSubjectModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center"
          onClick={() => setIsSubjectModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-background rounded-t-[2rem] md:rounded-[2rem] w-full md:max-w-md overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-background border-b border-border px-6 py-5">
              <h3 className="text-xl font-bold">Filtrer par matière</h3>
            </div>
            <div className="p-6 space-y-2 max-h-[70vh] overflow-y-auto">
              <button
                onClick={() => { setSelectedSubject("Toutes"); setIsSubjectModalOpen(false) }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  selectedSubject === "Toutes" ? "bg-muted" : "hover:bg-muted"
                }`}
              >
                <div className="text-3xl">📚</div>
                <span className="font-semibold flex-1 text-left">Toutes les matières</span>
                {selectedSubject === "Toutes" && <Check className="w-5 h-5 text-purple-500" />}
              </button>
              {subjects.map((subject) => (
                <button
                  key={subject.name}
                  onClick={() => { setSelectedSubject(subject.name); setIsSubjectModalOpen(false) }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-muted"
                  style={{ backgroundColor: selectedSubject === subject.name ? subject.bgColor : undefined }}
                >
                  <div className="text-3xl">{subject.icon}</div>
                  <span className="font-semibold flex-1 text-left" style={{ color: subject.color }}>
                    {subject.name}
                  </span>
                  {selectedSubject === subject.name && <Check className="w-5 h-5" style={{ color: subject.color }} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function buildFicheItem(
  fiche: SavedFiche,
  colors: { color: string; bgColor: string }
) {
  const date = new Date(fiche.createdAt)
  return {
    id: `fiche-${date.getTime()}`,
    ficheKey: fiche.ficheKey || `generatedFicheData_${date.getTime()}`,
    subject: fiche.subject,
    title: fiche.chapter,
    icon: fiche.subjectIcon,
    createdAt: fiche.createdAt,
    colors,
  }
}
```

- [ ] **Étape 2 : Supprimer l'ancien fichier**

```bash
rm /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/fiches/page.tsx
```

- [ ] **Étape 3 : Vérifier le build**

```bash
cd /home/mehdibelkhelfa/Dev/Projects/DinoBot && pnpm build 2>&1 | tail -20
```

- [ ] **Étape 4 : Commit**

```bash
git add "app/(app)/fiches/page.tsx" app/fiches/page.tsx
git commit -m "feat: migrate fiches list page, fix localStorage"
```

---

## Task 5 : Page créer-fiche (simplifiée)

**Files:**
- Create: `app/(app)/fiches/creer-fiche/page.tsx`
- Delete: `app/fiches/creer-fiche/page.tsx`

- [ ] **Étape 1 : Créer `app/(app)/fiches/creer-fiche/page.tsx`**

Page simplifiée : sélection de la matière par pills, suppression des options "Bientôt".

```tsx
"use client"

import { Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { coursesData } from "@/data/courses"

export default function FicheGeneratorPage() {
  const router = useRouter()

  const subjects = coursesData.subjects.map((s) => ({
    id: s.id,
    name: s.name,
    icon: s.icon,
    bgColor: s.bgColor,
    color: s.color,
  }))

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Création intelligente</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Choisir une matière</h1>
            <p className="text-muted-foreground">Sélectionne la matière pour laquelle tu veux créer une fiche</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => router.push(`/fiches/creer-fiche/database?subject=${subject.id}`)}
                className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-background/60 backdrop-blur hover:border-purple-500/40 hover:shadow-xl transition-all text-left group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: subject.bgColor }}
                >
                  {subject.icon}
                </div>
                <div>
                  <p className="font-bold" style={{ color: subject.color }}>{subject.name}</p>
                  <p className="text-sm text-muted-foreground">Générer une fiche</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Étape 2 : Supprimer l'ancien fichier**

```bash
rm /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/fiches/creer-fiche/page.tsx
```

- [ ] **Étape 3 : Supprimer les dossiers des options non fonctionnelles**

```bash
rm -rf /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/fiches/creer-fiche/fichier
rm -rf /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/fiches/creer-fiche/examen
```

- [ ] **Étape 4 : Vérifier le build**

```bash
cd /home/mehdibelkhelfa/Dev/Projects/DinoBot && pnpm build 2>&1 | tail -20
```

- [ ] **Étape 5 : Commit**

```bash
git add "app/(app)/fiches/creer-fiche/page.tsx" app/fiches/creer-fiche/
git commit -m "feat: simplify creer-fiche page, remove non-functional PDF/Exam options"
```

---

## Task 6 : Page database (configuration)

**Files:**
- Create: `app/(app)/fiches/creer-fiche/database/page.tsx`
- Delete: `app/fiches/creer-fiche/database/page.tsx`

- [ ] **Étape 1 : Créer `app/(app)/fiches/creer-fiche/database/page.tsx`**

Changements : suppression header, `sessionStorage` → `localStorage`.

```tsx
"use client"

import { useState, Suspense } from "react"
import { BookOpen, FileText, X, Sparkles, Loader2, ChevronDown } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useCourses } from "@/hooks/use-courses"
import { toast } from "sonner"

function DatabaseGeneratorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { getSubjectById, getSubjectByName, getChaptersBySubject, getPartsByChapter } = useCourses()

  const subjectParam = searchParams.get("subject") || "chimie"
  let subject = getSubjectById(subjectParam) ?? getSubjectByName(subjectParam) ?? getSubjectById("chimie")
  const subjectId = subject?.id || "chimie"
  const chapters = getChaptersBySubject(subjectId)

  const [selectedChapter, setSelectedChapter] = useState(chapters[0]?.id || "")
  const [selectedParts, setSelectedParts] = useState<string[]>([])
  const [showPartsDropdown, setShowPartsDropdown] = useState(false)
  const [difficulty, setDifficulty] = useState(2)
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)

  const availableParts = getPartsByChapter(subjectId, selectedChapter)

  const addPart = (partId: string) => {
    if (!selectedParts.includes(partId)) setSelectedParts((prev) => [...prev, partId])
    setShowPartsDropdown(false)
  }

  const removePart = (partId: string) => setSelectedParts((prev) => prev.filter((id) => id !== partId))

  const handleGenerate = async () => {
    if (selectedParts.length === 0) { toast.error("Sélectionne au moins une partie"); return }
    setLoading(true)
    try {
      const selectedChapterData = chapters.find((ch) => ch.id === selectedChapter)
      const selectedPartsData = availableParts.filter((p) => selectedParts.includes(p.id))
      const response = await fetch("/api/chat-fiche", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cours: subject?.name || "Chimie",
          chapitre: selectedChapterData?.name || "",
          parties: selectedPartsData.map((p) => p.name),
          difficulte: difficulty,
          promptPerso: prompt || undefined,
        }),
      })
      const data = await response.json()
      if (data.success) {
        const timestamp = Date.now()
        const ficheKey = `generatedFicheData_${timestamp}`
        const ficheData = JSON.stringify({
          subject: subject?.name,
          subjectId: subject?.id,
          subjectIcon: subject?.icon,
          subjectColor: subject?.color,
          subjectBgColor: subject?.bgColor,
          chapter: selectedChapterData?.name,
          parts: selectedPartsData.map((p) => p.name),
          difficulty,
          revision: data.data.revision,
          flashcards: data.data.flashcards,
          quiz: data.data.quiz,
          createdAt: new Date().toISOString(),
        })
        localStorage.setItem(ficheKey, ficheData)
        localStorage.setItem("generatedFicheData", ficheData)
        toast.success("Fiche générée avec succès !")
        router.push("/fiches/revision")
      } else {
        toast.error("Erreur lors de la génération")
      }
    } catch {
      toast.error("Erreur de connexion au serveur")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                {subject?.icon} {subject?.name}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Configure ta fiche</h1>
            <p className="text-muted-foreground">Personnalise les paramètres de génération</p>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-background/60 backdrop-blur border border-border">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <BookOpen className="w-4 h-4 text-purple-500" />
                Chapitre
              </label>
              <select
                value={selectedChapter}
                onChange={(e) => { setSelectedChapter(e.target.value); setSelectedParts([]) }}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
              >
                {chapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>{chapter.name}</option>
                ))}
              </select>
            </div>

            <div className="p-6 rounded-2xl bg-background/60 backdrop-blur border border-border">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <FileText className="w-4 h-4 text-purple-500" />
                Parties à inclure
              </label>
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2 px-4 py-3 rounded-xl bg-background border border-border min-h-[52px]">
                  {selectedParts.length === 0 && (
                    <span className="text-sm text-muted-foreground">Aucune partie sélectionnée</span>
                  )}
                  {selectedParts.map((partId) => {
                    const part = availableParts.find((p) => p.id === partId)
                    return (
                      <span key={partId} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-700 text-sm font-medium">
                        {part?.name}
                        <button onClick={() => removePart(partId)} className="hover:bg-purple-200 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )
                  })}
                  <button
                    onClick={() => setShowPartsDropdown(!showPartsDropdown)}
                    className="ml-auto p-1.5 hover:bg-muted rounded-lg transition-colors"
                  >
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                {showPartsDropdown && (
                  <div className="absolute z-10 w-full mt-2 rounded-xl bg-background/95 backdrop-blur border border-border overflow-hidden shadow-xl">
                    {availableParts
                      .filter((part) => !selectedParts.includes(part.id))
                      .map((part) => (
                        <button
                          key={part.id}
                          onClick={() => addPart(part.id)}
                          className="w-full px-4 py-3 text-left hover:bg-muted transition-colors text-sm"
                        >
                          {part.name}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-background/60 backdrop-blur border border-border">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Difficulté
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range" min="1" max="3" value={difficulty}
                  onChange={(e) => setDifficulty(Number(e.target.value))}
                  className="flex-1 accent-purple-500"
                />
                <div className="flex gap-1">
                  {[1, 2, 3].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                        difficulty === level
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {difficulty === 1 ? "Niveau débutant" : difficulty === 2 ? "Niveau intermédiaire" : "Niveau avancé"}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background/60 backdrop-blur border border-border">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Prompt personnalisé{" "}
                <span className="text-muted-foreground text-xs font-normal">(optionnel)</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ajoute des instructions spécifiques pour la génération..."
                maxLength={1000}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none min-h-[120px] resize-none transition-all"
              />
              <div className="text-right text-xs text-muted-foreground mt-1">{prompt.length}/1000</div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || selectedParts.length === 0}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Génération en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Générer ma fiche
                </span>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DatabaseGeneratorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
          <span className="text-muted-foreground">Chargement...</span>
        </div>
      </div>
    }>
      <DatabaseGeneratorContent />
    </Suspense>
  )
}
```

- [ ] **Étape 2 : Supprimer l'ancien fichier**

```bash
rm /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/fiches/creer-fiche/database/page.tsx
```

- [ ] **Étape 3 : Vérifier le build**

```bash
cd /home/mehdibelkhelfa/Dev/Projects/DinoBot && pnpm build 2>&1 | tail -20
```

- [ ] **Étape 4 : Commit**

```bash
git add "app/(app)/fiches/creer-fiche/database/page.tsx" app/fiches/creer-fiche/database/page.tsx
git commit -m "feat: migrate database config page, fix localStorage"
```

---

## Task 7 : Page révision (tabs unifiés)

**Files:**
- Create: `app/(app)/fiches/revision/page.tsx`
- Delete: `app/fiches/revision/page.tsx`

- [ ] **Étape 1 : Créer `app/(app)/fiches/revision/page.tsx`**

Changement majeur : une seule barre de tabs (Fiche · Infos clés · Flashcards · Quiz) remplace le double système de navigation. `sessionStorage` → `localStorage`.

```tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Printer, CheckCircle2, XCircle, ChevronLeft, RotateCcw, Brain } from "lucide-react"
import { toast } from "sonner"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface GeneratedData {
  subject: string
  subjectId: string
  subjectIcon: string
  subjectColor: string
  subjectBgColor: string
  chapter: string
  parts: string[]
  difficulty: number
  revision: {
    definitions: Array<{ title: string; definition: string }>
    formulas: Array<{ title: string; explanation: string; example: string }>
    examples: Array<{ question: string; answer: string }>
    revisionCards: Array<{ title: string; methods: string[] }>
    errors: Array<{ title: string; advice: string }>
  }
  flashcards: Array<{ question: string; answer: string }>
  quiz: Array<{ question: string; options: string[]; correctAnswer: number; explanation: string }>
  createdAt: string
}

type Tab = "fiche" | "infos" | "quiz"

export default function RevisionPage() {
  const [activeTab, setActiveTab] = useState<Tab>("fiche")
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null)

  useEffect(() => {
    const savedData = localStorage.getItem("generatedFicheData")
    if (savedData) setGeneratedData(JSON.parse(savedData))
  }, [])

  const quizQuestions = generatedData?.quiz || []

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (!showResults) setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answerIndex }))
  }

  const handleSubmitQuiz = () => {
    if (Object.keys(selectedAnswers).length !== quizQuestions.length) {
      toast.error("Réponds à toutes les questions")
      return
    }
    setShowResults(true)
  }

  const handleResetQuiz = () => {
    setSelectedAnswers({})
    setShowResults(false)
  }

  const calculateScore = () =>
    quizQuestions.reduce((acc, q, i) => acc + (selectedAnswers[i] === q.correctAnswer ? 1 : 0), 0)

  if (!generatedData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🦕</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Aucune fiche générée</h3>
          <p className="text-muted-foreground mb-6">Génère d'abord du contenu depuis le formulaire</p>
          <Link
            href="/fiches/creer-fiche"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
          >
            Créer une fiche
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 py-3">
            <Link href="/fiches" className="p-1.5 -ml-1.5 rounded-lg hover:bg-muted transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <span className="text-xl">{generatedData.subjectIcon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{generatedData.chapter}</p>
              <p className="text-xs text-muted-foreground">{generatedData.subject}</p>
            </div>
            <button onClick={() => window.print()} className="p-2 rounded-lg hover:bg-muted transition-colors print:hidden">
              <Printer className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-1 pb-3">
            {(["fiche", "infos", "quiz"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "hover:bg-muted text-muted-foreground"
                }`}
              >
                {tab === "fiche" ? "Fiche" : tab === "infos" ? "Infos clés" : "Quiz"}
              </button>
            ))}
            <Link
              href="/fiches/flashcard"
              className="px-4 py-1.5 rounded-full text-sm font-medium hover:bg-muted text-muted-foreground transition-all"
            >
              Flashcards
            </Link>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="max-w-3xl mx-auto">
          {activeTab === "fiche" && (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-background/60 backdrop-blur border border-border">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">1</span>
                  Définitions
                </h2>
                <div className="space-y-4">
                  {generatedData.revision.definitions.map((def, i) => (
                    <div key={i} className="pl-10">
                      <h3 className="font-semibold mb-1">{def.title}</h3>
                      <div className="text-sm text-muted-foreground prose prose-sm dark:prose-invert">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{def.definition}</ReactMarkdown>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-background/60 backdrop-blur border border-border">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm">2</span>
                  Formules
                </h2>
                <div className="space-y-4">
                  {generatedData.revision.formulas.map((f, i) => (
                    <div key={i} className="pl-10">
                      <h3 className="font-semibold mb-1">{f.title}</h3>
                      <div className="text-sm text-muted-foreground mb-2 prose prose-sm dark:prose-invert">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{f.explanation}</ReactMarkdown>
                      </div>
                      <div className="text-xs text-purple-600 font-medium bg-purple-500/10 inline-block px-2 py-1 rounded prose prose-sm">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{f.example}</ReactMarkdown>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {generatedData.revision.errors.length > 0 && (
                <div className="p-6 rounded-2xl bg-background/60 backdrop-blur border border-border">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm">!</span>
                    Erreurs fréquentes
                  </h2>
                  <div className="space-y-4">
                    {generatedData.revision.errors.map((err, i) => (
                      <div key={i} className="pl-10">
                        <h3 className="font-semibold mb-1">{err.title}</h3>
                        <div className="text-sm text-muted-foreground prose prose-sm dark:prose-invert">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{err.advice}</ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "infos" && (
            <div className="space-y-4">
              {generatedData.revision.examples.length > 0 && (
                <div className="p-6 rounded-2xl bg-background/60 backdrop-blur border border-border">
                  <h2 className="text-lg font-bold mb-4">Exemples</h2>
                  <div className="space-y-4">
                    {generatedData.revision.examples.map((ex, i) => (
                      <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/10">
                        <div className="font-medium mb-2 prose prose-sm dark:prose-invert">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{ex.question}</ReactMarkdown>
                        </div>
                        <div className="text-sm text-muted-foreground prose prose-sm dark:prose-invert">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{ex.answer}</ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {generatedData.revision.revisionCards.length > 0 && (
                <div className="p-6 rounded-2xl bg-background/60 backdrop-blur border border-border">
                  <h2 className="text-lg font-bold mb-4">Conseils de révision</h2>
                  <div className="space-y-4">
                    {generatedData.revision.revisionCards.map((card, i) => (
                      <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/10">
                        <h3 className="font-semibold mb-2">{card.title}</h3>
                        <ul className="space-y-1">
                          {card.methods.map((m, j) => (
                            <li key={j} className="text-sm text-muted-foreground flex gap-2">
                              <span className="text-green-500">✓</span>
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "quiz" && (
            <div>
              {quizQuestions.length === 0 ? (
                <div className="text-center py-12">
                  <Brain className="w-10 h-10 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Aucun quiz disponible</h3>
                  <p className="text-muted-foreground">Génère du contenu pour accéder au quiz</p>
                </div>
              ) : (
                <>
                  {!showResults && (
                    <div className="mb-6">
                      <div className="flex gap-1 mb-2">
                        {quizQuestions.map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 flex-1 rounded-full transition-all ${
                              selectedAnswers[i] !== undefined ? "bg-purple-500" : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-center text-muted-foreground">
                        {Object.keys(selectedAnswers).length} / {quizQuestions.length} répondues
                      </p>
                    </div>
                  )}
                  {showResults && (
                    <div className="mb-6 p-6 rounded-2xl bg-background/60 backdrop-blur border border-border text-center">
                      <p className="text-sm text-muted-foreground mb-2">Score final</p>
                      <div className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                        {Math.round((calculateScore() / quizQuestions.length) * 100)}%
                      </div>
                      <p className="text-muted-foreground">{calculateScore()} / {quizQuestions.length} bonnes réponses</p>
                    </div>
                  )}
                  <div className="space-y-4">
                    {quizQuestions.map((q, qIndex) => {
                      const isCorrect = selectedAnswers[qIndex] === q.correctAnswer
                      return (
                        <div key={qIndex} className="p-6 rounded-2xl bg-background/60 backdrop-blur border border-border">
                          <div className="flex items-start gap-3 mb-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                              showResults ? (isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white") : "bg-purple-500 text-white"
                            }`}>
                              {qIndex + 1}
                            </div>
                            <p className="flex-1 font-medium">{q.question}</p>
                          </div>
                          <div className="space-y-2">
                            {q.options.map((option, oIndex) => {
                              const isSelected = selectedAnswers[qIndex] === oIndex
                              const isCorrectAnswer = oIndex === q.correctAnswer
                              return (
                                <button
                                  key={oIndex}
                                  onClick={() => handleAnswerSelect(qIndex, oIndex)}
                                  disabled={showResults}
                                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                                    showResults
                                      ? isCorrectAnswer
                                        ? "border-green-500 bg-green-500/10"
                                        : isSelected
                                          ? "border-red-500 bg-red-500/10"
                                          : "border-border bg-muted/50"
                                      : isSelected
                                        ? "border-purple-500 bg-purple-500/10"
                                        : "border-border hover:border-purple-500/50"
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-3">
                                    <span className="text-sm">{option}</span>
                                    {showResults && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                                    {showResults && isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                          {showResults && (
                            <div className="mt-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                              <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-1">Explication</p>
                              <div className="text-sm text-muted-foreground prose prose-sm dark:prose-invert">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{q.explanation}</ReactMarkdown>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-6 flex justify-center">
                    {!showResults ? (
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(selectedAnswers).length !== quizQuestions.length}
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Valider mes réponses
                      </button>
                    ) : (
                      <button
                        onClick={handleResetQuiz}
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Recommencer
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Étape 2 : Supprimer l'ancien fichier**

```bash
rm /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/fiches/revision/page.tsx
```

- [ ] **Étape 3 : Vérifier le build**

```bash
cd /home/mehdibelkhelfa/Dev/Projects/DinoBot && pnpm build 2>&1 | tail -20
```

- [ ] **Étape 4 : Commit**

```bash
git add "app/(app)/fiches/revision/page.tsx" app/fiches/revision/page.tsx
git commit -m "feat: migrate revision page, unify tab bar, fix localStorage"
```

---

## Task 8 : Page flashcard

**Files:**
- Create: `app/(app)/fiches/flashcard/page.tsx`
- Delete: `app/fiches/flashcard/page.tsx`

- [ ] **Étape 1 : Créer `app/(app)/fiches/flashcard/page.tsx`**

Changements : suppression du sélecteur de matière (code mort), `sessionStorage` → `localStorage`.

```tsx
"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, RotateCcw, FlipHorizontal, Lightbulb } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface GeneratedData {
  subject: string
  chapter: string
  flashcards: Array<{ question: string; answer: string }>
}

export default function FlashcardPage() {
  const [currentFlashcard, setCurrentFlashcard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null)

  useEffect(() => {
    const savedData = localStorage.getItem("generatedFicheData")
    if (savedData) setGeneratedData(JSON.parse(savedData))
  }, [])

  const flashcards = generatedData?.flashcards || []

  const handleNextFlashcard = () => {
    setIsFlipped(false)
    setCurrentFlashcard((prev) => (prev + 1) % flashcards.length)
  }

  const handlePrevFlashcard = () => {
    setIsFlipped(false)
    setCurrentFlashcard((prev) => (prev - 1 + flashcards.length) % flashcards.length)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/fiches/revision" className="p-1.5 -ml-1.5 rounded-lg hover:bg-muted transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <p className="font-semibold">Flashcards</p>
            <p className="text-xs text-muted-foreground">{generatedData?.chapter || "Chapitre"}</p>
          </div>
          <div className="flex-1" />
          <div className="flex gap-1">
            <Link href="/fiches/revision" className="px-3 py-1.5 rounded-full text-sm hover:bg-muted text-muted-foreground transition-all">Fiche</Link>
            <span className="px-3 py-1.5 rounded-full text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium">Flashcards</span>
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-4 pb-24">
        {flashcards.length === 0 ? (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🦕</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Aucune flashcard disponible</h3>
            <p className="text-muted-foreground mb-6">Génère d'abord du contenu depuis le formulaire</p>
            <Link
              href="/fiches/creer-fiche"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
            >
              Créer une fiche
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-lg">
            <p className="text-sm text-muted-foreground text-center mb-6">
              Carte <span className="font-semibold text-purple-600">{currentFlashcard + 1}</span> sur {flashcards.length}
            </p>

            <div className="relative mb-6" style={{ minHeight: "320px" }}>
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="absolute inset-0 cursor-pointer"
                style={{ perspective: "1000px" }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-500"
                  style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl bg-background/60 backdrop-blur border border-border"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                      <FlipHorizontal className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="text-lg font-medium text-center mb-4 prose prose-sm dark:prose-invert">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{flashcards[currentFlashcard].question}</ReactMarkdown>
                    </div>
                    <p className="text-sm text-muted-foreground">Cliquez pour voir la réponse</p>
                  </div>
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <Lightbulb className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="text-lg font-medium text-center prose prose-sm dark:prose-invert">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{flashcards[currentFlashcard].answer}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevFlashcard() }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-background/60 backdrop-blur border border-border flex items-center justify-center hover:shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNextFlashcard() }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-background/60 backdrop-blur border border-border flex items-center justify-center hover:shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              {flashcards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrentFlashcard(index); setIsFlipped(false) }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentFlashcard ? "bg-purple-500 scale-125" : "bg-muted hover:bg-purple-500/50"
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-center mb-8">
              <button
                onClick={() => { setCurrentFlashcard(0); setIsFlipped(false) }}
                className="p-3 rounded-full bg-background/60 backdrop-blur border border-border hover:shadow-lg transition-all"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-purple-500" />
                Conseils de révision
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Révisez régulièrement pour mieux mémoriser</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Essayez de répondre avant de retourner la carte</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Notez les cartes difficiles pour y revenir</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
```

- [ ] **Étape 2 : Supprimer l'ancien fichier**

```bash
rm /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/fiches/flashcard/page.tsx
```

- [ ] **Étape 3 : Vérifier le build**

```bash
cd /home/mehdibelkhelfa/Dev/Projects/DinoBot && pnpm build 2>&1 | tail -20
```

- [ ] **Étape 4 : Commit**

```bash
git add "app/(app)/fiches/flashcard/page.tsx" app/fiches/flashcard/page.tsx
git commit -m "feat: migrate flashcard page, remove unused subject selector, fix localStorage"
```

---

## Task 9 : Page cours

**Files:**
- Create: `app/(app)/cours/page.tsx`
- Delete: `app/cours/page.tsx`

- [ ] **Étape 1 : Créer `app/(app)/cours/page.tsx`**

Changement majeur : suppression du `<SidebarProvider>` local shadcn, remplacement par un layout flexbox simple à deux colonnes.

```tsx
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
```

- [ ] **Étape 2 : Supprimer l'ancien fichier**

```bash
rm /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/cours/page.tsx
```

- [ ] **Étape 3 : Vérifier le build**

```bash
cd /home/mehdibelkhelfa/Dev/Projects/DinoBot && pnpm build 2>&1 | tail -20
```

- [ ] **Étape 4 : Commit**

```bash
git add "app/(app)/cours/page.tsx" app/cours/page.tsx
git commit -m "feat: migrate cours page, replace shadcn sidebar with simple flex layout"
```

---

## Task 10 : Fix API route (generateText)

**Files:**
- Modify: `app/api/chat-fiche/route.ts`

- [ ] **Étape 1 : Modifier `app/api/chat-fiche/route.ts`**

Remplacer le pattern `streamText` + boucle d'accumulation manuelle par `generateText`.

Lignes à modifier : changer l'import et la logique d'appel (lignes 1 et 112-130 dans l'original).

```ts
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { coursesData } from "@/data/courses"

export const maxDuration = 30

export async function POST(req: Request) {
  const { cours, chapitre, parties, difficulte, promptPerso } = await req.json()

  const subject = coursesData.subjects.find((s) => s.name === cours)
  const chapter = subject?.chapters.find((c) => c.name === chapitre)

  let contexte = ""
  if (chapter && parties.length > 0) {
    for (const partieName of parties) {
      const partie = chapter.parts.find((p) => p.name === partieName)
      if (partie) contexte += `\n\n## ${partie.name}\n${partie.content}`
    }
  }

  let niveauDifficulte = ""
  if (difficulte === 1) niveauDifficulte = "Utilise un langage simple et des exemples très concrets. Décompose bien chaque étape."
  else if (difficulte === 2) niveauDifficulte = "Utilise un niveau intermédiaire avec des explications claires et des exemples."
  else niveauDifficulte = "Utilise un niveau avancé avec des concepts plus complexes et des démonstrations rigoureuses."

  const systemPrompt = `Tu es DinoBot, un assistant pédagogique sympathique et expert en ${cours}. 
Tu dois créer du contenu pédagogique complet sur le chapitre "${chapitre}".

${contexte ? `Contenu du cours à utiliser :\n${contexte}` : ""}

IMPORTANT - Tu dois générer un JSON avec 3 parties :

{
  "revision": {
    "definitions": [{ "title": "Titre du concept", "definition": "Explication claire et concise" }],
    "formulas": [{ "title": "Formule mathématique", "explanation": "Ce que représente la formule", "example": "Application numérique concrète" }],
    "examples": [{ "question": "Exercice concret", "answer": "Solution détaillée étape par étape" }],
    "revisionCards": [{ "title": "Conseil méthodologique principal", "methods": ["Méthode 1", "Méthode 2", "Méthode 3", "Méthode 4", "Méthode 5"] }],
    "errors": [{ "title": "Description de l'erreur fréquente", "advice": "Comment l'éviter" }]
  },
  "flashcards": [{ "question": "Question concise et directe", "answer": "Réponse précise en 1-2 phrases max" }],
  "quiz": [{ "question": "Question du quiz", "options": ["Option 1", "Option 2", "Option 3", "Option 4"], "correctAnswer": 0, "explanation": "Explication de la bonne réponse" }]
}

Consignes :
- Crée 4-6 définitions
- Crée 3-4 formules avec exemples
- Crée 3-4 exercices types
- Crée 1-2 conseils de révision avec 5 méthodes chacun
- Crée 2-3 erreurs courantes
- Crée 8-12 flashcards
- Crée 6-10 questions de quiz (4 options chacune)
- Niveau de difficulté : ${difficulte}/3
- ${niveauDifficulte}
${promptPerso ? `- Demandes spécifiques : ${promptPerso}` : ""}

RETOURNE UNIQUEMENT LE JSON, SANS MARKDOWN NI TEXTE SUPPLÉMENTAIRE.`

  try {
    const { text: fullText } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Génère le JSON complet avec revision, flashcards et quiz." },
      ],
      temperature: 0.7,
    })

    const cleanText = fullText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
    const parsedData = JSON.parse(cleanText)

    return Response.json({
      success: true,
      data: parsedData,
      metadata: { cours, chapitre, parties, difficulte },
    })
  } catch (error) {
    console.error("Erreur génération:", error)
    return Response.json({ success: false, error: "Erreur lors de la génération" }, { status: 500 })
  }
}
```

- [ ] **Étape 2 : Vérifier le build TypeScript**

```bash
cd /home/mehdibelkhelfa/Dev/Projects/DinoBot && pnpm tsc --noEmit 2>&1 | head -20
```

- [ ] **Étape 3 : Commit**

```bash
git add app/api/chat-fiche/route.ts
git commit -m "refactor: replace streamText with generateText in chat-fiche API"
```

---

## Task 11 : Nettoyage final

**Files:**
- Delete: `app/accueil/`
- Delete: dossiers vides restants de l'ancienne structure

- [ ] **Étape 1 : Supprimer les dossiers devenus vides**

```bash
rm -rf /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/accueil
rmdir /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/fiches/creer-fiche 2>/dev/null || true
rmdir /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/fiches/revision 2>/dev/null || true
rmdir /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/fiches/flashcard 2>/dev/null || true
rmdir /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/fiches 2>/dev/null || true
rmdir /home/mehdibelkhelfa/Dev/Projects/DinoBot/app/cours 2>/dev/null || true
```

- [ ] **Étape 2 : Build complet final**

```bash
cd /home/mehdibelkhelfa/Dev/Projects/DinoBot && pnpm build 2>&1
```

Attendu : build complet sans erreurs. Routes attendues :
- `/ → app/(app)/page.tsx`
- `/fiches → app/(app)/fiches/page.tsx`
- `/fiches/creer-fiche → app/(app)/fiches/creer-fiche/page.tsx`
- `/fiches/creer-fiche/database → app/(app)/fiches/creer-fiche/database/page.tsx`
- `/fiches/revision → app/(app)/fiches/revision/page.tsx`
- `/fiches/flashcard → app/(app)/fiches/flashcard/page.tsx`
- `/cours → app/(app)/cours/page.tsx`

- [ ] **Étape 3 : Test manuel**

Lancer `pnpm dev` et vérifier :
1. La sidebar apparaît sur toutes les pages
2. Le toggle dark/light fonctionne (icône en bas de sidebar)
3. L'état actif de la sidebar se met à jour selon la page
4. Créer une fiche → vérifier dans `localStorage` via DevTools > Application > Local Storage
5. Fermer et rouvrir l'onglet → les fiches sont toujours là
6. La page `/fiches/revision` n'a plus qu'une seule barre de tabs
7. La page `/fiches/flashcard` n'a plus de sélecteur de matière
8. Les couleurs des features cards s'affichent correctement sur la homepage

- [ ] **Étape 4 : Commit final**

```bash
git add -A
git commit -m "chore: remove old page files and empty directories after route group migration"
```
