import fs from 'fs-extra';
import chalk from 'chalk';
import { Framework } from './types';
import { CSS_STUB } from './constants';
import { detectInstaller, runCommand } from './helpers';
import { setupContent } from './content';

export async function handle(framework: Framework) {
  const { requiredDependencies, initCommands, cssLocation, steps } = framework;
  const installer = detectInstaller();

  // Install required dependencies
  if (requiredDependencies.length) {
    console.log(`\nInstalling Required Dependencies...`);
    console.log(chalk.blue(`- ${requiredDependencies.join('\n- ')}`));
    await runCommand(`${installer} ${requiredDependencies.join(' ')}`);
  }

  // Run init commands
  if (initCommands.length) {
    console.log(`\nInitializing Config Files...`);
    for (const command of initCommands) {
      await runCommand(command);
    }
  }

  // Write content to cssLocation
  console.log(`\nSetting up ${chalk.blue.bold(cssLocation)}...`);
  fs.ensureFileSync(cssLocation);
  const exitingCss = fs.readFileSync(cssLocation, 'utf8');
  fs.writeFileSync(cssLocation, `${exitingCss}\n\n${CSS_STUB}`);

  await setupContent(framework);

  if (steps.length) {
    // Run process
    console.log(`\nRunning ${steps.length} step(s)...`);
    for (const stepFunc of steps) {
      await stepFunc();
    }
  }
}
