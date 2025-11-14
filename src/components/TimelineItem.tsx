import { useEffect, useRef } from 'react'
import { Repository, getLanguageColor } from '@/lib/github'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ExternalLink, Code } from 'lucide-react'

interface TimelineItemProps {
  repo: Repository
  index: number
}

export function TimelineItem({ repo, index }: TimelineItemProps) {
  const isRight = index % 2 === 0
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              isRight ? 'animate-slide-in-right' : 'animate-slide-in-left'
            )
            entry.target.classList.remove('opacity-0')
          }
        })
      },
      { threshold: 0.1 }
    )
    const currentRef = cardRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }
    return () => {
      observer.disconnect();
    }
  }, [isRight])

  return (
    <div className="relative h-32">
      <div className="absolute left-1/2 top-0 z-10 transform -translate-x-1/2 text-sm font-medium text-primary bg-background px-2 py-1 rounded border">
        {new Date(repo.created_at).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })}
      </div>
      {isRight ? (
        <>
          <div className="absolute left-1/2 top-3 w-80 transform translate-x-16">
            <Card
              ref={cardRef}
              className="opacity-0 hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      {repo.name}
                    </CardTitle>
                    {repo.description && (
                      <CardDescription className="mt-1">
                        {repo.description}
                      </CardDescription>
                    )}
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    Created: {new Date(repo.created_at).toLocaleDateString()}
                  </span>
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: getLanguageColor(repo.language),
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <>
          <div className="absolute right-1/2 top-3 w-80 transform -translate-x-16">
            <Card
              ref={cardRef}
              className="opacity-0 hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      {repo.name}
                    </CardTitle>
                    {repo.description && (
                      <CardDescription className="mt-1">
                        {repo.description}
                      </CardDescription>
                    )}
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    Created: {new Date(repo.created_at).toLocaleDateString()}
                  </span>
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: getLanguageColor(repo.language),
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
