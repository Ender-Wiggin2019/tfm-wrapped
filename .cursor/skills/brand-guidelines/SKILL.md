---
name: brand-guidelines
description: Applies the Mars Colony Design System - a sci-fi themed visual identity for Terraforming Mars Wrapped. Use it when brand colors, typography, visual formatting, or design standards apply to the project.
license: MIT
---

# Mars Colony Design System

## Overview

Official brand identity and style resources for the Terraforming Mars Wrapped annual report website. This design system captures the essence of Mars colonization with industrial terraforming station aesthetics and retro-futuristic space colony vibes.

**Keywords**: Mars theme, sci-fi design, terraforming, space colony, brand colors, typography, visual identity, dark theme

## Brand Guidelines

### Color System

#### Mars Surface Colors (Primary)

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Mars Rust | `#C1440E` | `--mars-rust` | Primary brand color, CTAs, highlights |
| Mars Sienna | `#A0522D` | `--mars-sienna` | Secondary surface tones |
| Mars Oxide | `#8B4513` | `--mars-oxide` | Darker accent, shadows |
| Mars Copper | `#B87333` | `--mars-copper` | Warm metallic accents |
| Mars Terracotta | `#E2725B` | `--mars-terracotta` | Lighter accent, hover states |

#### Deep Space Colors (Background)

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Void | `#0A0A0F` | `--space-void` | Primary background |
| Abyss | `#0D1117` | `--space-abyss` | Secondary background |
| Cosmos | `#161B22` | `--space-cosmos` | Card backgrounds |
| Nebula | `#1C2128` | `--space-nebula` | Elevated surfaces |

#### Terraforming Tech Colors (Accent)

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Cyan | `#00D4FF` | `--terraform-cyan` | Tech highlights, data |
| Teal | `#2DD4BF` | `--terraform-teal` | Success states, progress |
| Green | `#14F195` | `--terraform-green` | Active status indicators |

#### Achievement Colors (Highlight)

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Gold | `#FFB800` | `--gold-primary` | Achievements, rankings |
| Amber | `#F59E0B` | `--gold-amber` | Secondary highlights |
| Solar | `#FBBF24` | `--gold-solar` | Tertiary highlights |

#### Martian Dust Colors (Atmospheric)

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Dust | `#D4A574` | `--dust-primary` | Text, subtle elements |
| Sand | `#C9B896` | `--dust-sand` | Muted text |
| Ochre | `#CC7722` | `--dust-ochre` | Warm accents |

### Typography

#### Font Stack

| Type | Font Family | Fallback | Usage |
|------|-------------|----------|-------|
| Display | Rajdhani | sans-serif | Headings, titles, buttons |
| Body | Sora | sans-serif | Body text, paragraphs |
| Mono | JetBrains Mono | monospace | Data, code, numbers |

#### Font Loading (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Rajdhani:wght@400;500;600;700&family=Sora:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

#### Typography Scale

- **H1**: Rajdhani 700, 3rem-4.5rem, tracking-wide
- **H2**: Rajdhani 600, 1.5rem-2rem, tracking-wide
- **Body**: Sora 400, 1rem-1.25rem
- **Small**: Sora 400, 0.875rem
- **Data**: JetBrains Mono 500, tabular-nums

### Gradient Presets

#### Background Gradients

```css
/* Mars Core */
.bg-mars-core {
  background: linear-gradient(135deg, #0A0A0F 0%, rgba(193, 68, 14, 0.2) 50%, #0D1117 100%);
}

/* Mars Horizon */
.bg-mars-horizon {
  background: linear-gradient(180deg, #0A0A0F 0%, #1a0a00 30%, #8B4513 60%, #C1440E 80%, #E2725B 100%);
}

/* Mars Atmosphere */
.bg-mars-atmosphere {
  background: linear-gradient(180deg, #0A0A0F 0%, #1C1008 40%, #3D1F15 70%, #C1440E 100%);
}

/* Terraform Glow */
.bg-terraform-glow {
  background: radial-gradient(ellipse at center, rgba(45, 212, 191, 0.15) 0%, transparent 70%);
}
```

#### Text Gradients

```css
/* Mars Text */
.text-mars-gradient {
  background: linear-gradient(135deg, #E2725B 0%, #C1440E 50%, #B87333 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Gold Text */
.text-gold-gradient {
  background: linear-gradient(135deg, #FBBF24 0%, #FFB800 50%, #F59E0B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Terraform Text */
.text-terraform-gradient {
  background: linear-gradient(135deg, #00D4FF 0%, #2DD4BF 50%, #14F195 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Visual Effects

#### Glass Morphism

```css
/* Mars Glass */
.glass-mars {
  background: rgba(193, 68, 14, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(193, 68, 14, 0.15);
}

/* Dark Glass */
.glass-dark {
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

#### Glow Effects

```css
/* Mars Glow */
.shadow-mars-glow {
  box-shadow: 0 0 60px -15px rgba(193, 68, 14, 0.5);
}

/* Terraform Glow */
.shadow-terraform-glow {
  box-shadow: 0 0 40px -10px rgba(45, 212, 191, 0.4);
}

/* Gold Glow */
.shadow-gold-glow {
  box-shadow: 0 0 30px -5px rgba(255, 184, 0, 0.5);
}
```

#### Animation Presets

| Animation | Duration | Usage |
|-----------|----------|-------|
| `atmospherePulse` | 8s | Background atmosphere |
| `dustDrift` | 20s | Floating dust particles |
| `solarFlare` | 4s | Brightness pulse effect |
| `terraformScan` | 3s | Scanning line effect |
| `horizonGlow` | 6s | Bottom horizon glow |
| `dataFlicker` | 5s | CRT/terminal flicker |

### Component Styles

#### Buttons

```css
/* Primary Mars Button */
.btn-mars {
  background: linear-gradient(135deg, #C1440E 0%, #8B4513 100%);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(193, 68, 14, 0.3);
}

/* Terraform Button */
.btn-terraform {
  background: linear-gradient(135deg, #2DD4BF 0%, #00D4FF 100%);
  color: #0A0A0F;
  font-weight: 600;
}

/* Ghost Button */
.btn-ghost {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

#### Cards

```css
/* Mars Card */
.card-mars {
  background: linear-gradient(135deg, rgba(193, 68, 14, 0.1) 0%, rgba(139, 69, 19, 0.05) 100%);
  border: 1px solid rgba(193, 68, 14, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}
```

#### Inputs

```css
/* Mars Input */
.input-mars {
  background: rgba(10, 10, 15, 0.6);
  border: 1px solid rgba(193, 68, 14, 0.2);
  color: white;
}

.input-mars:focus {
  border-color: #C1440E;
  box-shadow: 0 0 0 3px rgba(193, 68, 14, 0.1);
}
```

### Atmospheric Elements

#### Mars Dust Particles
- Small (1-2px) circular particles
- Color: `#D4A574` with 40% opacity
- Animation: Horizontal drift with slight vertical movement
- Duration: 18-28 seconds per cycle

#### Horizon Glow
- Bottom gradient from `#C1440E` at 20% opacity
- Pulsing animation (6s cycle)
- Height: 30-40% of viewport

#### Terraform Grid
- 60px grid spacing
- Color: `rgba(45, 212, 191, 0.03)`
- Radial mask fading to edges

### Accessibility

- Maintain minimum contrast ratio of 4.5:1 for body text
- Use `mars-dust` (#D4A574) on dark backgrounds for readable text
- Include `prefers-reduced-motion` media query for all animations
- Add `aria-label` to all icon-only buttons

### Dark Mode

This design system is dark-mode by default. Set these on the `<html>` element:

```css
html {
  color-scheme: dark;
}
```

```html
<meta name="theme-color" content="#0A0A0F" />
<meta name="color-scheme" content="dark" />
```
