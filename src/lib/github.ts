import { Octokit } from '@octokit/rest'

export interface Repository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  created_at: string
  updated_at: string
  pushed_at: string
  language: string | null
  fork: boolean
  archived: boolean
  disabled: boolean
  private: boolean
}

export interface User {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string | null
  public_repos: number
}

const octokit = new Octokit()

function isUser(data: unknown): data is User {
  if (!data || typeof data !== 'object') return false
  const d = data as Record<string, unknown>
  return (
    typeof d.login === 'string' &&
    typeof d.id === 'number' &&
    typeof d.avatar_url === 'string' &&
    typeof d.html_url === 'string' &&
    (typeof d.name === 'string' || d.name === null) &&
    typeof d.public_repos === 'number'
  )
}

function isRepository(data: unknown): data is Repository {
  if (!data || typeof data !== 'object') return false
  const d = data as Record<string, unknown>
  return (
    typeof d.id === 'number' &&
    typeof d.name === 'string' &&
    typeof d.full_name === 'string' &&
    typeof d.html_url === 'string' &&
    (typeof d.description === 'string' || d.description === null) &&
    typeof d.created_at === 'string' &&
    typeof d.updated_at === 'string' &&
    typeof d.pushed_at === 'string' &&
    (typeof d.language === 'string' || d.language === null) &&
    typeof d.fork === 'boolean' &&
    typeof d.archived === 'boolean' &&
    typeof d.disabled === 'boolean' &&
    typeof d.private === 'boolean'
  )
}

export async function fetchUser(username: string): Promise<User> {
  const { data } = await octokit.users.getByUsername({ username })
  if (!isUser(data)) {
    throw new Error('Invalid user data received from GitHub API')
  }
  return data
}

export async function fetchUserRepos(username: string): Promise<Repository[]> {
  const allRepos: Repository[] = []
  let page = 1
  let fetched: unknown[] = []
  do {
    const { data } = await octokit.repos.listForUser({
      username,
      sort: 'created',
      direction: 'desc',
      per_page: 100,
      page,
    })
    // Validate that all items in the response are repositories
    if (!Array.isArray(data)) {
      throw new Error('Invalid repository data received from GitHub API')
    }
    for (const item of data) {
      if (!isRepository(item)) {
        throw new Error('Invalid repository data received from GitHub API')
      }
    }
    fetched = data
    allRepos.push(...(data as Repository[]))
    page++
  } while (fetched.length === 100)
  return allRepos
}

export function groupReposByYear(
  repos: Repository[]
): Record<string, Repository[]> {
  return repos.reduce(
    (acc, repo) => {
      const year = new Date(repo.created_at).getFullYear().toString()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(repo)
      return acc
    },
    {} as Record<string, Repository[]>
  )
}
