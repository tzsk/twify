import { Framework } from '../types';
import { movePostCSS, setupLayoutFile } from './steps/sveltekit';

const SvelteKit: Framework = {
  requiredDependencies: ['tailwindcss', 'postcss', 'autoprefixer'],
  initCommands: ['npx tailwindcss init tailwind.config.cjs -p'],
  cssLocation: './src/app.css',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  steps: [movePostCSS, setupLayoutFile],
};

export default SvelteKit;
