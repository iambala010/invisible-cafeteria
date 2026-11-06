/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F5',
          100: '#F5F2EB',
          200: '#ECE6D9',
          300: '#DFD7C4',
          400: '#C8BEA5',
          500: '#ADA085',
        },
        sage: {
          50: '#F2F7F4',
          100: '#E1EDE6',
          200: '#C2DBD0',
          300: '#9BC3B3',
          400: '#6FA691',
          500: '#4D8B73',
          600: '#3A6F5B',
          700: '#2F5949',
          800: '#28473B',
          900: '#223C33',
        },
        forest: {
          500: '#1B4332',
          600: '#143628',
          700: '#0E281D',
          800: '#091D15',
          900: '#05120D',
        }
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px -2px rgba(27, 67, 50, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }
    },
  },
  plugins: [],
}

