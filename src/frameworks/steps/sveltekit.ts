import fs from 'fs-extra';
import path from 'path';
import j from 'jscodeshift';
import chalk from 'chalk';

export async function movePostCSS() {
  const source = path.join(process.cwd(), 'postcss.config.js');
  const destination = path.join(process.cwd(), 'postcss.config.cjs');
  if (fs.existsSync(source)) {
    await fs.move(source, destination, { overwrite: true });
  }
}

export async function setupConfigFile() {
  const filename = 'svelte.config.js';
  const configFile = path.join(process.cwd(), filename);
  console.log(`\nSetting up ${chalk.blue.bold(filename)}...`);

  const code = await fs.readFile(configFile, 'utf8');
  const ast = j.withParser('flow')(code);

  const preprocessCall = ast.find(j.CallExpression, {
    callee: { name: 'preprocess' },
  });

  const preprocessItems = preprocessCall.find(j.Property);
  const postcss = j.property(
    'init',
    j.identifier('postcss'),
    j.booleanLiteral(true)
  );
  if (preprocessItems.length) {
    preprocessItems.at(preprocessItems.length - 1).insertAfter(postcss);
  } else {
    preprocessCall.replaceWith(
      j.callExpression(j.identifier('preprocess'), [
        j.objectExpression([postcss]),
      ])
    );
  }

  await fs.writeFile(configFile, ast.toSource());
}

export async function setupLayoutFile() {
  const ts = fs.existsSync(path.join(process.cwd(), 'tsconfig.json'));
  const location = 'src/routes/__layout.svelte';
  const file = path.join(process.cwd(), location);

  if (fs.existsSync(file)) {
    console.log(`\n${chalk.blue.bold(location)} already exists.`);
    return;
  }

  console.log(`\nCreating ${chalk.blue.bold(location)}...`);
  await fs.ensureFile(file);

  const opening = ts ? `<script lang="ts">` : `<script>`;
  const code = `${opening}
  import "../app.css";
</script>

<slot />
`;

  await fs.writeFile(file, code);
}
