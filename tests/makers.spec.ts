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
      { cmd: 'node create vite@latest example', project: 'Vite' },
      { cmd: 'yarn create next-app@latest example', project: 'NextJS' },
      { cmd: 'pnpm create remix@latest example', project: 'Remix' },
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
      {
        cmd: 'composer create-project laravel/laravel example',
        project: 'LaravelVite',
      },
      { cmd: 'npx nuxi@latest init example', project: 'Nuxt3' },
      { cmd: 'npx nuxi@latest init example', project: 'Nuxt3' },
      { cmd: 'ng new example', project: 'Angular' },
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

    vi.stubGlobal('process', {
      ...process,
      argv: ['npx', 'twify', 'yarn', 'create', 'example'],
    });
    expect(shouldHandleCreateCommand()).toStrictEqual([
      'yarn',
      'create',
      'example',
    ]);

    vi.stubGlobal('process', {
      ...process,
      argv: ['npx', 'twify', 'yarn'],
    });
    expect(shouldHandleCreateCommand()).toBeFalsy();
  });
});
