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
                primary: {
                    DEFAULT: '#F4A460',
                    light: '#FFD700',
                    dark: '#CD853F',
                },
                secondary: {
                    DEFAULT: '#228B22',
                    light: '#32CD32',
                    dark: '#006400',
                },
                accent: {
                    DEFAULT: '#DC143C',
                    light: '#FF6347',
                    dark: '#8B0000',
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

