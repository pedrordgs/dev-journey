import { useEffect, useRef, forwardRef } from 'react'
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
  monthYear: string
  repos: Repository[]
  startIndex: number
  year: string
}

interface RepositoryCardProps {
  repo: Repository
}

const RepositoryCard = forwardRef<HTMLDivElement, RepositoryCardProps>(
  ({ repo }, ref) => {
    return (
      <Card
        ref={ref}
        className="opacity-0 hover:shadow-md transition-shadow max-h-36 overflow-hidden"
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{repo.name}</span>
              </CardTitle>
              {repo.description && (
                <CardDescription className="mt-1 line-clamp-2">
                  {repo.description}
                </CardDescription>
              )}
            </div>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
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
                  className="w-3 h-3 rounded-full flex-shrink-0"
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
    )
  }
)

RepositoryCard.displayName = 'RepositoryCard'

interface SingleRepoItemProps {
  repo: Repository
  index: number
}

function SingleRepoItem({ repo, index }: SingleRepoItemProps) {
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
      observer.disconnect()
    }
  }, [isRight])

  return (
    <div className="relative min-h-32">
      <div
        className={
          isRight
            ? 'absolute left-1/2 top-3 w-80 transform translate-x-16'
            : 'absolute right-1/2 top-3 w-80 transform -translate-x-16'
        }
      >
        <RepositoryCard ref={cardRef} repo={repo} />
      </div>
    </div>
  )
}

export function TimelineItem({
  monthYear,
  repos,
  startIndex,
  year,
}: TimelineItemProps) {
  return (
    <div className="relative scroll-mt-24" data-year={year} id={`monthYear-${monthYear.replace(' ', '-').toLowerCase()}`}>
      {/* Month/Year checkpoint - shown only once per group */}
      <div className="absolute left-1/2 top-0 z-10 transform -translate-x-1/2 text-sm font-medium text-primary bg-background px-2 py-1 rounded border">
        {monthYear}
      </div>

      {/* All repositories for this month */}
      <div className="space-y-8 pt-12">
        {repos.map((repo, index) => (
          <SingleRepoItem
            key={repo.id}
            repo={repo}
            index={startIndex + index}
          />
        ))}
      </div>
    </div>
  )
}
