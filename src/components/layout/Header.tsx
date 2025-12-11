'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DevJourneyIcon } from '@/components/icons'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '@/components/ModeToggle'

export function Header() {
  const router = useRouter()
  const [query, setQuery] = React.useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/timeline/${query.trim()}`)
      setQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <DevJourneyIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">DevJourney</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search username..."
              className="h-9 w-[200px] pl-9 bg-muted/50 focus:bg-background transition-all focus:w-[250px]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
