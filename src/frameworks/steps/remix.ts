/* eslint-disable @typescript-eslint/ban-ts-comment */
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import j from 'jscodeshift';

export async function setupPackageJson() {
  {
    const scripts = {
      build: 'npm run build:css && remix build',
      'build:css': 'tailwindcss -m -i ./styles/app.css -o app/styles/app.css',
      'dev:css': 'tailwindcss -w -i ./styles/app.css -o app/styles/app.css',
    };

    console.log(
      `\nSetting up scripts in ${chalk.blue.bold('package.json')}...`
    );
    console.log(
      chalk.blue(
        `- ${Object.entries(scripts)
          .map(([key, value]) => `"${key}": "${value}"`)
          .join('\n- ')}`
      )
    );

    const depsPath = path.join(process.cwd(), 'package.json');
    const packageJson = await fs.readJson(depsPath);
    const updatedPackageJson = {
      ...packageJson,
      scripts: { ...packageJson.scripts, ...scripts },
    };

    await fs.writeJson(depsPath, updatedPackageJson, { spaces: 2 });
  }
}

export async function setupIndexFile() {
  await fs.ensureFile(path.join(process.cwd(), 'app/styles/app.css'));
  const type = fs.existsSync(path.join(process.cwd(), 'tsconfig.json'))
    ? 'ts'
    : 'js';
  const filename = `root.${type}x`;
  const filePath = path.join(process.cwd(), 'app', filename);
  const code = await fs.readFile(filePath, 'utf8');
  console.log(`\nSetting up ${chalk.blue.bold(`app/${filename}`)}...`);

  const parse = j.withParser('flow');
  const ast = parse(code);
  const imports = ast.find(j.ImportDeclaration);
  imports
    .at(imports.length - 1)
    .insertAfter(
      j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier('styles'))],
        j.literal('./styles/app.css')
      )
    );

  let typeAnnotation = null;
  if (type === 'ts') {
    const specifiers = ast
      .find(j.ImportDeclaration, {
        source: { value: '@remix-run/node' },
        importKind: 'type',
      })
      .find(j.ImportSpecifier);
    const linksType = specifiers.find(j.Identifier, { name: 'LinksFunction' });
    if (!linksType.length) {
      specifiers
        .at(specifiers.length - 1)
        .insertAfter(j.importSpecifier(j.identifier('LinksFunction')));
    }

    typeAnnotation = j.typeAnnotation(
      j.genericTypeAnnotation(j.identifier('LinksFunction'), null)
    );
  }

  const links = ast.find(j.ExportNamedDeclaration, {
    declaration: {
      type: 'VariableDeclaration',
      declarations: [{ type: 'VariableDeclarator', id: { name: 'links' } }],
    },
  });

  const styleObject = j.objectExpression([
    j.objectProperty(j.identifier('rel'), j.literal('stylesheet')),
    j.objectProperty(j.identifier('href'), j.identifier('styles')),
  ]);

  if (links.length) {
    const linkItems = links.find(j.ArrayExpression).find(j.ObjectExpression);
    linkItems.at(linkItems.length - 1).insertAfter(styleObject);
  } else {
    ast
      .find(j.ExportNamedDeclaration, {
        declaration: {
          type: 'VariableDeclaration',
          declarations: [{ type: 'VariableDeclarator', id: { name: 'meta' } }],
        },
      })
      .insertAfter(
        j.exportNamedDeclaration(
          j.variableDeclaration('const', [
            j.variableDeclarator(
              j.identifier.from({
                name: 'links',
                typeAnnotation,
              }),
              j.arrowFunctionExpression([], j.arrayExpression([styleObject]))
            ),
          ])
        )
      );
  }

  const updatedCode = ast.toSource();
  await fs.writeFile(filePath, updatedCode, 'utf8');
}
