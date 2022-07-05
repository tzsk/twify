import { Framework } from '../types';
import { setupMainFile } from './steps/vite';

const Vite: Framework = {
  requiredDependencies: ['tailwindcss', 'postcss', 'autoprefixer'],
  initCommands: ['npx tailwindcss init -p'],
  cssLocation: './src/style.css',
  content: {
    name: 'tailwind.config.js',
    files: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  },
  steps: [setupMainFile],
};

export default Vite;
