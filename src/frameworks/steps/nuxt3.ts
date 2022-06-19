import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import j from 'jscodeshift';

function _prepareCss(config: j.Collection) {
  const css = config
    .find(j.Property, { key: { name: 'css' } })
    .find(j.ArrayExpression);
  const tailwind = j.literal('@/assets/css/main.css');
  if (css.length) {
    const links = css.find(j.Literal);
    if (links.length) {
      links.insertAfter(tailwind);
    } else {
      css.replaceWith(j.arrayExpression([tailwind]));
    }
  } else {
    const existing = config
      .find(j.ObjectExpression)
      .at(0)
      .get('properties').value;

    config
      .find(j.ObjectExpression)
      .at(0)
      .replaceWith(
        j.objectExpression([
          ...existing,
          j.property(
            'init',
            j.identifier('css'),
            j.arrayExpression([tailwind])
          ),
        ])
      );
  }
}

function _preparePostCss(config: j.Collection) {
  const post = config.find(j.Property, { key: { name: 'postcss' } });
  const initConfig = j.property(
    'init',
    j.identifier('plugins'),
    j.objectExpression([
      j.property('init', j.identifier('tailwindcss'), j.objectExpression([])),
      j.property('init', j.identifier('autoprefixer'), j.objectExpression([])),
    ])
  );
  const postCssConfig = j.property(
    'init',
    j.identifier('postcss'),
    j.objectExpression([initConfig])
  );
  if (!post.length) {
    const existing = config
      .find(j.ObjectExpression)
      .at(0)
      .get('properties').value;

    config
      .find(j.ObjectExpression)
      .at(0)
      .replaceWith(j.objectExpression([...existing, postCssConfig]));
  } else {
    const configProp = post.find(j.Property);
    if (!configProp.length) {
      post.replaceWith(postCssConfig);
    } else {
      configProp.insertBefore(initConfig);
    }
  }
}

export async function setupConfigFile() {
  const filename = 'nuxt.config.ts';
  const configFile = path.join(process.cwd(), filename);
  console.log(`\n- Setting up ${chalk.blue.bold(filename)}...`);

  const code = await fs.readFile(configFile, 'utf8');
  const ast = j.withParser('flow')(code);

  const config = ast.find(j.CallExpression, {
    callee: { name: 'defineNuxtConfig' },
  });
  _prepareCss(config);
  _preparePostCss(config);

  await fs.writeFile(configFile, ast.toSource());
}
