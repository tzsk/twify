import { Framework } from '../types';
import { setupWelcomePage } from './steps/laravel';

const Laravel: Framework = {
  requiredDependencies: ['tailwindcss', 'postcss', 'autoprefixer'],
  initCommands: ['npx tailwindcss init -p'],
  cssLocation: './resources/css/app.css',
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.{js,jsx,ts,tsx,vue,svelte}',
  ],
  steps: [setupWelcomePage],
};

export default Laravel;
