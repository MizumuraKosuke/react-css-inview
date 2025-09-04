'use client'

import React, { CSSProperties } from 'react'
import { useInView } from './useInView'
import { AnimatedDivProps } from './types'

export default function AnimatedDiv({
  children,
  className = '',
  initial,
  animate,
  transition = {},
  viewport = {},
  style = {}
}: AnimatedDivProps) {
  const {
    duration = 800,
    delay = 0,
    ease = 'ease-out'
  } = transition

  const {
    threshold = 0.1,
    once = true,
    margin = '0px'
  } = viewport

  const { ref, isInView } = useInView({ 
    threshold, 
    delay, 
    triggerOnce: once,
    rootMargin: margin 
  })

  const getCurrentStyles = (): CSSProperties => {
    const currentState = isInView ? animate : initial
    
    return {
      ...style,
      ...currentState,
      transition: `all ${duration}ms ${ease}`
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={getCurrentStyles()}
    >
      {children}
    </div>
  )
}