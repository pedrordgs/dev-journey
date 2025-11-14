import { Repository } from '@/lib/github'
import { TimelineItem } from './TimelineItem'

interface TimelineProps {
  repos: Repository[]
}

export function Timeline({ repos }: TimelineProps) {
  const sortedRepos = [...repos].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  return (
    <div className="relative flex justify-center pb-8">
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-0.5"></div>
      <div className="space-y-24 w-full max-w-4xl">
        {sortedRepos.map((repo, index) => (
          <TimelineItem key={repo.id} repo={repo} index={index} />
        ))}
      </div>
    </div>
  )
}
