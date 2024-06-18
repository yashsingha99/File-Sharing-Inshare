/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inset': 'inset 0 4px 4px 0 rgba(0, 0, 0, 0.1)',
        // Add more custom shadows here
      },
    },
  },
  plugins: [],
}

