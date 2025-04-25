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
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Montserrat', 'sans-serif'],
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
				nextgen: {
                    dark: '#1A1F2C',
                    gray: '#8E9196',
                    purple: '#9b87f5',
                    lightPurple: '#7E69AB',
                    blue: '#1EAEDB',
                    white: '#FFFFFF',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
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
                'tubelight': {
                    '0%': { opacity: '0', transform: 'scaleX(0)' },
                    '100%': { opacity: '1', transform: 'scaleX(1)' }
                },
                'glow': {
                    '0%': { opacity: '0.4' },
                    '50%': { opacity: '1' },
                    '100%': { opacity: '0.4' }
                },
                "glitch-1": {
                    "0%, 100%": { transform: "translate(0)" },
                    "20%": { transform: "translate(-2px, 2px)" },
                    "40%": { transform: "translate(-2px, -2px)" },
                    "60%": { transform: "translate(2px, 2px)" },
                    "80%": { transform: "translate(2px, -2px)" }
                },
                "glitch-2": {
                    "0%, 100%": { transform: "translate(0)" },
                    "20%": { transform: "translate(2px, -2px)" },
                    "40%": { transform: "translate(2px, 2px)" },
                    "60%": { transform: "translate(-2px, -2px)" },
                    "80%": { transform: "translate(-2px, 2px)" }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.7s ease-out forwards',
                'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
                'fade-in-left': 'fade-in-left 0.7s ease-out forwards',
                'fade-in-right': 'fade-in-right 0.7s ease-out forwards',
                'pulse-glow': 'pulse-glow 2s infinite',
                'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
                'tubelight': 'tubelight 0.3s ease-out forwards',
                'glow': 'glow 2s ease-in-out infinite',
                "glitch-1": "glitch-1 0.4s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                "glitch-2": "glitch-2 0.4s cubic-bezier(0.4, 0, 0.2, 1) infinite"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
