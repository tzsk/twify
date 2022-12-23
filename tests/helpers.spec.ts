import fs from 'fs-extra';
import { exec, spawn } from 'child_process';
import {
  detectFramework,
  installerPrefix,
  intro,
  runCommand,
  runCommandSpawn,
} from '../src/helpers';
import { EventEmitter } from 'stream';

vi.mock('child_process');

describe('Helpers', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  it('can show intro with warning', () => {
    const log = vi.spyOn(console, 'log').mockReturnValue();
    intro(true);
    expect(log).toHaveBeenCalledTimes(3);
  });

  it('can show intro without warning', () => {
    const log = vi.spyOn(console, 'log').mockReturnValue();
    intro();
    expect(log).toHaveBeenCalledTimes(2);
  });

  it('can detect project type', () => {
    const pkg = vi.spyOn(fs, 'readJsonSync');

    pkg.mockReturnValue({ dependencies: { next: '1.0.0' } });
    expect(detectFramework()).toBe('NextJS');

    pkg.mockReturnValue({ dependencies: { '@remix-run/react': '1.0.0' } });
    expect(detectFramework()).toBe('Remix');

    pkg.mockReturnValue({ dependencies: { '@angular/core': '1.0.0' } });
    expect(detectFramework()).toBe('Angular');

    pkg.mockReturnValue({ dependencies: { nuxt: '1.0.0' } });
    expect(detectFramework()).toBe('Nuxt2');

    pkg.mockReturnValue({ dependencies: { 'react-scripts': '1.0.0' } });
    expect(detectFramework()).toBe('CreateReactApp');

    pkg.mockReturnValue({
      devDependencies: { 'laravel-vite-plugin': '1.0.0' },
    });
    expect(detectFramework()).toBe('LaravelVite');

    pkg.mockReturnValue({ devDependencies: { '@sveltejs/kit': '1.0.0' } });
    expect(detectFramework()).toBe('SvelteKit');

    pkg.mockReturnValue({ devDependencies: { nuxt: '1.0.0' } });
    expect(detectFramework()).toBe('Nuxt3');

    pkg.mockReturnValue({ devDependencies: { vite: '1.0.0' } });
    expect(detectFramework()).toBe('Vite');

    pkg.mockReturnValue({ devDependencies: {} });
    expect(detectFramework()).toBeUndefined();
  });

  it('can detect installer', () => {
    const dep = vi.spyOn(fs, 'existsSync');

    dep.mockReturnValue(true);
    expect(installerPrefix()).toBe('yarn add --dev');

    dep.mockReturnValue(false);
    expect(installerPrefix()).toBe('npm install --save-dev');

    expect(installerPrefix('pnpm')).toBe('pnpm install --save-dev');
    expect(installerPrefix('npm')).toBe('npm install --save-dev');
    expect(installerPrefix('yarn')).toBe('yarn add --dev');
  });

  it('can run command', async () => {
    vi.mocked(exec).mockImplementation((_, __, cb) => {
      cb && cb(null, 'stdout', 'stderr');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return {} as any;
    });
    await expect(runCommand('cmd')).resolves.toBe('stdout');
    expect(exec).toHaveBeenCalledWith(
      'cmd',
      expect.any(Object),
      expect.any(Function)
    );

    vi.mocked(exec).mockImplementation((_, __, cb) => {
      cb && cb(new Error('foo'), 'stdout', 'stderr');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return {} as any;
    });
    await expect(runCommand('cmd-foo')).rejects.toThrow('foo');
    expect(exec).toHaveBeenCalledWith(
      'cmd-foo',
      expect.any(Object),
      expect.any(Function)
    );
  });

  it('can run command with spawn', async () => {
    const emitter = new EventEmitter();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(spawn).mockReturnValue(emitter as any);
    const resolve = runCommandSpawn('cmd');
    emitter.emit('close', 0);
    await expect(resolve).resolves.toBe(true);

    const reject = runCommandSpawn('cmd-foo');
    const err = new Error('foo');
    emitter.emit('error', err);
    await expect(reject).rejects.toThrow('foo');
  });
});
