import { Framework } from '../types';
import { setupIndexFile, setupPackageJson } from './steps/remix';

const Remix: Framework = {
  requiredDependencies: ['tailwindcss', 'postcss', 'autoprefixer'],
  initCommands: ['npx tailwindcss init -p'],
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  cssLocation: './styles/app.css',
  steps: [setupPackageJson, setupIndexFile],
};

export default Remix;
