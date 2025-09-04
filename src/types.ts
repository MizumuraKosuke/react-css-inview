import { CSSProperties } from 'react'

export interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

export interface AnimatedDivProps {
  children: React.ReactNode
  className?: string
  initial: CSSProperties
  animate: CSSProperties
  transition?: {
    duration?: number
    delay?: number
    ease?: string
  }
  viewport?: {
    threshold?: number
    once?: boolean
    margin?: string
  }
  style?: CSSProperties
}