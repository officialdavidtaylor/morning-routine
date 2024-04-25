import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindcss_forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', ...defaultTheme.fontFamily.sans],
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [tailwindcss_forms],
} satisfies Config;
