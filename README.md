# react-animated-div-css

A lightweight CSS-based animation component for React with a framer-motion-like API. Perfect for Next.js applications where you want smooth animations without the bundle size overhead of framer-motion.

## Features

- 🚀 **Lightweight**: CSS transitions instead of JS animations
- 🎯 **Performance**: Shared IntersectionObserver for optimal performance
- 🔧 **framer-motion-like API**: Familiar syntax for easy migration
- 📱 **Next.js Ready**: Works perfectly with App Router and Server Components
- 🎨 **Flexible**: Use any CSS property for animations
- 📦 **Zero Dependencies**: Only requires React
- 🛡️ **TypeScript**: Full type safety included

## Installation

```bash
npm install react-animated-div-css
# or
yarn add react-animated-div-css
# or
pnpm add react-animated-div-css
```

## Basic Usage

```tsx
import { AnimatedDiv } from 'react-animated-div-css'

function MyComponent() {
  return (
    <AnimatedDiv
      initial={{ opacity: 0, transform: 'translateY(50px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px)' }}
      transition={{ duration: 800, delay: 200 }}
    >
      <h1>Animated Content</h1>
    </AnimatedDiv>
  )
}
```

## API Reference

### AnimatedDiv Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initial` | `CSSProperties` | - | CSS properties for the initial state |
| `animate` | `CSSProperties` | - | CSS properties for the animated state |
| `transition` | `TransitionOptions` | `{}` | Animation timing configuration |
| `viewport` | `ViewportOptions` | `{}` | Intersection observer configuration |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | `{}` | Additional inline styles |
| `children` | `ReactNode` | - | Child elements to animate |

### TransitionOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `duration` | `number` | `800` | Animation duration in milliseconds |
| `delay` | `number` | `0` | Animation delay in milliseconds |
| `ease` | `string` | `'ease-out'` | CSS transition timing function |

### ViewportOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `threshold` | `number` | `0.1` | Intersection threshold (0-1) |
| `once` | `boolean` | `true` | Whether to trigger animation only once |
| `margin` | `string` | `'0px'` | Root margin for intersection observer |

## Examples

### Fade Up Animation

```tsx
<AnimatedDiv
  initial={{ opacity: 0, transform: 'translateY(50px)' }}
  animate={{ opacity: 1, transform: 'translateY(0px)' }}
  transition={{ duration: 600, delay: 300 }}
>
  <p>This text will fade up when it comes into view</p>
</AnimatedDiv>
```

### Scale Animation

```tsx
<AnimatedDiv
  initial={{ opacity: 0, transform: 'scale(0.8)' }}
  animate={{ opacity: 1, transform: 'scale(1)' }}
  transition={{ duration: 1000, ease: 'ease-in-out' }}
>
  <div className="card">Card content</div>
</AnimatedDiv>
```

### Complex Animation

```tsx
<AnimatedDiv
  initial={{ 
    opacity: 0, 
    transform: 'translateX(-100px) rotate(-10deg) scale(0.5)' 
  }}
  animate={{ 
    opacity: 1, 
    transform: 'translateX(0px) rotate(0deg) scale(1)' 
  }}
  transition={{ duration: 1200, delay: 500 }}
  viewport={{ threshold: 0.3, once: false }}
>
  <h2>Complex Animation</h2>
</AnimatedDiv>
```

### Background Color Animation

```tsx
<AnimatedDiv
  initial={{ 
    backgroundColor: '#f0f0f0', 
    transform: 'translateY(30px)' 
  }}
  animate={{ 
    backgroundColor: '#4f46e5', 
    transform: 'translateY(0px)' 
  }}
  transition={{ duration: 800 }}
  className="p-6 rounded-lg"
>
  <p className="text-white">Background animates too!</p>
</AnimatedDiv>
```

## useInView Hook

You can also use the `useInView` hook directly for custom implementations:

```tsx
import { useInView } from 'react-animated-div-css'

function CustomComponent() {
  const { ref, isInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
    delay: 100
  })

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transition: 'opacity 500ms ease-out'
      }}
    >
      Content appears when in view
    </div>
  )
}
```

## Next.js Integration

Works seamlessly with Next.js App Router. The components are marked with `'use client'` so they work as Client Components while your page components can remain Server Components:

```tsx
// app/page.tsx (Server Component)
import { AnimatedDiv } from 'react-animated-div-css'

export default function HomePage() {
  return (
    <main>
      <AnimatedDiv
        initial={{ opacity: 0, transform: 'translateY(20px)' }}
        animate={{ opacity: 1, transform: 'translateY(0px)' }}
      >
        <h1>Welcome to my site</h1>
      </AnimatedDiv>
    </main>
  )
}
```

## Migration from framer-motion

Replace framer-motion components easily:

```tsx
// Before (framer-motion)
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>

// After (react-animated-div-css)
<AnimatedDiv
  initial={{ opacity: 0, transform: 'translateY(50px)' }}
  animate={{ opacity: 1, transform: 'translateY(0px)' }}
  viewport={{ once: true }}
  transition={{ duration: 800 }}
>
```

## Performance

- **Shared IntersectionObserver**: All components share a single observer instance
- **WeakMap**: Efficient memory management for element tracking  
- **CSS Transitions**: Hardware-accelerated animations
- **Small Bundle**: ~3KB gzipped vs ~39KB for framer-motion

## Browser Support

- Modern browsers with IntersectionObserver support
- IE11+ with IntersectionObserver polyfill
- All browsers that support CSS transitions

## License

MIT © Kosuke Mizumura