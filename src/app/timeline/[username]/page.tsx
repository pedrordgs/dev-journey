'use client'

import { useEffect, useState, use } from 'react'
import { Timeline } from '@/components/Timeline'
import { Sidebar } from '@/components/Sidebar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { fetchUserRepos, fetchUser } from '@/lib/github'
import { Repository, User } from '@/lib/github'
import { AlertCircle } from 'lucide-react'
import { BackToTop } from '@/components/BackToTop'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function TimelinePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const resolvedParams = use(params)
  const username = resolvedParams.username

  const [repos, setRepos] = useState<Repository[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)

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
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      loadData()
    }
  }, [username])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">
            Loading timeline for {username}...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="flex justify-center">
            <Link href="/">
              <Button variant="outline">Go Back Home</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!user || repos.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">No repositories found</h2>
          <p className="text-muted-foreground mb-6">
            This user hasn&apos;t created any public repositories yet.
          </p>
          <Link href="/">
            <Button>Search Another User</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-8">
              <Sidebar user={user} repos={repos} />
              <div className="mt-6 text-center lg:text-left">
                <Link href="/">
                  <Button variant="outline" size="sm">
                    ← Search Another User
                  </Button>
                </Link>
              </div>
            </div>
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
      </div>
      <BackToTop />
    </div>
  )
}
