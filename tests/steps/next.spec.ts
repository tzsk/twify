import glob from 'glob';
import { resolveCssLocation } from '../../src/frameworks/steps/next';

vi.mock('glob');

describe('Next JS CSS', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('can resolve css location', async () => {
    vi.mocked(glob)
      .mockImplementationOnce((_, cb) => {
        console.log(typeof cb, cb);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (cb as any)(null, ['foo']) as any;
      })
      .mockImplementationOnce((_, cb) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (cb as any)(null, []) as any;
      });
    const first = await resolveCssLocation();
    const second = await resolveCssLocation();

    expect(first).toStrictEqual('foo');
    expect(second).toStrictEqual('./styles/globals.css');
  });
});
