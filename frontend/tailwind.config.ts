import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Kente-inspired colors - Gold/Yellow (primary)
                primary: {
                    DEFAULT: '#F4A460', // Sandy brown gold
                    light: '#FFD700',   // Bright gold
                    dark: '#CD853F',     // Peru gold
                },
                // Kente-inspired colors - Green (secondary)
                secondary: {
                    DEFAULT: '#228B22',  // Forest green
                    light: '#32CD32',    // Lime green
                    dark: '#006400',     // Dark green
                },
                // Kente-inspired colors - Red (accent)
                accent: {
                    DEFAULT: '#DC143C',  // Crimson red
                    light: '#FF6347',    // Tomato red
                    dark: '#8B0000',     // Dark red
                },
                // Additional kente colors
                kente: {
                    gold: '#FFD700',
                    red: '#DC143C',
                    green: '#228B22',
                    blue: '#0000CD',
                    black: '#000000',
                    white: '#FFFFFF',
                },
                foreground: '#1A1A1A',
                background: '#FFFFFF',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Playfair Display', 'serif'],
            },
        },
    },
    plugins: [],
};

export default config;
