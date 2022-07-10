import { drivers } from './drivers';

export type PackageManager = 'npm' | 'yarn' | 'pnpm';

export interface InitOptions {
  preserve?: boolean;
  installer?: PackageManager;
}

export interface Step {
  (): Promise<void>;
}

export interface Framework {
  requiredDependencies: string[];
  initCommands: string[];
  cssLocation: string;
  content: {
    name: string;
    files: string[];
  };
  steps: Step[];
}

export type DriverImport = Promise<{ default: Framework }>;

export type Driver = keyof typeof drivers;
