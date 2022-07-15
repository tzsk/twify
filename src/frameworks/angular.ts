import { Framework } from '../types';

const Angular: Framework = {
  requiredDependencies: [
    'tailwindcss',
    'postcss',
    'autoprefixer',
    'prettier',
    'prettier-plugin-tailwindcss',
  ],
  initCommands: ['npx tailwindcss init'],
  cssLocation: './src/styles.css',
  content: {
    name: 'tailwind.config.js',
    files: ['./src/**/*.{html,ts}'],
  },
  steps: [],
};

export default Angular;
