import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import j from 'jscodeshift';
import { Framework } from './types';
import { tailwindConfigFiles } from './constants';

export function addContentToCode(code: string, content: string[]): string {
  const parse = j.withParser('flow');
  const ast = parse(code);

  ast
    .find(j.Property, { key: { name: 'content' } })
    .replaceWith(
      j.property(
        'init',
        j.identifier('content'),
        j.arrayExpression(content.map((c) => j.literal(c)))
      )
    );

  return ast.toSource();
}

export async function setupContent({ content }: Framework) {
  console.log(
    `\n${chalk.green('✔')} Configuring ${chalk.blue.bold(content)} content...`
  );
  console.log(chalk.blue(`- ${content.join('\n- ')}`));

  const [contentPath] = tailwindConfigFiles
    .map((file) => path.join(process.cwd(), file))
    .filter((file) => fs.existsSync(file));

  if (!contentPath) {
    console.log(`\n Could not find ${chalk.blue.bold('Tailwind Config')} file`);
    return;
  }

  const fileContent = await fs.readFile(contentPath, 'utf8');
  const newContent = addContentToCode(fileContent, content);

  await fs.writeFile(contentPath, newContent);
}
