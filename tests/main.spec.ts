import chalk from 'chalk';
import { program } from 'commander';
vi.mock('commander', () => {
  return {
    program: {
      name: vi.fn().mockReturnThis(),
      description: vi.fn().mockReturnThis(),
      version: vi.fn().mockReturnThis(),
      command: vi.fn().mockReturnThis(),
      parse: vi.fn().mockReturnThis(),
      action: vi.fn().mockReturnThis(),
    },
  };
});
import '../src/main';

describe('Main', () => {
  it('will setup the cli app', async () => {
    expect(program.name).toHaveBeenCalledWith(chalk.green.bold('Twify'));
    expect(program.description).toHaveBeenCalledWith(
      chalk.blue.bold('TailwindCSS Setup Tool')
    );
    expect(program.version).toHaveBeenCalledWith(expect.any(String));
    expect(program.command).toHaveBeenCalledWith('init');
    expect(program.description).toHaveBeenCalledWith(
      'Initialize TailwindCSS in the current project'
    );
    expect(program.parse).toHaveBeenCalled();
    expect(program.action).toHaveBeenCalledWith(expect.any(Function));
  });
});
