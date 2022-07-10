import fs from 'fs-extra';
import { CSS_STUB } from '../src/constants';
import * as content from '../src/content';
import * as helpers from '../src/helpers';
import { handle } from '../src/processor';
import { Framework } from '../src/types';

describe('Processor', () => {
  beforeAll(() => {
    vi.stubGlobal('console', { ...console, log: vi.fn() });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('will process a framework driver', async () => {
    vi.stubGlobal('console', { log: vi.fn() });
    vi.spyOn(fs, 'ensureFileSync').mockReturnValue();
    vi.spyOn(fs, 'readFileSync').mockReturnValue('');
    const write = vi.spyOn(fs, 'writeFileSync').mockReturnValue();
    vi.spyOn(helpers, 'installerPrefix').mockReturnValue('npm');
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

    await handle(framework, {});

    expect(runner).toHaveBeenCalledWith('npm deps');
    expect(runner).toHaveBeenCalledWith('init');
    expect(setup).toHaveBeenCalledWith(framework);
    expect(step).toHaveBeenCalled();
    expect(write).toHaveBeenCalledWith('css', CSS_STUB);
  });

  it('will process a framework driver with replace', async () => {
    vi.stubGlobal('console', { log: vi.fn() });
    vi.spyOn(fs, 'ensureFileSync').mockReturnValue();
    vi.spyOn(fs, 'readFileSync').mockReturnValue('existing');
    const write = vi.spyOn(fs, 'writeFileSync').mockReturnValue();
    vi.spyOn(helpers, 'installerPrefix').mockReturnValue('npm');
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

    await handle(framework, { preserve: true });

    expect(runner).toHaveBeenCalledWith('npm deps');
    expect(runner).toHaveBeenCalledWith('init');
    expect(setup).toHaveBeenCalledWith(framework);
    expect(step).toHaveBeenCalled();
    expect(write).toHaveBeenCalledWith('css', 'existing\n\n' + CSS_STUB);
  });
});
