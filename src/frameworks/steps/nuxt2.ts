import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import j from 'jscodeshift';

export async function setupConfigFile() {
  const filename = 'nuxt.config.js';
  const configFile = path.join(process.cwd(), filename);
  console.log(`\n- Setting up ${chalk.blue.bold(filename)}...`);

  const code = await fs.readFile(configFile, 'utf8');
  const ast = j.withParser('flow')(code);

  const css = ast.find(j.Property, { key: { name: 'css' } });
  const cssItems = css.find(j.Literal);
  const tailwind = j.literal('@/assets/css/main.css');
  if (cssItems.length) {
    cssItems.at(cssItems.length - 1).insertAfter(tailwind);
  } else {
    css.find(j.ArrayExpression).replaceWith(j.arrayExpression([tailwind]));
  }

  const buildModules = ast.find(j.Property, { key: { name: 'buildModules' } });
  const items = buildModules.find(j.Literal);
  const postcss = j.literal('postcss8');
  if (items.length) {
    items.at(items.length - 1).insertAfter(postcss);
  } else {
    buildModules
      .find(j.ArrayExpression)
      .replaceWith(j.arrayExpression([postcss]));
  }

  const build = ast.find(j.Property, { key: { name: 'build' } });
  const buildProps = build.find(j.Property);
  const buildConfig = j.property(
    'init',
    j.identifier('postcss'),
    j.objectExpression([
      j.property(
        'init',
        j.identifier('plugins'),
        j.objectExpression([
          j.property(
            'init',
            j.identifier('tailwindcss'),
            j.objectExpression([])
          ),
          j.property(
            'init',
            j.identifier('autoprefixer'),
            j.objectExpression([])
          ),
        ])
      ),
    ])
  );
  if (buildProps.length) {
    buildProps.at(buildProps.length - 1).insertAfter(buildConfig);
  } else {
    build
      .find(j.ObjectExpression)
      .replaceWith(j.objectExpression([buildConfig]));
  }

  await fs.writeFile(configFile, ast.toSource({ quote: 'single' }));
}
