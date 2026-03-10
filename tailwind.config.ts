
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      scale: {
        '130': '1.3',
      },
      fontFamily: {
        sans: ['SF Pro Display', 'Inter', 'sans-serif'],
        heading: ['SF Pro Display', 'Montserrat', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        'mono-dm': ['"DM Mono"', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // Liquid Glass color system
        'crystal-white': '#F8FAFC',
        'liquid-slate': '#0F172A',
        'mist-blue': '#DCE7F5',
        'photon-silver': '#CBD5E1',
        'glow-indigo': '#6366F1',
        'neon-mint': '#A7F3D0',
        'alert-coral': '#F87171',
        nextgen: {
          dark: '#1A1F2C',
          gray: '#8E9196',
          purple: '#9b87f5',
          lightPurple: '#7E69AB',
          blue: '#1EAEDB',
          white: '#FFFFFF',
        },
        // Agent specific colors with liquid glass variants
        'miles': {
          primary: '#3B82F6',
          glow: '#3B82F640',
          mist: '#3B82F620'
        },
        'giselle': {
          primary: '#10B981',
          glow: '#10B98140',
          mist: '#10B98120'
        },
        'devon': {
          primary: '#8B5CF6',
          glow: '#8B5CF640',
          mist: '#8B5CF620'
        },
        'alma': {
          primary: '#FACC15',
          glow: '#FACC1540',
          mist: '#FACC1520'
        },
        'health-amber': {
          DEFAULT: '#F5A623',
          dim: 'rgba(245, 166, 35, 0.4)',
          glow: 'rgba(245, 166, 35, 0.15)',
        },
        'health-bg': '#07090f',
        'health-text': {
          main: '#dde3ee',
          mid: '#8899b8',
          dim: '#5a6680',
        }
      },
      fontSize: {
        'display': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'display-lg': ['60px', { lineHeight: '1.1', fontWeight: '700' }],
        'headline': ['30px', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-lg': ['40px', { lineHeight: '1.2', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
        'caption-lg': ['14px', { lineHeight: '1.4', fontWeight: '400' }]
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'liquid': '16px',
        'button': '6px'
      },
      backdropBlur: {
        'liquid': '24px'
      },
      boxShadow: {
        'liquid': '0 8px 32px rgba(15, 23, 42, 0.12)',
        'liquid-lg': '0 16px 48px rgba(15, 23, 42, 0.18)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'agent-glow': '0 0 24px var(--agent-glow-color, rgba(99, 102, 241, 0.3))'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-up': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-8px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(155, 135, 245, 0.4)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(155, 135, 245, 0.6)' }
        },
        'pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' }
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' }
        },
        'breathing': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' }
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg) translateX(2px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(2px) rotate(-360deg)' }
        },
        'micro-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' }
        },
        'liquid-shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        },
        'tubelight': {
          '0%': { opacity: '0', transform: 'scaleX(0)' },
          '100%': { opacity: '1', transform: 'scaleX(1)' }
        },
        'glow': {
          '0%': { opacity: '0.4' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.4' }
        },
        'shimmer': {
          "0%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        'mega-menu-in': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-4px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '30%': { transform: 'translate(3%, -15%)' },
          '50%': { transform: 'translate(12%, 9%)' },
          '70%': { transform: 'translate(9%, 4%)' },
          '90%': { transform: 'translate(-1%, 7%)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scale-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.7s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.2s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.7s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.7s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'breathing': 'breathing 3s ease-in-out infinite',
        'orbit': 'orbit 8s linear infinite',
        'micro-bounce': 'micro-bounce 2s ease-in-out infinite',
        'liquid-shimmer': 'liquid-shimmer 3s ease-in-out infinite',
        'tubelight': 'tubelight 0.3s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': "shimmer 3s linear infinite",
        'mega-menu': 'mega-menu-in 0.4s ease-out forwards',
        'grain': 'grain 8s steps(10) infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'scale-pulse': 'scale-pulse 3s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'apple-ease': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
