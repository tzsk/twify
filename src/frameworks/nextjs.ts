import { Framework } from '../types';

const NextJS: Framework = {
  requiredDependencies: ['tailwindcss', 'postcss', 'autoprefixer'],
  initCommands: ['npx tailwindcss init -p'],
  cssLocation: './styles/globals.css',
  content: {
    name: 'tailwind.config.js',
    files: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
  },
  steps: [],
};

export default NextJS;
