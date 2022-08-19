import { Framework } from '../src/types';
import { addContentToCode, setupContent } from '../src/content';
import fs from 'fs-extra';

describe('Content Code Mod', () => {
  afterEach(() => {
    vi.resetAllMocks();
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
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);
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
});
