import { CSS_STUB } from '../src/constants';

describe('Constants', () => {
  it('has default css content', () => {
    expect(CSS_STUB).toMatchSnapshot();
  });
});
