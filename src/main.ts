#!/usr/bin/env node

import chalk from 'chalk';
import { Command, program } from 'commander';
import { getVersion } from './helpers';
import { InitCommand } from './commands/init';

async function runApp(app: Command) {
  app
    .name(chalk.green.bold('Twify'))
    .description(chalk.blue.bold('TailwindCSS Setup Tool'))
    .version(chalk.green.bold(getVersion()));

  app
    .command('init')
    .option(
      '-i, --installer <installer>',
      'Explicitly set the package manager to use'
    )
    .option('-p, --preserve', 'Preserve existing CSS')
    .description('Initialize TailwindCSS in the current project')
    .action(InitCommand);

  app.parse();
}

runApp(program);
