import { beforeAll, describe, expect, it } from 'vitest';
import { createMarkdownRenderer, type MarkdownRenderer } from 'vitepress';
import { markdownOptions } from '../config/markdown';

let md: MarkdownRenderer;

beforeAll(async () => {
  md = await createMarkdownRenderer(process.cwd(), markdownOptions, '/');
});

function render(source: string, env: Record<string, unknown> = {}) {
  return md.render(source, env);
}

describe('code fence titles', () => {
  it('adds a header for [name] and title="name"', () => {
    for (const info of ['ts [src/main.ts]', 'ts title="src/main.ts"']) {
      const html = render(`\`\`\`${info}\nconst a = 1\n\`\`\``);

      expect(html).toContain('<div class="code-title">src/main.ts</div>');
      expect(html).toMatch(/<div class="language-ts[^"]* has-title">/);
    }
  });

  it('escapes the title', () => {
    const html = render('```ts [<b>x</b>]\nconst a = 1\n```');

    expect(html).toContain('<div class="code-title">&lt;b&gt;x&lt;/b&gt;</div>');
    expect(html).not.toContain('<b>x</b>');
  });

  it('leaves fences without a title untouched', () => {
    const html = render('```ts\nconst a = 1\n```');

    expect(html).not.toContain('code-title');
    expect(html).not.toContain('has-title');
  });

  it('keeps the title inside the CodeWrapper that rewrites paths', () => {
    const html = render('```vue [Example.vue]\n<script setup lang="ts">\nimport { Button } from \'@/components/ui/button\'\n</script>\n```');

    expect(html).toMatch(/^<CodeWrapper><div class="language-vue[^"]* has-title"><div class="code-title">Example\.vue<\/div>/);
    expect(html).toMatch(/<\/pre>\s*<\/div><\/CodeWrapper>\s*$/);
  });
});

describe('package manager fences', () => {
  it('turns npm commands into package manager tabs', () => {
    expect(render('```bash\nnpx sigma-ui@latest add button\n```')).toBe(
      '<PackageManagerCommand command="npx sigma-ui@latest add button" />\n',
    );
    expect(render('```sh\nnpm install -D tailwindcss\n```')).toContain('<PackageManagerCommand command="npm install -D tailwindcss" />');
  });

  it('keeps every line of a multi-line command', () => {
    const html = render('```bash\nnpm install -D tailwindcss @tailwindcss/vite\nnpm install tw-animate-css\n```');

    expect(html).toBe('<PackageManagerCommand command="npm install -D tailwindcss @tailwindcss/vite&#10;npm install tw-animate-css" />\n');
  });

  it('escapes quotes and angle brackets in the attribute', () => {
    const html = render('```bash\nnpx sigma-ui add "a<b"\n```');

    expect(html).toContain('command="npx sigma-ui add &quot;a&lt;b&quot;"');
  });

  it('stays a normal code block with no-pm', () => {
    const html = render('```bash no-pm\nnpx sigma-ui init\n```');

    expect(html).not.toContain('PackageManagerCommand');
    expect(html).toMatch(/<div class="language-bash[^"]*">/);
  });

  it('stays a normal code block when the fence has a title', () => {
    const html = render('```bash [Terminal]\nnpx sigma-ui init\n```');

    expect(html).not.toContain('PackageManagerCommand');
    expect(html).toContain('<div class="code-title">Terminal</div>');
  });

  it('only converts commands that npm can express', () => {
    for (const source of ['laravel new my-app', 'npm ci', 'npx sigma-ui init\ncd my-app', '# comment\nnpx sigma-ui init']) {
      expect(render(`\`\`\`bash\n${source}\n\`\`\``)).not.toContain('PackageManagerCommand');
    }
  });

  it('does not touch other languages', () => {
    expect(render('```ts\nnpm install x\n```')).not.toContain('PackageManagerCommand');
  });

  it('keeps plain text for the search index', () => {
    const html = render('```bash\nnpx sigma-ui init\n```', { isSearchIndex: true });

    expect(html).not.toContain('PackageManagerCommand');
    expect(html).toContain('npx');
  });
});

describe('highlighting', () => {
  it('emits dual-theme token colours', () => {
    const html = render('```ts\nconst a = 1\n```');

    expect(html).toContain('--shiki-light:');
    expect(html).toContain('--shiki-dark:');
    expect(html).toContain('vp-adaptive-theme');
  });

  it('supports word and line notation', () => {
    const word = render('```ts\nconst answer = 42 // [!code word:answer]\n```');
    const diff = render('```ts\nconst a = 1 // [!code ++]\nconst b = 2 // [!code --]\n```');

    expect(word).toContain('highlighted-word');
    expect(diff).toContain('diff add');
    expect(diff).toContain('diff remove');
  });

  it('adds line numbers with :line-numbers', () => {
    expect(render('```ts:line-numbers\nconst a = 1\n```')).toContain('line-numbers-mode');
  });
});
