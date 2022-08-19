import { Framework } from '../types';
import { setupConfigFile } from './steps/nuxt2';

const NuxtJS: Framework = {
  requiredDependencies: [
    'tailwindcss',
    'postcss@latest',
    'autoprefixer@latest',
    '@nuxt/postcss8',
  ],
  initCommands: ['npx tailwindcss init'],
  cssLocation: './assets/css/main.css',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  steps: [setupConfigFile],
};

export default NuxtJS;
