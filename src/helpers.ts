import fs from 'fs-extra';
import { exec } from 'child_process';
import path from 'path';
import { Driver } from './types';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

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
  if (devDependencies['@sveltejs/kit']) return 'SvelteKit';
  if (devDependencies['nuxt']) return 'Nuxt3';
}

export function detectInstaller(): string {
  return fs.existsSync(path.join(process.cwd(), 'yarn.lock'))
    ? 'yarn add --dev'
    : 'npm install --save-dev';
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
