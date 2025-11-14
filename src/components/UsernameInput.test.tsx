import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UsernameInput } from './UsernameInput'

describe('UsernameInput', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders input and button', () => {
    render(<UsernameInput onSubmit={mockOnSubmit} />)

    expect(
      screen.getByPlaceholderText('Enter GitHub username')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Generate Timeline' })
    ).toBeInTheDocument()
  })

  it('updates username on input change', async () => {
    const user = userEvent.setup()
    render(<UsernameInput onSubmit={mockOnSubmit} />)

    const input = screen.getByPlaceholderText('Enter GitHub username')
    await user.type(input, 'testuser')

    expect(input).toHaveValue('testuser')
  })

  it('calls onSubmit with trimmed username on form submit', async () => {
    const user = userEvent.setup()
    render(<UsernameInput onSubmit={mockOnSubmit} />)

    const input = screen.getByPlaceholderText('Enter GitHub username')
    const button = screen.getByRole('button', { name: 'Generate Timeline' })

    await user.type(input, '  testuser  ')
    await user.click(button)

    expect(mockOnSubmit).toHaveBeenCalledWith('testuser')
  })

  it('does not call onSubmit with empty username', async () => {
    const user = userEvent.setup()
    render(<UsernameInput onSubmit={mockOnSubmit} />)

    const button = screen.getByRole('button', { name: 'Generate Timeline' })
    await user.click(button)

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('disables input and button when loading', () => {
    render(<UsernameInput onSubmit={mockOnSubmit} loading={true} />)

    const input = screen.getByPlaceholderText('Enter GitHub username')
    const button = screen.getByRole('button', { name: 'Loading...' })

    expect(input).toBeDisabled()
    expect(button).toBeDisabled()
  })

  it('disables button when username is empty', () => {
    render(<UsernameInput onSubmit={mockOnSubmit} />)

    const button = screen.getByRole('button', { name: 'Generate Timeline' })
    expect(button).toBeDisabled()
  })

  it('enables button when username is not empty', async () => {
    const user = userEvent.setup()
    render(<UsernameInput onSubmit={mockOnSubmit} />)

    const input = screen.getByPlaceholderText('Enter GitHub username')
    const button = screen.getByRole('button', { name: 'Generate Timeline' })

    await user.type(input, 'testuser')
    expect(button).not.toBeDisabled()
  })
})
