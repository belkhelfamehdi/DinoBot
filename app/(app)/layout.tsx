import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="dinobot-theme">
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
