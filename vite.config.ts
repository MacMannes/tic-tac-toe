import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['test/**/*.test.ts'],
		coverage: {
			enabled: true,
			all: true,
			provider: 'v8',
			reporter: ['text', 'lcov', 'html'],
			exclude: [...configDefaults.exclude, 'src/domain/models.ts', 'src/index.ts', 'test'],
		},
	}
});
