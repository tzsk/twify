import chalk from 'chalk';
import path from 'path';
import { intro, runCommandSpawn } from '../helpers';
import { resolveMakeCommand } from '../makers';
import { PackageManager } from '../types';
import { InitCommand } from './init';

function validateArgs(args: string[]) {
  if (args.length < 4) {
    const [, , project] = args;
    console.log(chalk.red('✘ You must specify a folder name for the project.'));
    const usage = chalk.blue(`  $ npx twify create ${project} <folderName>`);
    const usagePackage = chalk.blue(
      `  $ npx twify npm | yarn | pnpm create ${project} <folderName>`
    );
    console.log(chalk.blue(`Usage:\n${usage}\n${usagePackage}`));
    return false;
  }

  return true;
}

export const CreateCommand = async (args: string[]) => {
  intro();
  console.log('\n');

  if (!validateArgs(args)) {
    return;
  }

  const cwd = process.cwd();
  const [manager, , , folder] = args;

  try {
    const { cmd, project } = await resolveMakeCommand(args);
    await runCommandSpawn(cmd, {
      cwd,
      shell: true,
      stdio: 'inherit',
    });

    process.chdir(path.join(cwd, folder));
    await InitCommand({ installer: manager as PackageManager }, project);
  } catch (e) {
    console.log(chalk.red('✘ Error creating project.'));
    console.log(e);
  }
};
