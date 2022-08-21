import chalk from 'chalk';
import enquirer from 'enquirer';
import gradient from 'gradient-string';
import { drivers } from '../drivers';
import { detectFramework, intro } from '../helpers';
import { handle } from '../processor';
import { InitOptions } from '../types';

export const InitCommand = async (
  options: InitOptions = {},
  showIntro = true
) => {
  if (showIntro) {
    intro(true);
  }

  let detected = detectFramework();

  if (detected) {
    console.log(
      chalk.green.bold(`\n🥳 Twify Detected ${detected} as your project.\n`)
    );

    try {
      const { proceed } = await enquirer.prompt<{ proceed: boolean }>({
        type: 'confirm',
        name: 'proceed',
        message: 'Is that correct?',
        initial: true,
      });

      if (!proceed) {
        detected = undefined;
      }
    } catch (e) {
      console.log(chalk.red.bold('\n👋 Bye!'));
      return;
    }
  }

  if (!detected) {
    try {
      const { project } = await enquirer.prompt<{
        project: keyof typeof drivers;
      }>({
        type: 'select',
        name: 'project',
        choices: Object.keys(drivers),
        message: chalk.green('Choose your framework:'),
      });

      detected = project;
    } catch (e) {
      console.log(chalk.red.bold('\n👋 Bye!'));
      return;
    }
  }

  if (options.keep === undefined) {
    const result = await enquirer.prompt<{ keep: boolean }>({
      type: 'confirm',
      name: 'keep',
      message: 'Keep Existing CSS?',
      initial: false,
    });
    options.keep = result.keep;
  }

  const { default: framework } = await drivers[detected]();

  console.log(chalk.cyan.bold('\n🚀 Applying fresh quote of paint...'));
  try {
    await handle(framework, options);

    console.log(gradient.morning('\n✨ You are all set with TailwindCSS! \n'));
  } catch (e) {
    console.log(chalk.red.bold('\n😭 Unable to setup your project!\n'));
    console.log(e);
  }
};
