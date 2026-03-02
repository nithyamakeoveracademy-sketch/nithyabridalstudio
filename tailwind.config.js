/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                luxury: {
                    black: '#0F0F0F',
                    gold: '#C9A45C',
                    lightGold: '#E6C78B',
                    nude: '#F8F5F0',
                    grey: '#AFAFAF'
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Poppins"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
