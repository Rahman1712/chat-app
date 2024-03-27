/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto' : ['Roboto', 'sans-serif'] ,
        'orbitron' : ['Orbitron', 'sans-serif'] ,
        'poppins' : ['Poppins', 'sans-serif'] ,
        'roboto-mono' : ['Roboto Mono', 'monospace'] ,
      }
    },
  },
  plugins: [],
}

