import { render, screen } from '@testing-library/react'
import { RepoSummary } from './RepoSummary'
import { Repository } from '@/lib/github'

// Mock the github module functions
jest.mock('@/lib/github', () => ({
  getGroupedReposWithSortedYears: jest.fn(),
  getLanguageColor: jest.fn(),
}))

import { getGroupedReposWithSortedYears, getLanguageColor } from '@/lib/github'

const mockGetGroupedReposWithSortedYears =
  getGroupedReposWithSortedYears as jest.MockedFunction<
    typeof getGroupedReposWithSortedYears
  >
const mockGetLanguageColor = getLanguageColor as jest.MockedFunction<
  typeof getLanguageColor
>

describe('RepoSummary', () => {
  const mockRepos: Repository[] = [
    {
      id: 1,
      name: 'repo1',
      full_name: 'user/repo1',
      html_url: 'https://github.com/user/repo1',
      description: 'Description 1',
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
      pushed_at: '2023-01-01T00:00:00Z',
      language: 'JavaScript',
      fork: false,
      archived: false,
      disabled: false,
      private: false,
    },
    {
      id: 2,
      name: 'repo2',
      full_name: 'user/repo2',
      html_url: 'https://github.com/user/repo2',
      description: 'Description 2',
      created_at: '2023-06-01T00:00:00Z',
      updated_at: '2023-06-01T00:00:00Z',
      pushed_at: '2023-06-01T00:00:00Z',
      language: 'TypeScript',
      fork: false,
      archived: false,
      disabled: false,
      private: false,
    },
    {
      id: 3,
      name: 'repo3',
      full_name: 'user/repo3',
      html_url: 'https://github.com/user/repo3',
      description: 'Description 3',
      created_at: '2022-01-01T00:00:00Z',
      updated_at: '2022-01-01T00:00:00Z',
      pushed_at: '2022-01-01T00:00:00Z',
      language: 'JavaScript',
      fork: false,
      archived: false,
      disabled: false,
      private: false,
    },
  ]

  beforeEach(() => {
    mockGetGroupedReposWithSortedYears.mockReturnValue({
      reposByYear: {
        '2023': [mockRepos[0], mockRepos[1]],
        '2022': [mockRepos[2]],
      },
      sortedYears: ['2023', '2022'],
    })
    mockGetLanguageColor.mockImplementation((language) => {
      const colors: Record<string, string> = {
        JavaScript: '#f1e05a',
        TypeScript: '#3178c6',
        default: '#586069',
      }
      return colors[language || 'default'] || colors.default
    })
  })

  it('renders repository summary with total count', () => {
    render(<RepoSummary repos={mockRepos} />)

    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('Total repositories')).toBeInTheDocument()
  })

  it('renders repositories grouped by year', () => {
    render(<RepoSummary repos={mockRepos} />)

    expect(screen.getByText('2023')).toBeInTheDocument()
    expect(screen.getByText('2022')).toBeInTheDocument()
    // Check that the year sections contain the correct counts
    const yearSections = screen.getAllByText(/202[23]/)
    expect(yearSections).toHaveLength(2)
  })

  it('renders top languages', () => {
    render(<RepoSummary repos={mockRepos} />)

    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    // Check that the language counts are displayed
    const languageElements = screen.getAllByText(/[12]/)
    expect(languageElements.some((el) => el.textContent === '2')).toBe(true)
    expect(languageElements.some((el) => el.textContent === '1')).toBe(true)
  })

  it('renders card titles and descriptions', () => {
    render(<RepoSummary repos={mockRepos} />)

    expect(screen.getByText('Repository Summary')).toBeInTheDocument()
    expect(
      screen.getByText('Overview of your GitHub repositories')
    ).toBeInTheDocument()
    expect(screen.getByText('Top Languages')).toBeInTheDocument()
    expect(
      screen.getByText('Most used programming languages')
    ).toBeInTheDocument()
  })

  it('handles empty repositories', () => {
    mockGetGroupedReposWithSortedYears.mockReturnValue({
      reposByYear: {},
      sortedYears: [],
    })

    render(<RepoSummary repos={[]} />)

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('handles repositories without languages', () => {
    const reposWithoutLanguages: Repository[] = [
      {
        ...mockRepos[0],
        language: null,
      },
    ]

    mockGetGroupedReposWithSortedYears.mockReturnValue({
      reposByYear: { '2023': reposWithoutLanguages },
      sortedYears: ['2023'],
    })

    render(<RepoSummary repos={reposWithoutLanguages} />)

    expect(screen.getByText('Total repositories')).toBeInTheDocument()
    // Should not render any languages since all are null
    expect(screen.queryByText('JavaScript')).not.toBeInTheDocument()
  })

  it('applies correct colors to language indicators', () => {
    mockGetLanguageColor.mockReturnValueOnce('#f1e05a') // JavaScript
    mockGetLanguageColor.mockReturnValueOnce('#3178c6') // TypeScript

    render(<RepoSummary repos={mockRepos} />)

    // Check that getLanguageColor was called for each language
    expect(mockGetLanguageColor).toHaveBeenCalledWith('JavaScript')
    expect(mockGetLanguageColor).toHaveBeenCalledWith('TypeScript')

    // The colors should be applied via inline styles
    const languageIndicators = document.querySelectorAll(
      '[style*="background-color"]'
    )
    expect(languageIndicators.length).toBe(2) // JavaScript and TypeScript
  })
})
