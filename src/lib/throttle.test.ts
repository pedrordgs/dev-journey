import { throttle } from './throttle'

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should execute the function immediately on first call', () => {
    const mockFn = jest.fn()
    const throttled = throttle(mockFn, 100)

    throttled()

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should throttle subsequent calls within the delay period', () => {
    const mockFn = jest.fn()
    const throttled = throttle(mockFn, 100)

    throttled()
    throttled()
    throttled()

    // Only the first call should execute immediately
    expect(mockFn).toHaveBeenCalledTimes(1)

    // Fast-forward time
    jest.advanceTimersByTime(100)

    // The scheduled call should execute
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('should pass arguments correctly', () => {
    const mockFn = jest.fn()
    const throttled = throttle(mockFn, 100)

    throttled('arg1', 'arg2')

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
  })

  it('should execute after the delay period has passed', () => {
    const mockFn = jest.fn()
    const throttled = throttle(mockFn, 100)

    throttled() // First call - executes immediately

    jest.advanceTimersByTime(50) // 50ms passed
    throttled() // Second call - should be scheduled

    expect(mockFn).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(50) // Another 50ms passed (100ms total from first call)

    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('should allow execution after delay has elapsed', () => {
    const mockFn = jest.fn()
    const throttled = throttle(mockFn, 100)

    throttled() // First call
    expect(mockFn).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(100) // Wait for delay to pass

    throttled() // Second call - should execute immediately since delay has passed
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('should use the latest arguments when throttled call executes', () => {
    const mockFn = jest.fn()
    const throttled = throttle(mockFn, 100)

    throttled('first')
    throttled('second')
    throttled('third')

    // Only first call executed
    expect(mockFn).toHaveBeenCalledWith('first')

    jest.advanceTimersByTime(100)

    // Latest call (third) should be used
    expect(mockFn).toHaveBeenLastCalledWith('third')
  })
})
