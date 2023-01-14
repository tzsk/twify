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

export async function setupLayoutFile() {
  const ts = fs.existsSync(path.join(process.cwd(), 'tsconfig.json'));
  const location = 'src/routes/+layout.svelte';
  const file = path.join(process.cwd(), location);

  if (fs.existsSync(file)) {
    console.log(`\n${chalk.blue.bold(location)} already exists.`);
    return;
  }

  console.log(`\n- Creating ${chalk.blue.bold(location)}...`);
  await fs.ensureFile(file);

  const opening = ts ? `<script lang="ts">` : `<script>`;
  const code = `${opening}
  import "../app.css";
</script>

<slot />
`;

  await fs.writeFile(file, code);
}
