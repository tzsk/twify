import { runCommand } from './helpers';
import { PackageManager } from './types';
const globalInstallPrefix: Record<PackageManager, string> = {
  npm: 'npm install -g',
  yarn: 'yarn global add',
  pnpm: 'pnpm install -g',
};

const specialMakes: Record<
  string,
  (manager: PackageManager) => Promise<string>
> = {
  angular: async (manager: PackageManager) => {
    await runCommand(`${globalInstallPrefix[manager]} @angular/cli`);

    return 'ng new';
  },
  nuxt3: async () => {
    return 'npx nuxi@latest init';
  },
  'nuxt-3': async () => {
    return 'npx nuxi@latest init';
  },
  laravel: async () => {
    return 'composer create-project laravel/laravel';
  },
};

const regularMakes: Record<string, string> = {
  vite: 'vite',
  svelte: 'svelte',
  remix: 'remix',
  next: 'next-app',
  react: 'react-app',
  nuxt: 'nuxt-app',
};

export async function resolveMakeCommand(args: string[]) {
  const [manager, create, project, folder, ...options] = args;
  const extra = options.join(' ');

  const special = Object.keys(specialMakes).find((key) =>
    project.toLowerCase().includes(key)
  );

  if (special) {
    const final = await specialMakes[special](manager as PackageManager);

    return `${final} ${folder} ${extra}`.trim();
  }

  const regular = Object.keys(regularMakes).find((key) =>
    project.toLowerCase().includes(key)
  );

  if (regular) {
    return `${manager} ${create} ${regularMakes[regular]}@latest ${folder} ${extra}`.trim();
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
