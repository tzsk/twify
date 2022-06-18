import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import j from 'jscodeshift';
import { Framework } from './types';

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
  console.log(`\nConfiguring ${chalk.blue.bold(content.name)} content...`);
  console.log(chalk.blue(`- ${content.files.join('\n- ')}`));

  const contentPath = path.join(process.cwd(), content.name);

  const fileContent = await fs.readFile(contentPath, 'utf8');
  const newContent = addContentToCode(fileContent, content.files);

  await fs.writeFile(contentPath, newContent);
}
