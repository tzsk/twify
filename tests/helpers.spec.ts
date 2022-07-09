import fs from 'fs-extra';
import { exec } from 'child_process';
import { detectFramework, detectInstaller, runCommand } from '../src/helpers';

vi.mock('child_process');

describe('Helpers', () => {
  afterEach(() => {
    vi.resetAllMocks();
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
  });

  it('can detect installer', () => {
    const dep = vi.spyOn(fs, 'existsSync');

    dep.mockReturnValue(true);
    expect(detectInstaller()).toBe('yarn add --dev');

    dep.mockReturnValue(false);
    expect(detectInstaller()).toBe('npm install --save-dev');
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
});
