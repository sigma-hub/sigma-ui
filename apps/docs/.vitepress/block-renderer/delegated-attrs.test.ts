/**
 * @vitest-environment happy-dom
 */
import { computed, createApp, defineComponent, h, nextTick, ref, useAttrs } from 'vue';
import { describe, expect, it } from 'vitest';

function mount(root: ReturnType<typeof defineComponent>) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const app = createApp(root);
  app.mount(host);
  return { host, unmount: () => app.unmount() };
}

function createParent(child: ReturnType<typeof defineComponent>) {
  return defineComponent({
    setup() {
      const labeled = ref(false);

      return () => h('div', [
        h(child, labeled.value ? { 'aria-label': 'Save' } : {}),
        h('button', {
          id: 'toggle',
          onClick: () => {
            labeled.value = true;
          },
        }, 'toggle'),
      ]);
    },
  });
}

describe('delegated attrs', () => {
  it('applies attr keys added after mount', async () => {
    const Child = defineComponent({
      inheritAttrs: false,
      setup() {
        const attrs = useAttrs();
        const delegatedAttrs = () => Object.fromEntries(
          Object.entries(attrs).filter(([key]) => key !== 'class'),
        );

        return () => h('button', { id: 'target', ...delegatedAttrs() });
      },
    });
    const { host, unmount } = mount(createParent(Child));

    expect(host.querySelector('#target')?.getAttribute('aria-label')).toBeNull();
    host.querySelector('#toggle')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();
    expect(host.querySelector('#target')?.getAttribute('aria-label')).toBe('Save');
    unmount();
  });

  it('does not pick up new keys when delegated attrs are cached in a computed', async () => {
    const Child = defineComponent({
      inheritAttrs: false,
      setup() {
        const delegatedAttrs = computed(() => Object.fromEntries(
          Object.entries(useAttrs()).filter(([key]) => key !== 'class'),
        ));

        return () => h('button', { id: 'target', ...delegatedAttrs.value });
      },
    });
    const { host, unmount } = mount(createParent(Child));

    expect(host.querySelector('#target')?.getAttribute('aria-label')).toBeNull();
    host.querySelector('#toggle')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();
    expect(host.querySelector('#target')?.getAttribute('aria-label')).toBeNull();
    unmount();
  });
});
