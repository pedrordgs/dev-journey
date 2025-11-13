'use client'

import { useState } from 'react'
import { UsernameInput } from '@/components/UsernameInput'
import { Timeline } from '@/components/Timeline'
import { RepoSummary } from '@/components/RepoSummary'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { fetchUserRepos } from '@/lib/github'
import { Repository } from '@/lib/github'
import { AlertCircle, Github } from 'lucide-react'

export default function Home() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentUsername, setCurrentUsername] = useState<string>('')

  const handleUsernameSubmit = async (username: string) => {
    setLoading(true)
    setError(null)
    setCurrentUsername(username)

    try {
      const userRepos = await fetchUserRepos(username)
      setRepos(userRepos)
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('404')) {
          setError(
            `User "${username}" not found. Please check the username and try again.`
          )
        } else if (err.message.includes('403')) {
          setError('API rate limit exceeded. Please try again later.')
        } else {
          setError('Failed to fetch repositories. Please try again.')
        }
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
      setRepos([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Github className="h-8 w-8" />
            <h1 className="text-4xl font-bold">GitHub Timeline</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualize your GitHub repository timeline. Enter a username to see
            their development journey.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <UsernameInput onSubmit={handleUsernameSubmit} loading={loading} />
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {repos.length > 0 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">
                {currentUsername}&apos;s Repository Timeline
              </h2>
              <p className="text-muted-foreground">
                {repos.length} repositories found
              </p>
            </div>

            <RepoSummary repos={repos} />

            <div>
              <h3 className="text-xl font-semibold mb-6">Timeline</h3>
              <Timeline repos={repos} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
