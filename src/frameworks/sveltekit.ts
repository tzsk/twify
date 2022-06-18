import { Framework } from '../types';
import { setupConfigFile, setupLayoutFile } from './steps/sveltekit';

const SvelteKit: Framework = {
  requiredDependencies: [
    'tailwindcss',
    'postcss',
    'autoprefixer',
    'svelte-preprocess',
  ],
  initCommands: [
    'npx tailwindcss init tailwind.config.cjs -p',
    'mv postcss.config.js postcss.config.cjs',
  ],
  cssLocation: './src/app.css',
  content: {
    name: 'tailwind.config.cjs',
    files: ['./src/**/*.{html,js,svelte,ts}'],
  },
  steps: [setupConfigFile, setupLayoutFile],
};

export default SvelteKit;
