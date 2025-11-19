import { Repository } from '@/lib/github'
import { TimelineItem } from './TimelineItem'

interface TimelineProps {
  repos: Repository[]
}

interface GroupedRepos {
  monthYear: string
  repos: Repository[]
  startIndex: number
}

export function Timeline({ repos }: TimelineProps) {
  const sortedRepos = [...repos].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  // Group repositories by month and year
  const groupedRepos: GroupedRepos[] = []
  const monthYearMap = new Map<string, Repository[]>()

  sortedRepos.forEach((repo) => {
    const monthYear = new Date(repo.created_at).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    })

    if (!monthYearMap.has(monthYear)) {
      monthYearMap.set(monthYear, [])
    }
    monthYearMap.get(monthYear)!.push(repo)
  })

  // Convert map to array while maintaining order and tracking cumulative index
  let cumulativeIndex = 0
  monthYearMap.forEach((repos, monthYear) => {
    groupedRepos.push({ monthYear, repos, startIndex: cumulativeIndex })
    cumulativeIndex += repos.length
  })

  return (
    <div className="relative flex justify-center pb-8">
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-0.5"></div>
      <div className="space-y-24 w-full max-w-4xl">
        {groupedRepos.map((group) => {
          // Extract year from monthYear (e.g., "Dec 2022" -> "2022")
          const year = group.monthYear.split(' ')[1]
          return (
            <TimelineItem
              key={group.monthYear}
              monthYear={group.monthYear}
              repos={group.repos}
              startIndex={group.startIndex}
              year={year}
            />
          )
        })}
      </div>
    </div>
  )
}
