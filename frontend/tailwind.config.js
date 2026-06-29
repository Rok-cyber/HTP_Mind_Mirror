/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        graphite: '#374151',
        paper: '#F7F8F5',
        pearl: '#FCFCFA',
        sage: '#7A918D',
        moss: '#49675F',
        coral: '#D46A5A',
        saffron: '#D9A441',
        skyglass: '#A8C7D7'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        report: '0 24px 80px rgba(17, 24, 39, 0.10)'
      }
    }
  },
  plugins: []
};
