import { drivers } from '../src/drivers';

describe('Drivers', () => {
  it('has a list of drivers', async () => {
    const driversList = Object.keys(drivers);
    const expectedDrivers = [
      'NextJS',
      'Nuxt2',
      'Nuxt3',
      'Remix',
      'SvelteKit',
      'Vite',
      'Angular',
      'CreateReactApp',
      'LaravelVite',
      'Solid',
    ] as (keyof typeof drivers)[];
    expect(driversList).toEqual(expectedDrivers);

    const driverList = await Promise.all(
      expectedDrivers.map((driver) => drivers[driver]())
    );
    driverList.forEach(({ default: driver }) => {
      expect(driver).toMatchSnapshot();
    });
  });
});
