import fs from 'fs-extra';
import { setupMainFile } from '../../src/frameworks/steps/vite';

async function runStep(file: string) {
  const code = fs.readFileSync(`./tests/fixtures/vite/${file}`, 'utf8');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vi.spyOn(fs, 'readFile').mockResolvedValue(code as any);
  const writeSpy = vi.spyOn(fs, 'writeFile').mockResolvedValue();

  await setupMainFile();

  const [fileName, content] = writeSpy.mock.lastCall || [];

  return { fileName, content };
}

describe('Vite Steps', () => {
  beforeAll(() => {
    vi.stubGlobal('console', { ...console, log: vi.fn() });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('can setup vite vue js project', async () => {
    vi.spyOn(fs, 'existsSync')
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    const { fileName, content } = await runStep('main.vue.stub');

    expect(fileName).toMatch('main.js');
    expect(content).toMatchSnapshot();
  });

  it('can setup vite vue ts project', async () => {
    vi.spyOn(fs, 'existsSync')
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);
    const { fileName, content } = await runStep('main.vue.stub');

    expect(fileName).toMatch('main.ts');
    expect(content).toMatchSnapshot();
  });

  it('can setup vite jsx project', async () => {
    vi.spyOn(fs, 'existsSync')
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);
    const { fileName, content } = await runStep('main.react.stubx');

    expect(fileName).toMatch('main.jsx');
    expect(content).toMatchSnapshot();
  });

  it('can setup vite tsx project', async () => {
    vi.spyOn(fs, 'existsSync')
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    const { fileName, content } = await runStep('main.react.stubx');

    expect(fileName).toMatch('main.tsx');
    expect(content).toMatchSnapshot();
  });
});
