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
