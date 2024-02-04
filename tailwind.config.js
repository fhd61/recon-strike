import { fontFamily } from "tailwindcss/defaultTheme";
import { addDynamicIconSelectors } from "@iconify/tailwind";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	plugins: [
		addDynamicIconSelectors(),
	],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				primary: {
					50: '#f6e6db',
					100: '#f4ddcf',
					200: '#f1d5c3',
					300: '#e8bb9e',
					400: '#d78956',
					500: '#c6560d',
					600: '#b24d0c',
					700: '#95410a',
					800: '#773408',
					900: '#612a06',
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					50: '#eae4fb',
					100: '#e3dbfa',
					200: '#ddd2f9',
					300: '#c8b7f5',
					400: '#9e82ee',
					500: '#754ce6',
					600: '#6944cf',
					700: '#5839ad',
					800: '#462e8a',
					900: '#392571',
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				tertiary: {
					50: '#dbedfb',
					100: '#cfe7fa',
					200: '#c3e2f9',
					300: '#9ed0f5',
					400: '#56acee',
					500: '#0d89e7',
					600: '#0c7bd0',
					700: '#0a67ad',
					800: '#08528b',
					900: '#064371',
				},
				success: {
					50: '#dcf1e4',
					100: '#d0eddb',
					200: '#c5e8d2',
					300: '#a2dab7',
					400: '#5cbf80',
					500: '#16a34a',
					600: '#149343',
					700: '#117a38',
					800: '#0d622c',
					900: '#0b5024',
				},
				warning: {
					50: '#fcf4da',
					100: '#fbf0ce',
					200: '#faecc1',
					300: '#f7e19c',
					400: '#f0ca52',
					500: '#eab308',
					600: '#d3a107',
					700: '#b08606',
					800: '#8c6b05',
					900: '#735804',
				},
				error: {
					50: '#fadede',
					100: '#f8d4d4',
					200: '#f6c9c9',
					300: '#f1a8a8',
					400: '#e76767',
					500: '#dc2626',
					600: '#c62222',
					700: '#a51d1d',
					800: '#841717',
					900: '#6c1313',
				},
				surface: {
					50: '#dadada',
					100: '#cecece',
					200: '#c2c2c2',
					300: '#9d9d9d',
					400: '#535353',
					500: '#090909',
					600: '#080808',
					700: '#070707',
					800: '#050505',
					900: '#040404',
				},
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	},
};

export default config;
