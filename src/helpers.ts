import fs from 'fs-extra';
import { exec, spawn, SpawnOptions } from 'child_process';
import path from 'path';
import { Driver, PackageManager } from './types';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import gradient from 'gradient-string';
import chalk from 'chalk';

export function intro(warn = false) {
  console.log(gradient.fruit('\n\n🔥 Welcome to Twify!\n'));
  console.log(
    chalk.blue.bold('- A tool to help you setup your project with TailwindCSS.')
  );

  if (warn) {
    console.log(
      chalk.underline.yellow.bold(
        `\n❯ It might reconfigure any existing setup you might have.\n❯ It is advised to be used in a new project.`
      )
    );
  }
}

export function getVersion() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pkg = fs.readJsonSync(join(__dirname, '../package.json'));

  return pkg.version;
}

export function detectFramework(): Driver | undefined {
  const { dependencies = {}, devDependencies = {} } = fs.readJsonSync(
    path.join(process.cwd(), 'package.json')
  );

  if (dependencies['next']) return 'NextJS';
  if (dependencies['@remix-run/react']) return 'Remix';
  if (dependencies['nuxt']) return 'Nuxt2';
  if (dependencies['@angular/core']) return 'Angular';
  if (dependencies['react-scripts']) return 'CreateReactApp';
  if (devDependencies['laravel-vite-plugin']) return 'LaravelVite';
  if (devDependencies['@sveltejs/kit']) return 'SvelteKit';
  if (devDependencies['nuxt']) return 'Nuxt3';
  if (devDependencies['vite']) return 'Vite';
}

export function installerPrefix(manager?: PackageManager): string {
  const npm = 'npm install --save-dev';
  const yarn = 'yarn add --dev';
  const pnpm = 'pnpm install --save-dev';

  switch (manager) {
    case 'npm':
      return npm;
    case 'yarn':
      return yarn;
    case 'pnpm':
      return pnpm;
    default:
      return fs.existsSync(path.join(process.cwd(), 'yarn.lock')) ? yarn : npm;
  }
}

export function runCommandSpawn(command: string, options: SpawnOptions = {}) {
  return new Promise((resolve, reject) => {
    const result = spawn(command, options);

    result.on('close', async () => {
      resolve(true);
    });

    result.on('error', (err) => {
      reject(err);
    });
  });
}

export function runCommand(cmd: string) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd: process.cwd() }, (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
}
