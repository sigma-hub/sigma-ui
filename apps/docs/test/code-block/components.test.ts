// @vitest-environment happy-dom
/* eslint-disable vue/one-component-per-file */
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h, nextTick, ref } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import * as cssCodeBlock from '@ui/registry/css/ui/code-block';
import * as tailwindCodeBlock from '@ui/registry/tailwind/ui/code-block';
import { HIGHLIGHTER_WARM_UP_TIMEOUT, warmUpHighlighter } from './warm-up';

const styles = [
  ['css', cssCodeBlock],
  ['tailwind', tailwindCodeBlock],
] as const;

beforeAll(() => warmUpHighlighter(['ts']), HIGHLIGHTER_WARM_UP_TIMEOUT);

// useClipboard writes a ClipboardItem; the spy records its text.
let writeText: ReturnType<typeof vi.fn>;

class FakeClipboardItem {
  constructor(readonly items: Record<string, string>) {}
}

beforeEach(() => {
  writeText = vi.fn();
  vi.stubGlobal('ClipboardItem', FakeClipboardItem);
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      write: (items: FakeClipboardItem[]) => {
        writeText(items[0].items['text/plain']);
        return Promise.resolve();
      },
    },
    configurable: true,
  });
  Object.defineProperty(navigator, 'permissions', {
    value: { query: () => Promise.resolve({ state: 'granted', addEventListener() {}, removeEventListener() {} }) },
    configurable: true,
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = '';
});

describe.each(styles)('%s CodeBlock', (_style, ui) => {
  const {
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockExpandButton,
    CodeBlockFooter,
    CodeBlockHeader,
    CodeBlockTabs,
    CodeBlockTabsContent,
    CodeBlockTabsList,
    CodeBlockTabsTrigger,
    CodeBlockTitle,
    CodeBlockWrapButton,
    useHighlightedCode,
  } = ui;

  function mountBlock(content: Record<string, unknown>, blockProps: Record<string, unknown> = {}) {
    return mount(defineComponent({
      setup() {
        return () => h(CodeBlock, blockProps, () => [
          h(CodeBlockHeader, () => [
            h(CodeBlockTitle, () => 'app.ts'),
            h(CodeBlockActions, () => [h(CodeBlockWrapButton), h(CodeBlockCopyButton)]),
          ]),
          h(CodeBlockContent, content),
          h(CodeBlockFooter, () => h(CodeBlockExpandButton)),
        ]);
      },
    }), { attachTo: document.body });
  }

  // Parts register with the root after setup, so the first render settles on the next tick.
  async function mountSettled(content: Record<string, unknown>, blockProps: Record<string, unknown> = {}) {
    const wrapper = mountBlock(content, blockProps);
    await flushPromises();
    return wrapper;
  }

  it('renders plain code as one text node inside pre > code', () => {
    const wrapper = mountBlock({ code: 'const a = 1;\nconst b = 2;\n' });
    const code = wrapper.get('[data-slot="code-block-code"]');

    expect(wrapper.get('pre').attributes('dir')).toBe('ltr');
    expect(code.text()).toBe('const a = 1;\nconst b = 2;');
    expect(code.attributes('data-plain')).toBe('');
    expect(wrapper.findAll('[data-slot="code-block-line"]')).toHaveLength(0);
  });

  it('labels the content with the title', async () => {
    const wrapper = await mountSettled({ code: 'x' });
    const title = wrapper.get('[data-slot="code-block-title"]');

    expect(wrapper.get('pre').attributes('aria-labelledby')).toBe(title.attributes('id'));
  });

  it('numbers lines from startLine and highlights by source line', () => {
    const wrapper = mountBlock({ code: 'a\nb\nc', lineNumbers: true, startLine: 40, highlightLines: '2' });
    const lines = wrapper.findAll('[data-slot="code-block-line"]');

    expect(wrapper.get('pre').attributes('data-numbered')).toBe('true');
    expect(wrapper.get('code').attributes('style')).toContain('counter-reset: code-block-line 39');
    expect(lines.map(line => line.attributes('data-variant'))).toEqual(['default', 'highlighted', 'default']);
  });

  it('shows diff lines with labels for screen readers and copies the code after the change', async () => {
    const wrapper = await mountSettled({ code: ' keep\n-old\n+new', diff: true });
    const lines = wrapper.findAll('[data-slot="code-block-line"]');

    expect(lines.map(line => line.attributes('data-variant'))).toEqual(['default', 'removed', 'added']);
    expect(lines[1].get('.sr-only').text()).toBe('Removed:');
    expect(lines[2].get('.sr-only').text()).toBe('Added:');

    await wrapper.get('[data-slot="code-block-actions"] button:not([aria-pressed])').trigger('click');
    await flushPromises();

    expect(writeText).toHaveBeenCalledWith('keep\nnew');
    expect(wrapper.get('[data-slot="code-block-actions"] button:not([aria-pressed])').attributes('aria-label')).toBe('Copied');
    expect(wrapper.get('[aria-live="polite"]').text()).toBe('Copied');
  });

  it('marks words and dims lines outside the focus', () => {
    const wrapper = mountBlock({ code: 'data\nother data', highlightWords: ['data'], focusLines: [2] });

    expect(wrapper.findAll('mark[data-slot="code-block-word"]').map(mark => mark.text())).toEqual(['data', 'data']);
    expect(wrapper.get('pre').attributes('data-focus')).toBe('true');
    expect(wrapper.findAll('[data-slot="code-block-line"]').map(line => line.attributes('data-focused'))).toEqual([undefined, 'true']);
  });

  it('toggles wrapping with the wrap button', async () => {
    const wrapper = await mountSettled({ code: 'x' });
    const button = wrapper.get('[data-slot="code-block-actions"] button[aria-pressed]');

    expect(button.attributes('aria-pressed')).toBe('false');
    await button.trigger('click');

    expect(button.attributes('aria-pressed')).toBe('true');
    expect(wrapper.get('pre').attributes('data-wrap')).toBe('true');
    expect(wrapper.get('[data-slot="code-block"]').attributes('data-wrap')).toBe('true');
  });

  it('shows the expand button for a collapsible block and controls the content', async () => {
    const wrapper = await mountSettled({ code: 'a\nb', collapsedHeight: 40 }, { expanded: true });

    const button = wrapper.get('[data-slot="code-block-footer"] button');
    const pre = wrapper.get('pre');

    expect(button.attributes('aria-expanded')).toBe('true');
    expect(button.attributes('aria-controls')).toBe(pre.attributes('id'));
    expect(button.text()).toContain('Show less');
    expect(pre.attributes('data-collapsed')).toBeUndefined();
  });

  it('collapses to collapsedHeight', () => {
    const wrapper = mountBlock({ code: 'a\nb', collapsedHeight: 40, maxHeight: 400 });
    const pre = wrapper.get('pre');

    expect(pre.attributes('data-collapsed')).toBe('true');
    expect(pre.attributes('style')).toContain('max-height: 40px');
  });

  it('applies tokens from useHighlightedCode after mount', async () => {
    const Example = defineComponent({
      setup() {
        const code = 'const a = 1;';
        const { lines } = useHighlightedCode(code, 'ts');
        return () => h(CodeBlock, () => h(CodeBlockContent, { code, lines: lines.value, language: 'ts' }));
      },
    });
    const wrapper = mount(Example);

    expect(wrapper.get('code').attributes('data-plain')).toBe('');

    await vi.waitFor(async () => {
      await flushPromises();
      expect(wrapper.find('[data-slot="code-block-line"] span[style]').exists()).toBe(true);
    });

    expect(wrapper.get('code').text()).toBe('const a = 1;');
    expect(wrapper.html()).toContain('var(--code-block-token-keyword)');
  });

  it('copies the code of the active tab', async () => {
    const wrapper = mount(defineComponent({
      setup() {
        const active = ref('npm');
        return () => h(CodeBlock, () => h(CodeBlockTabs, {
          'modelValue': active.value,
          'onUpdate:modelValue': (value: string | number) => {
            active.value = String(value);
          },
        }, () => [
          h(CodeBlockHeader, () => [
            h(CodeBlockTabsList, { 'aria-label': 'Package manager' }, () => [
              h(CodeBlockTabsTrigger, { value: 'npm' }, () => 'npm'),
              h(CodeBlockTabsTrigger, { value: 'pnpm' }, () => 'pnpm'),
            ]),
            h(CodeBlockActions, () => h(CodeBlockCopyButton)),
          ]),
          h(CodeBlockTabsContent, { value: 'npm' }, () => h(CodeBlockContent, { code: 'npm i' })),
          h(CodeBlockTabsContent, { value: 'pnpm' }, () => h(CodeBlockContent, { code: 'pnpm add' })),
        ]));
      },
    }), { attachTo: document.body });
    await flushPromises();

    const triggers = wrapper.findAll('[role="tab"]');
    expect(wrapper.get('[role="tablist"]').attributes('aria-label')).toBe('Package manager');
    expect(triggers.map(trigger => trigger.attributes('aria-selected'))).toEqual(['true', 'false']);

    await wrapper.get('[data-slot="code-block-actions"] button:not([aria-pressed])').trigger('click');
    await flushPromises();
    expect(writeText).toHaveBeenLastCalledWith('npm i');

    await triggers[1].trigger('mousedown', { button: 0 });
    await nextTick();
    expect(wrapper.get('[role="tabpanel"][data-state="active"]').text()).toBe('pnpm add');

    await wrapper.get('[data-slot="code-block-actions"] button:not([aria-pressed])').trigger('click');
    await flushPromises();
    expect(writeText).toHaveBeenLastCalledWith('pnpm add');

    // Arrow keys move between tabs and select them.
    (triggers[1].element as HTMLElement).focus();
    await triggers[1].trigger('keydown', { key: 'ArrowRight' });
    await flushPromises();
    expect(document.activeElement).toBe(triggers[0].element);
    expect(triggers[0].attributes('aria-selected')).toBe('true');
  });
});
