import fs from 'fs-extra';
import chalk from 'chalk';
import { Framework, InitOptions } from './types';
import { CSS_STUB } from './constants';
import { installerPrefix, runCommand } from './helpers';
import { setupContent } from './content';
import ora from 'ora';

export async function handle(framework: Framework, options: InitOptions) {
  const { requiredDependencies, initCommands, cssLocation, steps } = framework;
  const installer = installerPrefix(options.installer);

  // Install required dependencies
  if (requiredDependencies.length) {
    console.log('\n');

    const spinner = ora('Installing Required Dependencies...').start();
    await runCommand(`${installer} ${requiredDependencies.join(' ')}`);
    spinner.succeed();

    console.log(chalk.blue(`- ${requiredDependencies.join('\n- ')}`));
  }

  // Installing Prettier Dependency
  if (options.pretty) {
    const prettierDependencies = ['prettier', 'prettier-plugin-tailwindcss'];
    const plugin = chalk.blue.bold('Prettier Plugin');
    const spinner = ora(`Configuring ${plugin}...`).start();
    await runCommand(`${installer} ${prettierDependencies.join(' ')}`);
    spinner.succeed();

    console.log(chalk.blue(`- ${prettierDependencies.join('\n- ')}`));
  }

  // Run init commands
  if (initCommands.length) {
    console.log(`\n`);
    const spinner = ora(
      'Initializing Tailwind & PostCSS Config Files...'
    ).start();
    for (const command of initCommands) {
      await runCommand(command);
    }
    spinner.succeed();
  }

  // Write content to cssLocation
  console.log(
    `\n${chalk.green('✔')} Setting up ${chalk.blue.bold(cssLocation)}...`
  );
  fs.ensureFileSync(cssLocation);
  const exitingCss = fs.readFileSync(cssLocation, 'utf8');
  const updatedCss = !options.keep ? CSS_STUB : `${exitingCss}\n\n${CSS_STUB}`;
  fs.writeFileSync(cssLocation, updatedCss);

  await setupContent(framework);

  if (steps.length) {
    // Run process
    console.log(`\n${chalk.green('✔')} Running ${steps.length} step(s)...`);
    for (const stepFunc of steps) {
      await stepFunc();
    }
  }
}
