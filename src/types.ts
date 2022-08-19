import { drivers } from './drivers';

export type PackageManager = 'npm' | 'yarn' | 'pnpm';

export interface InitOptions {
  keep?: boolean;
  pretty?: boolean;
  installer?: PackageManager;
}

export interface Step {
  (): Promise<void>;
}

export interface Framework {
  requiredDependencies: string[];
  initCommands: string[];
  cssLocation: string;
  content: string[];
  steps: Step[];
}

export type DriverImport = Promise<{ default: Framework }>;

export type Driver = keyof typeof drivers;
