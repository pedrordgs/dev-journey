'use client'

import { useState } from 'react'
import { UsernameInput } from '@/components/UsernameInput'
import { Timeline } from '@/components/Timeline'
import { Sidebar } from '@/components/Sidebar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { fetchUserRepos, fetchUser } from '@/lib/github'
import { Repository, User } from '@/lib/github'
import { AlertCircle } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { BackToTop } from '@/components/BackToTop'

export default function Home() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUsernameSubmit = async (username: string) => {
    setLoading(true)
    setError(null)
    setUser(null)
    setRepos([])

    try {
      const [userData, userRepos] = await Promise.all([
        fetchUser(username),
        fetchUserRepos(username),
      ])
      setUser(userData)
      setRepos(userRepos)
    } catch (err) {
      if (err && typeof err === 'object' && 'status' in err) {
        const status = (err as { status: number }).status
        if (status === 404) {
          setError(
            `User "${username}" not found. Please check the username and try again.`
          )
        } else if (status === 403) {
          setError('API rate limit exceeded. Please try again later.')
        } else {
          setError('Failed to fetch data. Please try again.')
        }
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
      setRepos([])
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GithubIcon className="h-8 w-8" />
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

        {user && repos.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 xl:col-span-3">
              <Sidebar user={user} repos={repos} />
            </div>

            <div className="lg:col-span-8 xl:col-span-9">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Timeline</h2>
                <p className="text-muted-foreground">
                  A chronological view of {user.login}&apos;s repositories
                </p>
              </div>
              <Timeline repos={repos} />
            </div>
          </div>
        )}
      </div>
      <BackToTop />
    </div>
  )
}
