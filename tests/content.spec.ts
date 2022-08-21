import { Framework } from '../src/types';
import { addContentToCode, setupContent } from '../src/content';
import fs from 'fs-extra';

describe('Content Code Mod', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  it('can modify and add content in tailwind config', async () => {
    const code = fs.readFileSync(
      './tests/fixtures/tailwind.config.stub',
      'utf8'
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(fs, 'readFile').mockResolvedValue(code as any);
    vi.stubGlobal('console', { ...console, log: vi.fn() });
    vi.spyOn(fs, 'existsSync')
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    const writeSpy = vi.spyOn(fs, 'writeFile').mockResolvedValue();
    const framework: Framework = {
      content: ['foo.{js,ts}', 'bar.{js,ts}'],
      requiredDependencies: [],
      initCommands: [],
      cssLocation: 'css',
      steps: [],
    };

    await setupContent(framework);
    const modified = addContentToCode(code, framework.content);

    const [fileName, content] = writeSpy.mock.lastCall || [];

    expect(fileName).toMatch('tailwind.config.js');
    expect(content).toMatchSnapshot();
    expect(content).toMatch(modified);
  });

  it('will exit if no tailwind css config file found', async () => {
    const readSpy = vi.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(''));
    vi.stubGlobal('console', { ...console, log: vi.fn() });
    vi.spyOn(fs, 'existsSync')
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);
    const writeSpy = vi.spyOn(fs, 'writeFile').mockResolvedValue();
    const framework: Framework = {
      content: ['foo.{js,ts}', 'bar.{js,ts}'],
      requiredDependencies: [],
      initCommands: [],
      cssLocation: 'css',
      steps: [],
    };

    await setupContent(framework);

    expect(readSpy).not.toHaveBeenCalled();
    expect(writeSpy).not.toHaveBeenCalled();
  });
});
