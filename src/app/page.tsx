'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UsernameInput } from '@/components/UsernameInput'
import { GithubIcon } from '@/components/icons'
import { History, GitBranch, Star } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleUsernameSubmit = (username: string) => {
    setIsNavigating(true)
    router.push(`/timeline/${username}`)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/30 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 py-16 text-center">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="bg-card/50 backdrop-blur-xl p-4 rounded-2xl inline-block shadow-lg border border-border/50 mb-6">
            <GithubIcon className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            GitHub Timeline
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Visualize your development journey.
            <br className="hidden md:block" />
            Turn your repositories into a beautiful, chronological story.
          </p>
        </div>

        <div className="w-full max-w-md mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="bg-card p-6 rounded-xl shadow-xl border border-border">
            <UsernameInput
              onSubmit={handleUsernameSubmit}
              loading={isNavigating}
            />
            <p className="text-xs text-muted-foreground mt-4">
              Try entering your username or a friend&apos;s to see their
              timeline.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <FeatureCard
            icon={<History className="w-6 h-6" />}
            title="Chronological View"
            description="See your repositories organized by date, giving you a clear view of your history."
          />
          <FeatureCard
            icon={<GitBranch className="w-6 h-6" />}
            title="Language Stats"
            description="Analyze your most used languages and see how your tech stack evolved."
          />
          <FeatureCard
            icon={<Star className="w-6 h-6" />}
            title="Visual Insights"
            description="Get a beautiful overview of your work with charts and timeline visualizations."
          />
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border/40 bg-background/50 backdrop-blur-sm">
        <p>
          © {new Date().getFullYear()} GitHub Timeline. Built for developers.
        </p>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl hover:bg-accent/50 transition-colors">
      <div className="mb-4 p-3 bg-background rounded-full shadow-sm text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
