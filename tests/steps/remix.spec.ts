import fs from 'fs-extra';
import {
  setupIndexFile,
  setupPackageJson,
} from '../../src/frameworks/steps/remix';

async function runStep(file: string) {
  const ensure = vi.spyOn(fs, 'ensureFile').mockResolvedValue();
  const code = fs.readFileSync(`./tests/fixtures/remix/${file}`, 'utf8');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vi.spyOn(fs, 'readFile').mockResolvedValue(code as any);
  const writeSpy = vi.spyOn(fs, 'writeFile').mockResolvedValue();

  await setupIndexFile();

  const [fileName, content] = writeSpy.mock.lastCall || [];

  expect(ensure).toHaveBeenCalled();

  return { fileName, content };
}

describe('Remix Steps', () => {
  beforeAll(() => {
    vi.stubGlobal('console', { ...console, log: vi.fn() });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('will configure package.json scripts', async () => {
    const code = fs.readFileSync(`./tests/fixtures/remix/package.stub`, 'utf8');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(fs, 'readJson').mockResolvedValue(JSON.parse(code));
    const writeSpy = vi.spyOn(fs, 'writeJson').mockResolvedValue();

    await setupPackageJson();

    const [fileName, content] = writeSpy.mock.lastCall || [];
    expect(fileName).toMatch('package.json');
    expect(content).toMatchSnapshot();
  });

  it('can setup remix js root file', async () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    const { fileName, content } = await runStep('remixjs.stub');

    expect(fileName).toMatch('root.jsx');
    expect(content).toMatchSnapshot();
  });

  it('can setup remix ts root file', async () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    const { fileName, content } = await runStep('remixts.stub');

    expect(fileName).toMatch('root.tsx');
    expect(content).toMatchSnapshot();
  });

  it('can setup remix js root file with links', async () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    const { fileName, content } = await runStep('remixjs.links.stub');

    expect(fileName).toMatch('root.jsx');
    expect(content).toMatchSnapshot();
  });

  it('can setup remix ts root file with links', async () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    const { fileName, content } = await runStep('remixts.links.stub');

    expect(fileName).toMatch('root.tsx');
    expect(content).toMatchSnapshot();
  });
});
