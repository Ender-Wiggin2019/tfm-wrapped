import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/config/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Mars Color Palette
      colors: {
        mars: {
          // Primary Mars surface colors
          rust: '#C1440E',
          sienna: '#A0522D',
          oxide: '#8B4513',
          copper: '#B87333',
          terracotta: '#E2725B',
          // Deep space colors
          void: '#0A0A0F',
          abyss: '#0D1117',
          cosmos: '#161B22',
          nebula: '#1C2128',
          // Terraforming accent colors
          cyan: '#00D4FF',
          teal: '#2DD4BF',
          terraform: '#14F195',
          // Achievement/highlight colors
          gold: '#FFB800',
          amber: '#F59E0B',
          solar: '#FBBF24',
          // Atmospheric dust tones
          dust: '#D4A574',
          sand: '#C9B896',
          ochre: '#CC7722',
          // UI accent colors
          crimson: '#DC2626',
          scarlet: '#EF4444',
        },
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body: ['Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Mars-themed gradients
        'mars-surface': 'linear-gradient(135deg, #1a0a00 0%, #2d1810 25%, #4a2c1f 50%, #3d1f15 75%, #1a0a00 100%)',
        'mars-atmosphere': 'linear-gradient(180deg, #0A0A0F 0%, #1C1008 40%, #3D1F15 70%, #C1440E 100%)',
        'mars-horizon': 'linear-gradient(180deg, #0D1117 0%, #1a0a00 30%, #8B4513 60%, #C1440E 80%, #E2725B 100%)',
        'terraform-glow': 'radial-gradient(ellipse at center, rgba(45, 212, 191, 0.15) 0%, transparent 70%)',
        'dust-storm': 'linear-gradient(135deg, rgba(212, 165, 116, 0.1) 0%, transparent 50%, rgba(201, 184, 150, 0.05) 100%)',
        'grid-pattern': 'linear-gradient(rgba(45, 212, 191, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(45, 212, 191, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      boxShadow: {
        'mars-glow': '0 0 60px -15px rgba(193, 68, 14, 0.5)',
        'terraform-glow': '0 0 40px -10px rgba(45, 212, 191, 0.4)',
        'gold-glow': '0 0 30px -5px rgba(255, 184, 0, 0.5)',
        'inner-glow': 'inset 0 0 30px rgba(193, 68, 14, 0.2)',
        'crater': 'inset 0 2px 20px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(193, 68, 14, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-right': 'slideRight 0.5s ease-out forwards',
        'scale-up': 'scaleUp 0.5s ease-out forwards',
        'grow-up': 'growUp 0.8s ease-out forwards',
        'count-up': 'countUp 0.8s ease-out forwards',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        // Mars-specific animations
        'dust-drift': 'dustDrift 20s linear infinite',
        'dust-drift-slow': 'dustDrift 35s linear infinite',
        'atmosphere-pulse': 'atmospherePulse 8s ease-in-out infinite',
        'terraform-scan': 'terraformScan 3s ease-in-out infinite',
        'solar-flare': 'solarFlare 4s ease-in-out infinite',
        'orbit': 'orbit 60s linear infinite',
        'data-stream': 'dataStream 2s linear infinite',
        'horizon-glow': 'horizonGlow 6s ease-in-out infinite',
        'crater-pulse': 'craterPulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        growUp: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(193, 68, 14, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(193, 68, 14, 0.6)' },
        },
        // Mars-specific keyframes
        dustDrift: {
          '0%': { transform: 'translateX(-100%) translateY(0)' },
          '100%': { transform: 'translateX(100vw) translateY(-20px)' },
        },
        atmospherePulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        terraformScan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        solarFlare: {
          '0%, 100%': { filter: 'brightness(1) saturate(1)' },
          '50%': { filter: 'brightness(1.2) saturate(1.3)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(150px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(150px) rotate(-360deg)' },
        },
        dataStream: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        horizonGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        craterPulse: {
          '0%, 100%': { boxShadow: 'inset 0 2px 20px rgba(0, 0, 0, 0.5), 0 0 0 rgba(193, 68, 14, 0)' },
          '50%': { boxShadow: 'inset 0 2px 20px rgba(0, 0, 0, 0.5), 0 0 20px rgba(193, 68, 14, 0.3)' },
        },
      },
      borderRadius: {
        'crater': '40% 60% 55% 45% / 55% 45% 60% 40%',
      },
    },
  },
  plugins: [],
}
export default config
