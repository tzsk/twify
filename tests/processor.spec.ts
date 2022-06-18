import fs from 'fs-extra';
import * as content from '../src/content';
import * as helpers from '../src/helpers';
import { handle } from '../src/processor';
import { Framework } from '../src/types';

describe('Processor', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('will process a framework driver', async () => {
    vi.stubGlobal('console', { log: vi.fn() });
    vi.spyOn(fs, 'ensureFileSync').mockReturnValue();
    vi.spyOn(fs, 'writeFileSync').mockReturnValue();
    vi.spyOn(helpers, 'detectInstaller').mockReturnValue('npm');
    const runner = vi
      .spyOn(helpers, 'runCommand')
      .mockReturnValue(Promise.resolve());
    const setup = vi.spyOn(content, 'setupContent').mockResolvedValue();
    const step = vi.fn().mockResolvedValue(true);
    const framework: Framework = {
      content: {
        name: 'content',
        files: [],
      },
      requiredDependencies: ['deps'],
      initCommands: ['init'],
      cssLocation: 'css',
      steps: [step],
    };

    await handle(framework);

    expect(runner).toHaveBeenCalledWith('npm deps');
    expect(runner).toHaveBeenCalledWith('init');
    expect(setup).toHaveBeenCalledWith(framework);
    expect(step).toHaveBeenCalled();
  });
});
