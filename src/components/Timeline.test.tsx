import { render, screen } from '@testing-library/react'
import { Timeline } from './Timeline'
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

describe('Timeline', () => {
  const mockRepos: Repository[] = [
    {
      id: 1,
      name: 'repo1',
      full_name: 'user/repo1',
      html_url: 'https://github.com/user/repo1',
      description: 'Description 1',
      created_at: '2023-01-15T00:00:00Z',
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
      description: null,
      created_at: '2023-06-01T00:00:00Z',
      updated_at: '2023-06-01T00:00:00Z',
      pushed_at: '2023-06-01T00:00:00Z',
      language: null,
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
      language: 'TypeScript',
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

  it('renders years with repository counts', () => {
    render(<Timeline repos={mockRepos} />)

    expect(screen.getByText('2023')).toBeInTheDocument()
    expect(screen.getByText('2 repositories')).toBeInTheDocument()
    expect(screen.getByText('2022')).toBeInTheDocument()
    expect(screen.getByText('1 repositories')).toBeInTheDocument()
  })

  it('renders repository cards with names and descriptions', () => {
    render(<Timeline repos={mockRepos} />)

    expect(screen.getByText('repo1')).toBeInTheDocument()
    expect(screen.getByText('Description 1')).toBeInTheDocument()
    expect(screen.getByText('repo2')).toBeInTheDocument()
    expect(screen.getByText('repo3')).toBeInTheDocument()
    expect(screen.getByText('Description 3')).toBeInTheDocument()
  })

  it('renders creation dates', () => {
    render(<Timeline repos={mockRepos} />)

    const creationDates = screen.getAllByText(/Created:/)
    expect(creationDates).toHaveLength(3)
  })

  it('renders languages when available', () => {
    render(<Timeline repos={mockRepos} />)

    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('does not render description when null', () => {
    render(<Timeline repos={mockRepos} />)

    // repo2 has no description, so it shouldn't be rendered
    const descriptions = screen.getAllByText(/Description/)
    expect(descriptions).toHaveLength(2) // Only repo1 and repo3
  })

  it('does not render language when null', () => {
    render(<Timeline repos={mockRepos} />)

    // repo2 has no language, so JavaScript and TypeScript should be present but not for repo2
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    // Should not have an extra language indicator for repo2
  })

  it('applies correct colors to language indicators', () => {
    mockGetLanguageColor.mockReturnValueOnce('#f1e05a') // JavaScript
    mockGetLanguageColor.mockReturnValueOnce('#3178c6') // TypeScript

    render(<Timeline repos={mockRepos} />)

    // Check that getLanguageColor was called for languages that exist
    expect(mockGetLanguageColor).toHaveBeenCalledWith('JavaScript')
    expect(mockGetLanguageColor).not.toHaveBeenCalledWith(null) // Should not be called for repos without language

    // The colors should be applied via inline styles
    const languageIndicators = document.querySelectorAll(
      '[style*="background-color"]'
    )
    expect(languageIndicators.length).toBe(2) // JavaScript and TypeScript (repo2 has no language)
  })

  it('renders external links', () => {
    render(<Timeline repos={mockRepos} />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3) // One for each repo
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', mockRepos[index].html_url)
      expect(link).toHaveAttribute('target', '_blank')
    })
  })

  it('handles empty repositories', () => {
    mockGetGroupedReposWithSortedYears.mockReturnValue({
      reposByYear: {},
      sortedYears: [],
    })

    const { container } = render(<Timeline repos={[]} />)
    expect(container.firstChild).toBeEmptyDOMElement()
  })
})
