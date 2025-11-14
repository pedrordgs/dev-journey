import { cn } from './utils'

describe('utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
    })

    it('handles conditional classes', () => {
      expect(cn('class1', true && 'class2', false && 'class3')).toBe(
        'class1 class2'
      )
    })

    it('merges conflicting Tailwind classes', () => {
      expect(cn('px-2', 'px-4')).toBe('px-4')
    })

    it('handles empty inputs', () => {
      expect(cn()).toBe('')
    })

    it('handles undefined and null values', () => {
      expect(cn('class1', undefined, null, 'class2')).toBe('class1 class2')
    })

    it('handles array inputs', () => {
      expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3')
    })

    it('handles object inputs', () => {
      expect(cn({ class1: true, class2: false }, 'class3')).toBe(
        'class1 class3'
      )
    })
  })
})
