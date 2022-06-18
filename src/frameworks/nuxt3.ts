import { Framework } from '../types';
import { setupConfigFile } from './steps/nuxt3';

const NuxtJS: Framework = {
  requiredDependencies: [
    'tailwindcss',
    'postcss@latest',
    'autoprefixer@latest',
  ],
  initCommands: ['npx tailwindcss init'],
  cssLocation: './assets/css/main.css',
  content: {
    name: 'tailwind.config.js',
    files: [
      './components/**/*.{js,vue,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './app.vue',
      './plugins/**/*.{js,ts}',
    ],
  },
  steps: [setupConfigFile],
};

export default NuxtJS;
