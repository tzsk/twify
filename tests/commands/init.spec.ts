import chalk from 'chalk';
import enquirer from 'enquirer';
import { InitCommand } from '../../src/commands/init';
import { drivers } from '../../src/drivers';
import { detectFramework } from '../../src/helpers';
import { handle } from '../../src/processor';

vi.mock('../../src/helpers');
vi.mock('../../src/processor');

describe('Init Command', () => {
  beforeAll(() => {
    vi.stubGlobal('console', { ...console, log: vi.fn() });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('will ask to confirm if detected framework', async () => {
    vi.mocked(detectFramework).mockReturnValue('NextJS');
    const prompt = vi
      .spyOn(enquirer, 'prompt')
      .mockResolvedValue({ proceed: true });
    vi.mocked(handle).mockResolvedValue();

    await InitCommand();
    expect(detectFramework).toHaveBeenCalledTimes(1);
    expect(prompt).toHaveBeenCalledTimes(1);
    expect(prompt).toHaveBeenCalledWith({
      type: 'confirm',
      name: 'proceed',
      message: 'Is that correct?',
      initial: true,
    });
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('will ask to select framework if detected but not confirmed', async () => {
    vi.mocked(detectFramework).mockReturnValue('Remix');
    const prompt = vi
      .spyOn(enquirer, 'prompt')
      .mockResolvedValueOnce({ proceed: false })
      .mockResolvedValueOnce({ project: 'Remix' });
    vi.mocked(handle).mockResolvedValue();

    await InitCommand();
    expect(detectFramework).toHaveBeenCalledTimes(1);
    expect(prompt).toHaveBeenCalledTimes(2);
    expect(prompt).toHaveBeenCalledWith({
      type: 'select',
      name: 'project',
      choices: Object.keys(drivers),
      message: chalk.green('Choose your framework:'),
    });
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('will ask to select a framework if unable to detect', async () => {
    vi.mocked(detectFramework).mockReturnValue(undefined);
    const prompt = vi
      .spyOn(enquirer, 'prompt')
      .mockResolvedValueOnce({ project: 'Nuxt3' });
    vi.mocked(handle).mockResolvedValue();

    await InitCommand();
    expect(detectFramework).toHaveBeenCalledTimes(1);
    expect(prompt).toHaveBeenCalledTimes(1);
    expect(prompt).toHaveBeenCalledWith({
      type: 'select',
      name: 'project',
      choices: Object.keys(drivers),
      message: chalk.green('Choose your framework:'),
    });
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('can exit out of confirming detected framework', async () => {
    vi.mocked(detectFramework).mockReturnValue('Remix');
    const prompt = vi
      .spyOn(enquirer, 'prompt')
      .mockRejectedValue(new Error('Ctrl+C'));
    vi.mocked(handle).mockResolvedValue();

    await InitCommand();
    expect(detectFramework).toHaveBeenCalledTimes(1);
    expect(prompt).toHaveBeenCalledTimes(1);
    expect(handle).not.toHaveBeenCalled();
  });

  it('can exit out of selecting a framework', async () => {
    vi.mocked(detectFramework).mockReturnValue(undefined);
    const prompt = vi
      .spyOn(enquirer, 'prompt')
      .mockRejectedValue(new Error('Ctrl+C'));
    vi.mocked(handle).mockResolvedValue();

    await InitCommand();
    expect(detectFramework).toHaveBeenCalledTimes(1);
    expect(prompt).toHaveBeenCalledTimes(1);
    expect(handle).not.toHaveBeenCalled();
  });

  it('can handle something going wrong processing the framework', async () => {
    const e = new Error('Oops!');
    vi.mocked(detectFramework).mockReturnValue('NextJS');
    const prompt = vi
      .spyOn(enquirer, 'prompt')
      .mockResolvedValue({ proceed: true });
    vi.mocked(handle).mockRejectedValue(e);

    await InitCommand();
    expect(detectFramework).toHaveBeenCalledTimes(1);
    expect(prompt).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(e);
  });
});
