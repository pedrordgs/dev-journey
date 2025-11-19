import {
  User,
  Repository,
  getGroupedReposWithSortedYears,
  getLanguageColor,
} from '@/lib/github'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  BarChart3,
  Code2,
  User as UserIcon,
  MapPin,
  Link as LinkIcon,
} from 'lucide-react'

interface SidebarProps {
  user: User
  repos: Repository[]
}

export function Sidebar({ user, repos }: SidebarProps) {
  const { reposByYear, sortedYears } = getGroupedReposWithSortedYears(repos)
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
    <div className="space-y-6 sticky top-4">
      {/* User Info Card */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar_url} alt={user.login} />
            <AvatarFallback>
              {user.login.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-xl">{user.name || user.login}</CardTitle>
            <CardDescription>@{user.login}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {user.bio && (
            <p className="text-sm text-muted-foreground">{user.bio}</p>
          )}

          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}
            {user.blog && (
              <div className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                <a
                  href={
                    user.blog.startsWith('http')
                      ? user.blog
                      : `https://${user.blog}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline truncate"
                >
                  {user.blog}
                </a>
              </div>
            )}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <UserIcon className="h-4 w-4" />
                <span className="font-medium text-foreground">
                  {user.followers}
                </span>
                <span>followers</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium text-foreground">
                  {user.following}
                </span>
                <span>following</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repo Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-5 w-5" />
            Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-2xl font-bold">{totalRepos}</p>
            <p className="text-sm text-muted-foreground">Total Repositories</p>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-sm">Repositories per Year</h4>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-2">
              {sortedYears.map((year) => (
                <div key={year} className="flex justify-between text-sm">
                  <span>{year}</span>
                  <span className="font-medium">
                    {reposByYear[year].length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Languages Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Code2 className="h-5 w-5" />
            Top Languages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topLanguages.map(([language, count]) => (
              <div key={language} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getLanguageColor(language) }}
                  />
                  <span className="text-sm">{language}</span>
                </div>
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
            {topLanguages.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No language data available
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
