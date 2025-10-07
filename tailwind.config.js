import PrimeUI from 'tailwindcss-primeui';

export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  plugins: [PrimeUI],
  mode: 'jit',
  theme: {
    container: {
      center: true,
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
      },
    },
  },
}
