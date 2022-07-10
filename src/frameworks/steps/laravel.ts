import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

export async function setupWelcomePage() {
  const filename = 'welcome.blade.php';
  const welcomeFile = path.join(process.cwd(), `resources/views`, filename);
  const welcomePage = await fs.readFile(welcomeFile, 'utf8');

  console.log(`\n- Setting up ${chalk.blue.bold(filename)}...`);

  await fs.writeFile(
    welcomeFile,
    welcomePage.replace(
      /<\/head>/,
      "\t@vite(['resources/css/app.css'])\n\t</head>"
    )
  );
}
