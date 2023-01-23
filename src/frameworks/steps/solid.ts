import glob from 'glob';
import util from 'util';

export async function resolveCssLocation() {
  const [match] = await util.promisify(glob)('./src/**/root.css', {
    ignore: ['node_modules'],
  });

  if (!match) {
    return './src/index.css';
  }

  return match;
}
