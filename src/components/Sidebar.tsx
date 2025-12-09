import { useMemo, useId } from 'react'
import { User, Repository, getGroupedReposWithSortedYears } from '@/lib/github'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  User as UserIcon,
  MapPin,
  Link as LinkIcon,
} from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'

interface SidebarProps {
  user: User
  repos: Repository[]
}

export function Sidebar({ user, repos }: SidebarProps) {
  const gradientId = useId()
  const { reposByYear, sortedYears } = getGroupedReposWithSortedYears(repos)
  const totalRepos = repos.length

  const chartData = useMemo(
    () =>
      sortedYears
        .map((year) => ({
          year,
          Repositories: reposByYear[year].length,
        }))
        .reverse(),
    [reposByYear, sortedYears]
  )

  return (
    <div className="space-y-6 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto no-scrollbar">
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
            <Button className="w-full mt-4" asChild>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
            </Button>
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
            <div className="h-[200px] w-full">
              {chartData.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  No repository data available for chart.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id={gradientId}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="year"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tick={{ cursor: 'pointer' }}
                      onClick={(data) => {
                        if (data && data.value) {
                          const yearElement = document.querySelector(
                            `[data-year="${data.value}"]`
                          )
                          if (yearElement) {
                            yearElement.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start',
                            })
                          }
                        }
                      }}
                    />
                    <YAxis
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      allowDecimals={false}
                      width={30}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        borderRadius: '8px',
                        border: '1px solid hsl(var(--border))',
                      }}
                      itemStyle={{
                        color: 'hsl(var(--popover-foreground))',
                      }}
                      cursor={{
                        stroke: 'hsl(var(--muted))',
                        strokeWidth: 2,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="Repositories"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill={`url(#${gradientId})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
