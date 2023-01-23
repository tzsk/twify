import { Framework } from '../types';
import { resolveCssLocation } from './steps/solid';

const Solid: Framework = {
  requiredDependencies: ['tailwindcss', 'postcss', 'autoprefixer'],
  initCommands: ['npx tailwindcss init -p'],
  cssLocation: resolveCssLocation,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  steps: [],
};

export default Solid;
