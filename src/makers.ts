import { runCommand } from './helpers';
import { PackageManager } from './types';
import { drivers } from './drivers';

export type Maker = { cmd: string; project: keyof typeof drivers };
export type SpecialMaker = (packageManager: PackageManager) => Promise<Maker>;

const globalInstallPrefix: Record<PackageManager, string> = {
  npm: 'npm install -g',
  yarn: 'yarn global add',
  pnpm: 'pnpm install -g',
};

const specialMakes: Record<string, SpecialMaker> = {
  angular: async (manager: PackageManager) => {
    await runCommand(`${globalInstallPrefix[manager]} @angular/cli`);

    return { cmd: 'ng new', project: 'Angular' };
  },
  nuxt3: async () => {
    return { cmd: 'npx nuxi@latest init', project: 'Nuxt3' };
  },
  'nuxt-3': async () => {
    return { cmd: 'npx nuxi@latest init', project: 'Nuxt3' };
  },
  laravel: async () => {
    return {
      cmd: 'composer create-project laravel/laravel',
      project: 'LaravelVite',
    };
  },
};

const regularMakes: Record<string, Maker> = {
  vite: { cmd: 'vite', project: 'Vite' },
  svelte: { cmd: 'svelte', project: 'SvelteKit' },
  remix: { cmd: 'remix', project: 'Remix' },
  next: { cmd: 'next-app', project: 'NextJS' },
  react: { cmd: 'react-app', project: 'CreateReactApp' },
  nuxt: { cmd: 'nuxt-app', project: 'Nuxt2' },
};

export async function resolveMakeCommand(args: string[]): Promise<Maker> {
  const [manager, create, project, folder, ...options] = args;
  const extra = options.join(' ');

  const special = Object.keys(specialMakes).find((key) =>
    project.toLowerCase().includes(key)
  );

  if (special) {
    const final = await specialMakes[special](manager as PackageManager);

    return {
      cmd: `${final.cmd} ${folder} ${extra}`.trim(),
      project: final.project,
    };
  }

  const regular = Object.keys(regularMakes).find((key) =>
    project.toLowerCase().includes(key)
  );

  if (regular) {
    const app = regularMakes[regular];
    return {
      cmd: `${manager} ${create} ${app.cmd}@latest ${folder} ${extra}`.trim(),
      project: app.project,
    };
  }

  throw new Error(`Could not find a make command for ${project}`);
}

export function shouldHandleCreateCommand() {
  const postCommand = process.argv.at(2);
  if (postCommand && ['create', 'npm', 'yarn', 'pnpm'].includes(postCommand)) {
    const args = [...process.argv.slice(2)];
    if (postCommand === 'create') {
      args.unshift('npm');
    }

    return args;
  }

  return false;
}
