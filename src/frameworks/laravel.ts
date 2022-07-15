import { Framework } from '../types';
import { setupWelcomePage } from './steps/laravel';

const Laravel: Framework = {
  requiredDependencies: [
    'tailwindcss',
    'postcss',
    'autoprefixer',
    'prettier',
    'prettier-plugin-tailwindcss',
  ],
  initCommands: ['npx tailwindcss init -p'],
  cssLocation: './resources/css/app.css',
  content: {
    name: 'tailwind.config.js',
    files: [
      './resources/**/*.blade.php',
      './resources/**/*.{js,jsx,ts,tsx,vue,svelte}',
    ],
  },
  steps: [setupWelcomePage],
};

export default Laravel;
