import fs from 'fs-extra';
import { setupWelcomePage } from '../../src/frameworks/steps/laravel';

async function runStep(file: string) {
  const code = fs.readFileSync(`./tests/fixtures/laravel/${file}`, 'utf8');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vi.spyOn(fs, 'readFile').mockResolvedValue(code as any);
  const writeSpy = vi.spyOn(fs, 'writeFile').mockResolvedValue();

  await setupWelcomePage();

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

  it('can setup laravel project', async () => {
    const { fileName, content } = await runStep('welcome.stub');

    expect(fileName).toMatch('welcome.blade.php');
    expect(content).toMatchSnapshot();
  });
});
