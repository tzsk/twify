import { Framework } from '../types';
import { setupMainFile } from './steps/vite';

const Vite: Framework = {
  requiredDependencies: [
    'tailwindcss',
    'postcss',
    'autoprefixer',
    'prettier',
    'prettier-plugin-tailwindcss',
  ],
  initCommands: ['npx tailwindcss init -p'],
  cssLocation: './src/style.css',
  content: {
    name: 'tailwind.config.js',
    files: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,svelte}'],
  },
  steps: [setupMainFile],
};

export default Vite;
