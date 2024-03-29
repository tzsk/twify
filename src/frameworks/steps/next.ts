import glob from 'glob';
import util from 'util';

export async function resolveCssLocation() {
  const [match] = await util.promisify(glob)('./**/globals.css', {
    ignore: ['node_modules'],
  });

  if (!match) {
    return './styles/globals.css';
  }

  return match;
}
