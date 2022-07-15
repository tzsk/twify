import { Framework } from '../types';

const Angular: Framework = {
  requiredDependencies: ['tailwindcss', 'postcss', 'autoprefixer'],
  initCommands: ['npx tailwindcss init'],
  cssLocation: './src/styles.css',
  content: {
    name: 'tailwind.config.js',
    files: ['./src/**/*.{html,ts}'],
  },
  steps: [],
};

export default Angular;
