
# NextGen Practice Solutions Animation System Documentation

## Table of Contents
- [Introduction](#introduction)
- [Base Animations](#base-animations)
- [Hover Effects](#hover-effects)
- [Gooey Effects](#gooey-effects)
- [Chat Animations](#chat-animations)
- [Hero Animations](#hero-animations)
- [Sparkle Effects](#sparkle-effects)
- [Movement Animations](#movement-animations)
- [Best Practices](#best-practices)
- [Usage Examples](#usage-examples)

## Introduction

This document outlines the animation system used throughout the NextGen Practice Solutions website. Our animations are designed to be subtle, professional, and enhance the user experience without being distracting. All animations follow our brand guidelines of being clean, minimal, and modern.

### Animation Principles

- **Purpose**: Every animation should serve a purpose (guiding attention, providing feedback, etc.)
- **Subtlety**: Animations should be subtle and not distract from content
- **Consistency**: Maintain consistent timing and easing across similar animations
- **Performance**: Optimize animations to prevent layout thrashing and maintain 60fps

## Base Animations

Base animations include fundamental effects like fade, pulse, and beam animations that are used throughout the site.

### Available Animations

| Class | Description | Duration | Easing |
|-------|-------------|----------|--------|
| `animate-pulse-glow` | Gentle pulsing glow effect | 4s | ease-in-out |
| `animate-pulse-slow` | Slow opacity pulse | 6s | cubic-bezier |
| `animate-fade-in-up` | Fade in while moving upward | 0.8s | ease-out |
| `animate-beam` | Gentle beam/glow effect | 4s | ease-in-out |

### Example Usage

```html
<div className="animate-fade-in-up">
  Content that fades in while moving upward
</div>

<div className="animate-pulse-glow">
  Content with a subtle pulsing glow
</div>
```

## Hover Effects

Hover effects provide interactive feedback when users interact with elements.

### Available Hover Effects

| Class | Description | Behavior |
|-------|-------------|----------|
| `lamp-gradient` | Creates a lighting effect that follows cursor | Moves with cursor position |
| `folder-tab` | Folder-style tab that lifts on hover/active | Translates upward |
| `tab-highlight` | Subtle highlight effect for tabs | Changes opacity/background |

### Example Usage

```html
<button 
  className="folder-tab"
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  }}
>
  Interactive Element with Lamp Effect
</button>
```

## Gooey Effects

Gooey effects create organic, fluid interactions between elements.

### Available Gooey Effects

| Class | Description | Usage |
|-------|-------------|-------|
| `gooey-blob` | Applies a filter for blob-like effects | Use with SVG filter |
| `blob-move` | Animates the border-radius for organic movement | Works with `gooey-blob` |

### Example Usage

```html
{/* SVG Filter for Gooey Effect */}
<svg width="0" height="0" style={{ position: 'absolute' }}>
  <filter id="gooey">
    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
    <feColorMatrix
      in="blur"
      mode="matrix"
      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
      result="gooey"
    />
  </filter>
</svg>

{/* Elements with Gooey Effect */}
<div className="gooey-blob">
  <div className="blob-move">Gooey Element 1</div>
  <div className="blob-move">Gooey Element 2</div>
</div>
```

## Chat Animations

Animations specifically designed for the chat interface to create natural conversation flow.

### Available Chat Animations

| Class | Description | Timing |
|-------|-------------|--------|
| `message-appear` | Fade in and slight upward movement for chat messages | 0.5s |
| `message-appear-delayed` | Same as above but with a delay | 0.5s + 0.7s delay |

### Example Usage

```html
<div className="message-appear">
  First message appears immediately
</div>

<div className="message-appear-delayed">
  This message appears after a delay
</div>
```

## Hero Animations

Cinematic animations for hero sections and important page elements.

### Available Hero Animations

| Class | Description | Timing |
|-------|-------------|--------|
| `animate-hero-fade` | Smooth fade-in for hero elements | 0.9s |
| `animate-hero-fade-up` | Fade-in with upward movement, enhanced easing | 1.0s |
| `animate-cinematic-delay-1` | Apply delay for staggered animations | 0.7s delay |
| `animate-cinematic-delay-2` | Longer delay for sequence | 1.2s delay |

### Example Usage

```html
<h1 className="animate-hero-fade">Main Headline</h1>
<p className="animate-hero-fade-up animate-cinematic-delay-1">
  This paragraph appears slightly after the headline
</p>
<button className="animate-hero-fade-up animate-cinematic-delay-2">
  This button appears last
</button>
```

## Sparkle Effects

Special effects for highlighting important text or UI elements.

### Available Sparkle Animations

| Class | Description | Usage |
|-------|-------------|-------|
| `sparkle-container` | Container for sparkle effect | Parent element |
| `sparkle-text` | Text that will receive sparkle | Child element |
| `sparkle-overlay` | The animated overlay | Generated automatically |
| `sparkle-hidden` | Initial state | Applied by JS |
| `sparkle-visible` | Triggered state | Applied by JS |

### Example Usage

```jsx
<SparkleText>
  <h2 className="text-2xl font-bold">
    Important Heading with Sparkle Effect
  </h2>
</SparkleText>
```

## Movement Animations

Physical movement animations like floating, rippling, and rotation.

### Available Movement Animations

| Class/Animation | Description | Duration |
|----------------|-------------|----------|
| `quantum-float` | Floating with scale change | Custom timing |
| `float` | Simple vertical floating | Custom timing |
| `ripple` | Expanding circle effect | Custom timing |
| `rotate` | Continuous rotation | Custom timing |
| `scroll-transition` | Smooth scroll transition | 0.8s |

### Example Usage

```html
<div className="absolute" style={{ animation: 'float 3s ease-in-out infinite' }}>
  Floating Element
</div>

<div className="absolute" style={{ animation: 'rotate 10s linear infinite' }}>
  Rotating Element
</div>
```

## Best Practices

### Performance

- **Animate only CSS properties that are cheap to animate**: `transform` and `opacity` are best
- **Avoid animating layout properties**: `width`, `height`, `top`, `left`, etc. cause reflows
- **Use `will-change`** for complex animations that might benefit from GPU acceleration
- **Remove animation classes** when animations complete if they're not needed

### Accessibility

- **Respect user preferences**: Honor `prefers-reduced-motion` media query
- **Avoid flashing content**: Keep animations subtle to avoid triggering issues
- **Provide alternatives**: Essential information should never rely solely on animation

### Code Structure

- **Use utility classes**: Prefer applying animation classes directly in JSX
- **Customize via React props**: Pass timing or delay as props to components
- **Be consistent**: Use the same animation patterns for similar interactions

## Usage Examples

### Staggered Animation Sequence

```jsx
<div className="space-y-4">
  <div className="animate-fade-in-up" style={{ animationDelay: '0ms' }}>First item</div>
  <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>Second item</div>
  <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>Third item</div>
</div>
```

### Interactive Element with Hover Effect

```jsx
<button className="folder-tab transition-all duration-300 hover:-translate-y-1">
  Hover to lift
</button>
```

### Conditional Animation

```jsx
<div className={`transition-all duration-300 ${isActive ? 'scale-110 opacity-100' : 'scale-100 opacity-70'}`}>
  Element that reacts to state
</div>
```

### Managing Animations with React

```jsx
import { useState, useEffect } from 'react';

const AnimatedComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      This content animates in after component mounts
    </div>
  );
};
```
