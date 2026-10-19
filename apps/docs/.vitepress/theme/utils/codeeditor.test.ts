import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPlaygroundFiles } from './codeeditor';

vi.mock('codesandbox/lib/api/define', () => ({
  getParameters: () => '',
}));

vi.mock('@stackblitz/sdk', () => ({
  default: {
    openProject: () => undefined,
  },
}));

const buttonItem = {
  name: 'button',
  type: 'registry:ui',
  registryDependencies: [],
  dependencies: ['reka-ui@^2.2.1'],
  files: [{
    path: 'ui/button/Button.vue',
    type: 'registry:ui',
    content: '<template>Button</template>\n',
  }],
};

const alertDialogItem = {
  name: 'alert-dialog',
  type: 'registry:ui',
  registryDependencies: ['button'],
  dependencies: [],
  files: [{
    path: 'ui/alert-dialog/AlertDialog.vue',
    type: 'registry:ui',
    content: '<template>Dialog</template>\n',
  }],
};

describe('createPlaygroundFiles', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(async (url: string) => {
      const items: Record<string, unknown> = {
        '/r/tailwind/button.json': buttonItem,
        '/r/tailwind/alert-dialog.json': alertDialogItem,
        '/r/tailwind/typography.json': {
          name: 'typography',
          type: 'registry:ui',
          registryDependencies: [],
          files: [{
            path: 'ui/typography/Typography.vue',
            type: 'registry:ui',
            content: '<template>Type</template>\n',
          }],
        },
      };
      const item = items[url];

      return {
        ok: Boolean(item),
        json: async () => item,
      };
    }));
  });

  it('maps a PascalCase name onto the published registry file and keeps that root source', async () => {
    const files = await createPlaygroundFiles('AlertDialog', 'tailwind', '<template />');
    const urls = vi.mocked(fetch).mock.calls.map(call => String(call[0]));

    expect(urls).toContain('/r/tailwind/alert-dialog.json');
    expect(urls).not.toContain('/r/tailwind/AlertDialog.json');
    expect(files['src/components/ui/alert-dialog/AlertDialog.vue']?.content).toContain('Dialog');
    expect(files['src/components/ui/button/Button.vue']?.content).toContain('Button');
  });

  it('fetches the published slug and includes the root component source', async () => {
    const files = await createPlaygroundFiles(
      'Button',
      'tailwind',
      `<script setup lang="ts">\nimport { Button } from '@ui/registry/tailwind/ui/button';\n</script>\n`,
    );
    const urls = vi.mocked(fetch).mock.calls.map(call => String(call[0]));

    expect(urls).toEqual(['/r/tailwind/button.json']);
    expect(files['src/components/ui/button/Button.vue']?.content).toContain('Button');
  });

  it('includes a variant example root and the components it imports', async () => {
    const files = await createPlaygroundFiles(
      'ButtonSizes',
      'tailwind',
      `<script setup lang="ts">\nimport { Button } from '@ui/registry/tailwind/ui/button';\n</script>\n`,
      ['button'],
    );
    const urls = vi.mocked(fetch).mock.calls.map(call => String(call[0]));

    expect(urls).toEqual(['/r/tailwind/button.json']);
    expect(files['src/components/ui/button/Button.vue']).toBeDefined();
  });

  it('includes the requested component and its registry dependencies', async () => {
    const files = await createPlaygroundFiles(
      'AlertDialog',
      'tailwind',
      [
        `import { AlertDialog } from '@ui/registry/tailwind/ui/alert-dialog';`,
        `import { Button } from '@ui/registry/tailwind/ui/button';`,
      ].join('\n'),
    );

    expect(files['src/components/ui/alert-dialog/AlertDialog.vue']?.content).toContain('Dialog');
    expect(files['src/components/ui/button/Button.vue']?.content).toContain('Button');
    expect(vi.mocked(fetch).mock.calls.map(call => String(call[0])).sort()).toEqual([
      '/r/tailwind/alert-dialog.json',
      '/r/tailwind/button.json',
    ]);
  });

  it('uses the page source slug when the example name is not a registry item', async () => {
    const files = await createPlaygroundFiles(
      'TypographyH1',
      'tailwind',
      '<template><h1>Title</h1></template>\n',
      ['typography'],
    );

    expect(vi.mocked(fetch).mock.calls.map(call => String(call[0]))).toEqual(['/r/tailwind/typography.json']);
    expect(files['src/components/ui/typography/Typography.vue']).toBeDefined();
  });
});
