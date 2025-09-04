import { useCallback, useEffect, useRef, useState } from 'react'
import { UseInViewOptions } from './types'

// Shared observer instance for better performance
const observerMap = new WeakMap<HTMLElement, { 
  setIsInView: (value: boolean) => void
  delay: number
  triggerOnce: boolean
  hasTriggered: boolean 
}>()

let sharedObserver: IntersectionObserver | null = null

const getSharedObserver = (threshold: number, rootMargin: string) => {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const data = observerMap.get(entry.target as HTMLElement)
          if (!data) return

          if (entry.isIntersecting) {
            if (data.delay > 0) {
              setTimeout(() => {
                data.setIsInView(true)
              }, data.delay)
            } else {
              data.setIsInView(true)
            }
            if (data.triggerOnce) {
              data.hasTriggered = true
            }
          } else if (!data.triggerOnce && !data.hasTriggered) {
            data.setIsInView(false)
          }
        })
      },
      { threshold, rootMargin }
    )
  }
  return sharedObserver
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    triggerOnce = true, 
    delay = 0 
  } = options

  const [isInView, setIsInView] = useState(false)
  const hasTriggeredRef = useRef(false)
  const elementRef = useRef<T>(null)

  const setIsInViewCallback = useCallback((value: boolean) => {
    setIsInView(value)
  }, [])

  useEffect(() => {
    const currentElement = elementRef.current
    if (!currentElement) return

    const observer = getSharedObserver(threshold, rootMargin)
    
    // Store callback and options in WeakMap
    observerMap.set(currentElement, {
      setIsInView: setIsInViewCallback,
      delay,
      triggerOnce,
      hasTriggered: hasTriggeredRef.current
    })

    observer.observe(currentElement)

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
        observerMap.delete(currentElement)
      }
    }
  }, [threshold, rootMargin, triggerOnce, delay, setIsInViewCallback])

  return { ref: elementRef, isInView }
}
