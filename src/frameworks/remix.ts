import { Framework } from '../types';
import { setupIndexFile, setupPackageJson } from './steps/remix';

const Remix: Framework = {
  requiredDependencies: [
    'tailwindcss',
    'postcss',
    'autoprefixer',
    'prettier',
    'prettier-plugin-tailwindcss',
  ],
  initCommands: ['npx tailwindcss init -p'],
  content: {
    name: 'tailwind.config.js',
    files: ['./app/**/*.{js,ts,jsx,tsx}'],
  },
  cssLocation: './styles/app.css',
  steps: [setupPackageJson, setupIndexFile],
};

export default Remix;
