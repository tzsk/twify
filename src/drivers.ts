import { DriverImport } from './types';

export const drivers = {
  NextJS: (): DriverImport => import('./frameworks/nextjs'),
  Nuxt2: (): DriverImport => import('./frameworks/nuxt2'),
  Nuxt3: (): DriverImport => import('./frameworks/nuxt3'),
  Remix: (): DriverImport => import('./frameworks/remix'),
  SvelteKit: (): DriverImport => import('./frameworks/sveltekit'),
  Vite: (): DriverImport => import('./frameworks/vite'),
  Angular: (): DriverImport => import('./frameworks/angular'),
  CreateReactApp: (): DriverImport => import('./frameworks/cra'),
  LaravelVite: (): DriverImport => import('./frameworks/laravel'),
  Solid: (): DriverImport => import('./frameworks/solid'),
};
