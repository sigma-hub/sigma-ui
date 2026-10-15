import { describe, expect, it } from 'vitest';
import { transformFileContent, transformImports } from '../../src/utils/transformers';

const source = `<script setup lang="ts">
import { Foo } from "bar"
import { Button } from '@/components/ui/button'
import { Card } from '@ui/registry/css/ui/card'
import { Dialog } from '@/registry/new-york/ui/dialog'
import { cn } from "@/lib/utils"
import { formatDate } from '@/lib/format'
import { useThing } from '@/composables/useThing'
import AppSidebar from './components/AppSidebar.vue'
export { default as Badge } from '@/components/ui/badge/Badge.vue'
</script>`;

describe('transformImports', () => {
  it('keeps default aliases unchanged', () => {
    expect(transformImports(source, { aliases: { components: '@/components/ui', utils: '@/lib/utils' } })).toContain(`from '@/components/ui/button'`);
  });

  it('rewrites registry aliases to the configured aliases', () => {
    const result = transformImports(source, {
      aliases: { components: '~/ui', utils: '~/utils/cn', composables: '~/use' },
    });

    expect(result).toContain(`import { Foo } from "bar"`);
    expect(result).toContain(`import { Button } from '~/ui/button'`);
    expect(result).toContain(`import { Card } from '~/ui/card'`);
    expect(result).toContain(`import { Dialog } from '~/ui/dialog'`);
    expect(result).toContain(`import { cn } from "~/utils/cn"`);
    expect(result).toContain(`import { formatDate } from '~/utils/format'`);
    expect(result).toContain(`import { useThing } from '~/use/useThing'`);
    expect(result).toContain(`export { default as Badge } from '~/ui/badge/Badge.vue'`);
    expect(result).toContain(`import AppSidebar from './components/AppSidebar.vue'`);
  });

  it('leaves the utils import alone when no utils alias is configured', () => {
    expect(transformImports(source, { aliases: { components: '@/components/ui', utils: '' } })).toContain(`from "@/lib/utils"`);
  });
});

describe('transformFileContent', () => {
  it('applies kebab-case file naming to relative imports', () => {
    const result = transformFileContent(source, { aliases: { components: '@/components/ui', utils: '@/lib/utils' }, componentNaming: 'kebab-case' });

    expect(result).toContain(`import AppSidebar from './components/app-sidebar.vue'`);
  });
});
