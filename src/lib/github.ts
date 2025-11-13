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

export async function fetchUser(username: string): Promise<User> {
  const { data } = await octokit.users.getByUsername({ username })
  return data as User
}

export async function fetchUserRepos(username: string): Promise<Repository[]> {
  const allRepos: Repository[] = [];
  let page = 1;
  let fetched: Repository[] = [];
  do {
    const { data } = await octokit.repos.listForUser({
      username,
      sort: 'created',
      direction: 'desc',
      per_page: 100,
      page,
    });
    fetched = data as Repository[];
    allRepos.push(...fetched);
    page++;
  } while (fetched.length === 100);
  return allRepos;
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

export function getGroupedReposWithSortedYears(repos: Repository[]): {
  reposByYear: Record<string, Repository[]>
  sortedYears: string[]
} {
  const reposByYear = groupReposByYear(repos)
  const sortedYears = Object.keys(reposByYear).sort(
    (a, b) => parseInt(b) - parseInt(a)
  )
  return { reposByYear, sortedYears }
}
