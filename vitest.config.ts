import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    dir: 'tests',
    cache: false,
    coverage: {
      provider: 'istanbul',
      clean: true,
      exclude: ['src/types.ts', 'tests'],
      reporter: ['clover', 'cobertura', 'html', 'lcov', 'text', 'text-summary'],
    },
    logHeapUsage: true,
    reporters: ['default', 'junit'],
    outputFile: './tests/results.xml',
  },
});
