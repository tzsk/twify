import fs from 'fs-extra';
import { setupConfigFile } from '../../src/frameworks/steps/nuxt2';

async function runStep(file: string) {
  const code = fs.readFileSync(`./tests/fixtures/nuxt2/${file}`, 'utf8');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vi.spyOn(fs, 'readFile').mockResolvedValue(code as any);
  const writeSpy = vi.spyOn(fs, 'writeFile').mockResolvedValue();

  await setupConfigFile();

  const [fileName, content] = writeSpy.mock.lastCall || [];

  return { fileName, content };
}

describe('Nuxt2 Steps', () => {
  beforeAll(() => {
    vi.stubGlobal('console', { ...console, log: vi.fn() });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('can setup nuxt.config.js file case 1', async () => {
    const { fileName, content } = await runStep('case-1.config.stub');

    expect(fileName).toMatch('nuxt.config.js');
    expect(content).toMatchSnapshot();
  });

  it('can setup nuxt.config.js file case 2', async () => {
    const { fileName, content } = await runStep('case-2.config.stub');

    expect(fileName).toMatch('nuxt.config.js');
    expect(content).toMatchSnapshot();
  });

  it('can setup nuxt.config.js file case 3', async () => {
    const { fileName, content } = await runStep('case-3.config.stub');

    expect(fileName).toMatch('nuxt.config.js');
    expect(content).toMatchSnapshot();
  });
});
