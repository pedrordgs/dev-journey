'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { throttle } from '@/lib/throttle'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Throttle the scroll event handler to improve performance
    // Only check visibility every 100ms instead of on every scroll event
    const throttledToggleVisibility = throttle(toggleVisibility, 100)

    window.addEventListener('scroll', throttledToggleVisibility)

    return () => {
      window.removeEventListener('scroll', throttledToggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  )
}
