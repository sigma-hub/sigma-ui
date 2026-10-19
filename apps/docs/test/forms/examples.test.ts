// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Component } from 'vue';
import { resolve } from 'node:path';
import fg from 'fast-glob';
import { flushPromises, mount } from '@vue/test-utils';

vi.stubGlobal('ResizeObserver', class {
  observe() {}
  unobserve() {}
  disconnect() {}
});

// happy-dom replaces import.meta.url, so the path comes from __dirname.
const registry = `${resolve(__dirname, '../../../../packages/lib/src/registry')}/`;
const forms = fg.sync(['*/example/*Form*.vue', '*/blocks/settings-forms/components/*Form.vue'], { cwd: registry }).sort();

afterEach(() => {
  document.body.innerHTML = '';
});

describe('registry forms', () => {
  it('finds the form examples in both styles', () => {
    expect(forms.filter(name => name.startsWith('css/')).length).toBe(forms.filter(name => name.startsWith('tailwind/')).length);
    expect(forms.length).toBeGreaterThanOrEqual(42);
  });

  it.each(forms)('%s mounts and validates on submit', async (path) => {
    const { default: component } = await import(/* @vite-ignore */ `${registry}${path}`) as { default: Component };
    const errors: unknown[] = [];
    const wrapper = mount(component, {
      attachTo: document.body,
      global: { config: { errorHandler: error => errors.push(error), warnHandler: () => {} } },
    });

    await flushPromises();

    const form = wrapper.find('form');

    expect(form.exists()).toBe(true);

    await form.trigger('submit');
    await flushPromises();

    expect(errors).toEqual([]);
    wrapper.unmount();
  }, 20_000);
});
