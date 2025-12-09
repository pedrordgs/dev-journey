/**
 * Creates a throttled function that only invokes the provided function at most once per specified delay.
 * Subsequent calls during the delay period are ignored.
 *
 * @param func - The function to throttle
 * @param delay - The number of milliseconds to throttle invocations to
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastRan: number | null = null

  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now()

    if (lastRan === null || now - lastRan >= delay) {
      // Execute immediately if it's the first call or enough time has passed
      func.apply(this, args)
      lastRan = now
    } else {
      // Schedule execution at the end of the delay period
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(
        () => {
          func.apply(this, args)
          lastRan = Date.now()
          timeoutId = null
        },
        Math.max(0, delay - (now - lastRan))
      )
    }
  }
}
