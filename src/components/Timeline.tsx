import { Repository, getGroupedReposWithSortedYears } from '@/lib/github'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Calendar, ExternalLink, Code } from 'lucide-react'

interface TimelineProps {
  repos: Repository[]
}

export function Timeline({ repos }: TimelineProps) {
  const { reposByYear, sortedYears } = getGroupedReposWithSortedYears(repos)

  return (
    <div className="space-y-8">
      {sortedYears.map((year) => (
        <div key={year} className="relative">
          <div className="flex items-center gap-4 mb-4">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">{year}</h2>
            <span className="text-muted-foreground">
              {reposByYear[year].length} repositories
            </span>
          </div>
          <div className="ml-10 space-y-4">
            {reposByYear[year].map((repo) => (
              <Card key={repo.id} className="hover:shadow-md transition-shadow">
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
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        {repo.language}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
