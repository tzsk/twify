import { Framework } from '../types';

const CreateReactApp: Framework = {
  requiredDependencies: [
    'tailwindcss',
    'postcss',
    'autoprefixer',
    'prettier',
    'prettier-plugin-tailwindcss',
  ],
  initCommands: ['npx tailwindcss init -p'],
  cssLocation: './src/index.css',
  content: {
    name: 'tailwind.config.js',
    files: ['./src/**/*.{js,jsx,ts,tsx}'],
  },
  steps: [],
};

export default CreateReactApp;
