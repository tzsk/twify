import { runCommand } from '../src/helpers';
import { resolveMakeCommand, shouldHandleCreateCommand } from '../src/makers';

vi.mock('../src/helpers');

describe('Makers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('can make regular node projects', async () => {
    const expected = [
      'node create vite@latest example',
      'yarn create next-app@latest example',
      'pnpm create remix@latest example',
    ];

    const inputs = [
      ['node', 'create', 'vite', 'example'],
      ['yarn', 'create', 'next', 'example'],
      ['pnpm', 'create', 'remix', 'example'],
    ];

    let i = 0;
    for (const input of inputs) {
      const result = await resolveMakeCommand(input);
      expect(result).toEqual(expected[i]);
      i++;
    }
  });

  it('can make special type of projects', async () => {
    vi.mocked(runCommand).mockResolvedValue(true);
    const expected = [
      'composer create-project laravel/laravel example',
      'npx nuxi@latest init example',
      'npx nuxi@latest init example',
      'ng new example',
    ];

    const inputs = [
      ['node', 'create', 'laravel', 'example'],
      ['yarn', 'create', 'nuxt3', 'example'],
      ['yarn', 'create', 'nuxt-3', 'example'],
      ['pnpm', 'create', 'angular', 'example'],
    ];

    let i = 0;
    for (const input of inputs) {
      const result = await resolveMakeCommand(input);
      expect(result).toEqual(expected[i]);
      i++;
    }
  });

  it('can throw error if nothing is found', async () => {
    await expect(() =>
      resolveMakeCommand(['node', 'create', 'foo', 'example'])
    ).rejects.toThrow(/Could not find a make command for foo/);
  });

  it('can determine if it is a make command', () => {
    vi.stubGlobal('process', {
      ...process,
      argv: ['npx', 'twify', 'create', 'example'],
    });
    expect(shouldHandleCreateCommand()).toStrictEqual([
      'npm',
      'create',
      'example',
    ]);
  });
});
