import { Framework } from '../types';
import {
  movePostCSS,
  setupConfigFile,
  setupLayoutFile,
} from './steps/sveltekit';

const SvelteKit: Framework = {
  requiredDependencies: [
    'tailwindcss',
    'postcss',
    'autoprefixer',
    'svelte-preprocess',
  ],
  initCommands: ['npx tailwindcss init tailwind.config.cjs -p'],
  cssLocation: './src/app.css',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  steps: [movePostCSS, setupConfigFile, setupLayoutFile],
};

export default SvelteKit;
