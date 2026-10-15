import { describe, expect, it } from 'vitest';
import { resolve } from 'pathe';
import { buildRegistry } from '../src/registry';

const LIB_REGISTRY_PATH = resolve(__dirname, '../../lib/src/registry');

describe('buildRegistry', async () => {
  const registry = await buildRegistry(LIB_REGISTRY_PATH);
  const findItem = (name: string) => registry.find(item => item.name === name);

  it('detects registry dependencies from @ui/registry imports', () => {
    expect(findItem('pagination')?.registryDependencies).toContain('button');
    expect(findItem('avatar')?.registryDependencies).toContain('image');
    expect(findItem('chart-area')?.registryDependencies).toContain('chart');
  });

  it('detects npm dependencies beyond a fixed allowlist', () => {
    const calendarDependencies = findItem('calendar')?.dependencies ?? [];

    expect(calendarDependencies.some(dependency => dependency.startsWith('reka-ui@'))).toBe(true);
    expect(calendarDependencies.some(dependency => dependency.startsWith('lucide-vue-next'))).toBe(true);
  });
});
