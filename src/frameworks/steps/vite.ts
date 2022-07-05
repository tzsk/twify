import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import j from 'jscodeshift';

function _withCssImport(code: string): string {
  const ast = j.withParser('flow')(code);

  const imports = ast.find(j.ImportDeclaration);

  imports
    .at(imports.length - 1)
    .insertAfter(j.importDeclaration([], j.literal('./style.css')));

  return ast.toSource();
}

export async function setupMainFile() {
  const ts = fs.existsSync(path.join(process.cwd(), 'tsconfig.json'));
  let filename: string = ts ? 'main.ts' : 'main.js';
  filename = fs.existsSync(path.join(process.cwd(), 'src', filename))
    ? filename
    : `${filename}x`;

  console.log(`\n- Setting up ${chalk.blue.bold(`src/${filename}`)}...`);
  const filePath = path.join(process.cwd(), 'src', filename);

  const code = await fs.readFile(filePath, 'utf8');

  await fs.writeFile(filePath, _withCssImport(code));
}
