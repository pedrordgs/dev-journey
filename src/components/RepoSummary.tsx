import { Repository, groupReposByYear } from '@/lib/github'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'

interface RepoSummaryProps {
  repos: Repository[]
}

export function RepoSummary({ repos }: RepoSummaryProps) {
  const reposByYear = groupReposByYear(repos)
  const years = Object.keys(reposByYear).sort(
    (a, b) => parseInt(b) - parseInt(a)
  )
  const totalRepos = repos.length

  const languageStats = repos.reduce(
    (acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>
  )

  const topLanguages = Object.entries(languageStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Repository Summary
          </CardTitle>
          <CardDescription>
            Overview of your GitHub repositories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-2xl font-bold">{totalRepos}</p>
              <p className="text-sm text-muted-foreground">
                Total repositories
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">By Year</h4>
              <div className="space-y-1">
                {years.map((year) => (
                  <div key={year} className="flex justify-between text-sm">
                    <span>{year}</span>
                    <span className="font-medium">
                      {reposByYear[year].length}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Languages</CardTitle>
          <CardDescription>Most used programming languages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topLanguages.map(([language, count]) => (
              <div key={language} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm">{language}</span>
                </div>
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
