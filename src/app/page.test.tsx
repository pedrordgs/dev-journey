import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './page'
import { fetchUserRepos } from '@/lib/github'

// Mock the github module
jest.mock('@/lib/github', () => ({
  fetchUserRepos: jest.fn(),
  getGroupedReposWithSortedYears: jest.fn(() => ({
    reposByYear: {},
    sortedYears: [],
  })),
  getLanguageColor: jest.fn(() => '#586069'),
}))

const mockFetchUserRepos = fetchUserRepos as jest.MockedFunction<
  typeof fetchUserRepos
>

describe('Home', () => {
  beforeEach(() => {
    mockFetchUserRepos.mockClear()
  })

  it('renders the initial UI', () => {
    render(<Home />)

    expect(screen.getByText('GitHub Timeline')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Visualize your GitHub repository timeline. Enter a username to see their development journey.'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Enter GitHub username')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Generate Timeline' })
    ).toBeInTheDocument()
  })

  it('shows loading state when submitting username', async () => {
    const user = userEvent.setup()
    mockFetchUserRepos.mockImplementation(() => new Promise(() => {})) // Never resolves

    render(<Home />)

    const input = screen.getByPlaceholderText('Enter GitHub username')
    const button = screen.getByRole('button', { name: 'Generate Timeline' })

    await user.type(input, 'testuser')
    await user.click(button)

    expect(button).toHaveTextContent('Loading...')
    expect(input).toBeDisabled()
    expect(button).toBeDisabled()
  })

  it('displays repositories when fetch is successful', async () => {
    const user = userEvent.setup()
    const mockRepos = [
      {
        id: 1,
        name: 'repo1',
        full_name: 'testuser/repo1',
        html_url: 'https://github.com/testuser/repo1',
        description: 'Test repo',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        pushed_at: '2023-01-01T00:00:00Z',
        language: 'JavaScript',
        fork: false,
        archived: false,
        disabled: false,
        private: false,
      },
    ]

    mockFetchUserRepos.mockResolvedValue(mockRepos)

    render(<Home />)

    const input = screen.getByPlaceholderText('Enter GitHub username')
    const button = screen.getByRole('button', { name: 'Generate Timeline' })

    await user.type(input, 'testuser')
    await user.click(button)

    await waitFor(() => {
      expect(
        screen.getByText("testuser's Repository Timeline")
      ).toBeInTheDocument()
      expect(screen.getByText('1 repositories found')).toBeInTheDocument()
    })

    expect(mockFetchUserRepos).toHaveBeenCalledWith('testuser')
  })

  it('displays error for user not found (404)', async () => {
    const user = userEvent.setup()
    const error = { status: 404 }
    mockFetchUserRepos.mockRejectedValue(error)

    render(<Home />)

    const input = screen.getByPlaceholderText('Enter GitHub username')
    const button = screen.getByRole('button', { name: 'Generate Timeline' })

    await user.type(input, 'nonexistentuser')
    await user.click(button)

    await waitFor(() => {
      expect(
        screen.getByText(
          'User "nonexistentuser" not found. Please check the username and try again.'
        )
      ).toBeInTheDocument()
    })
  })

  it('displays error for rate limit exceeded (403)', async () => {
    const user = userEvent.setup()
    const error = { status: 403 }
    mockFetchUserRepos.mockRejectedValue(error)

    render(<Home />)

    const input = screen.getByPlaceholderText('Enter GitHub username')
    const button = screen.getByRole('button', { name: 'Generate Timeline' })

    await user.type(input, 'testuser')
    await user.click(button)

    await waitFor(() => {
      expect(
        screen.getByText('API rate limit exceeded. Please try again later.')
      ).toBeInTheDocument()
    })
  })

  it('displays generic error for other API errors', async () => {
    const user = userEvent.setup()
    const error = { status: 500 }
    mockFetchUserRepos.mockRejectedValue(error)

    render(<Home />)

    const input = screen.getByPlaceholderText('Enter GitHub username')
    const button = screen.getByRole('button', { name: 'Generate Timeline' })

    await user.type(input, 'testuser')
    await user.click(button)

    await waitFor(() => {
      expect(
        screen.getByText('Failed to fetch repositories. Please try again.')
      ).toBeInTheDocument()
    })
  })

  it('displays unexpected error message', async () => {
    const user = userEvent.setup()
    mockFetchUserRepos.mockRejectedValue(new Error('Network error'))

    render(<Home />)

    const input = screen.getByPlaceholderText('Enter GitHub username')
    const button = screen.getByRole('button', { name: 'Generate Timeline' })

    await user.type(input, 'testuser')
    await user.click(button)

    await waitFor(() => {
      expect(
        screen.getByText('An unexpected error occurred. Please try again.')
      ).toBeInTheDocument()
    })
  })

  it('clears error when submitting new username', async () => {
    const user = userEvent.setup()

    // First submission fails
    mockFetchUserRepos.mockRejectedValueOnce({ status: 404 })
    render(<Home />)

    const input = screen.getByPlaceholderText('Enter GitHub username')
    const button = screen.getByRole('button', { name: 'Generate Timeline' })

    await user.type(input, 'baduser')
    await user.click(button)

    await waitFor(() => {
      expect(
        screen.getByText(
          'User "baduser" not found. Please check the username and try again.'
        )
      ).toBeInTheDocument()
    })

    // Second submission succeeds
    mockFetchUserRepos.mockResolvedValueOnce([])
    await user.clear(input)
    await user.type(input, 'gooduser')
    await user.click(button)

    await waitFor(() => {
      expect(
        screen.queryByText(
          'User "baduser" not found. Please check the username and try again.'
        )
      ).not.toBeInTheDocument()
    })
  })
})
