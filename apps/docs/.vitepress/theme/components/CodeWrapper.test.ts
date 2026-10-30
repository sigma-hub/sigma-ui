import { beforeAll, describe, expect, it, vi } from 'vitest';
import { createSSRApp, ref } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { createMarkdownRenderer, type MarkdownRenderer } from 'vitepress';
import { markdownOptions } from '../config/markdown';
import CodeWrapper from './CodeWrapper';

const codeConfig = ref({ prefix: '', componentsPath: '~/ui', utilsPath: '~/lib/cn' });

vi.mock('@/stores/config', () => ({
  useConfigStore: () => ({ codeConfig }),
}));

let md: MarkdownRenderer;

beforeAll(async () => {
  md = await createMarkdownRenderer(process.cwd(), markdownOptions, '/');
});

async function renderWrapped(source: string) {
  const template = md.render(source);
  const app = createSSRApp({ components: { CodeWrapper }, template });

  return renderToString(app);
}

const SOURCE = [
  '```vue',
  '<script setup lang="ts">',
  'import { Button } from \'@/components/ui/button\'',
  'import { cn } from "@/lib/utils"',
  '</script>',
  '```',
].join('\n');

describe('CodeWrapper path rewriting on dual-theme output', () => {
  it('rewrites the component and utils paths in tokens that carry --shiki-light / --shiki-dark', async () => {
    const html = await renderWrapped(SOURCE);

    expect(html).toContain('--shiki-light:');
    expect(html).toContain('--shiki-dark:');
    expect(html).toContain('~/ui/button');
    expect(html).toContain('~/lib/cn');
    expect(html).not.toContain('@/components/ui');
    expect(html).not.toContain('@/lib/utils');
  });

  it('keeps token styles and structure while rewriting', async () => {
    const html = await renderWrapped(SOURCE);

    expect(html).toMatch(/<span[^>]*--shiki-light:#[0-9A-Fa-f]{6};--shiki-dark:#[0-9A-Fa-f]{3,6}[^>]*>[^<]*~\/ui\/button/);
    expect(html).toContain('<button title="Copy Code" class="copy"></button>');
    expect(html.match(/<span class="line">/g)).toHaveLength(4);
  });

  it('rewrites inside fences that have a title header', async () => {
    const html = await renderWrapped(SOURCE.replace('```vue', '```vue [Example.vue]'));

    expect(html).toContain('<div class="code-title">Example.vue</div>');
    expect(html).toContain('~/ui/button');
    expect(html).not.toContain('@/components/ui');
  });

  it('leaves untouched what is not a path', async () => {
    const html = await renderWrapped('```ts\nconst answer = 42\n```');

    expect(html).toContain('answer');
    expect(html).not.toContain('~/ui');
  });
});
