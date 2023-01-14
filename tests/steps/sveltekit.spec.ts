import fs from 'fs-extra';
import {
  movePostCSS,
  setupLayoutFile,
} from '../../src/frameworks/steps/sveltekit';

describe('SvelteKit Steps', () => {
  beforeAll(() => {
    vi.stubGlobal('console', { ...console, log: vi.fn() });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('can setup layout file if it does not exist in ts', async () => {
    vi.spyOn(fs, 'existsSync')
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    vi.spyOn(fs, 'ensureFile').mockResolvedValue();
    const writeSpy = vi.spyOn(fs, 'writeFile').mockResolvedValue();

    await setupLayoutFile();
    const [fileName, content] = writeSpy.mock.lastCall || [];

    expect(fileName).toMatch('src/routes/+layout.svelte');
    expect(content).toMatchSnapshot();
  });

  it('can setup layout file if it does not exist in js', async () => {
    vi.spyOn(fs, 'existsSync')
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);
    vi.spyOn(fs, 'ensureFile').mockResolvedValue();
    const writeSpy = vi.spyOn(fs, 'writeFile').mockResolvedValue();

    await setupLayoutFile();
    const [fileName, content] = writeSpy.mock.lastCall || [];

    expect(fileName).toMatch('src/routes/+layout.svelte');
    expect(content).toMatchSnapshot();
  });

  it('will not setup layout file if it already exists', async () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'ensureFile').mockResolvedValue();
    const writeSpy = vi.spyOn(fs, 'writeFile').mockResolvedValue();

    await setupLayoutFile();

    expect(writeSpy).not.toHaveBeenCalled();
  });

  it('can move postcss.config.js if exists', async () => {
    vi.spyOn(fs, 'existsSync')
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    const move = vi.spyOn(fs, 'move').mockResolvedValue();

    await movePostCSS();

    const [from, to] = move.mock.lastCall || [];
    expect(move).toHaveBeenCalled();
    expect(from).toMatch('postcss.config.js');
    expect(to).toMatch('postcss.config.cjs');

    await movePostCSS();
    expect(move).toHaveBeenCalledTimes(1);
  });
});
