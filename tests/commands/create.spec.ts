import { CreateCommand } from '../../src/commands/create';
import { InitCommand } from '../../src/commands/init';
import { runCommandSpawn } from '../../src/helpers';
import { resolveMakeCommand } from '../../src/makers';

vi.mock('../../src/makers');
vi.mock('../../src/helpers');
vi.mock('../../src/commands/init');

describe('Create Command', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();

    vi.stubGlobal('console', { ...console, log: vi.fn() });
  });

  it('can create projects', async () => {
    vi.spyOn(process, 'chdir').mockReturnValue();
    vi.mocked(resolveMakeCommand).mockResolvedValue('foo');
    const run = vi.mocked(runCommandSpawn).mockResolvedValue(true);
    const init = vi.mocked(InitCommand).mockResolvedValue();
    await CreateCommand(['npm', 'create', 'vite', 'example']);

    expect(run).toHaveBeenCalledWith('foo', {
      cwd: process.cwd(),
      shell: true,
      stdio: 'inherit',
    });
    expect(init).toHaveBeenCalledWith({ installer: 'npm' }, false);
  });

  it('can may fail to create projects', async () => {
    vi.mocked(resolveMakeCommand).mockResolvedValue('foo');
    const run = vi.mocked(runCommandSpawn).mockRejectedValue(new Error('foo'));
    const init = vi.mocked(InitCommand).mockResolvedValue();
    await CreateCommand(['npm', 'create', 'vite', 'example']);

    expect(run).toHaveBeenCalledWith('foo', {
      cwd: process.cwd(),
      shell: true,
      stdio: 'inherit',
    });
    expect(init).not.toHaveBeenCalled();
  });

  it('can may fail args validation', async () => {
    const run = vi.mocked(runCommandSpawn).mockResolvedValue(true);
    const init = vi.mocked(InitCommand).mockResolvedValue();
    await CreateCommand(['npm', 'create', 'vite']);

    expect(run).not.toHaveBeenCalled();
    expect(init).not.toHaveBeenCalled();
  });
});
