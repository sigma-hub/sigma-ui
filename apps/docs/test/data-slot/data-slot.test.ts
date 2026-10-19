// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';
import type { Component } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import * as cssButton from '@ui/registry/css/ui/button';
import * as cssCodeBlock from '@ui/registry/css/ui/code-block';
import * as cssField from '@ui/registry/css/ui/field';
import * as cssInputGroup from '@ui/registry/css/ui/input-group';
import * as cssItem from '@ui/registry/css/ui/item';
import * as cssSidebar from '@ui/registry/css/ui/sidebar';
import * as tailwindButton from '@ui/registry/tailwind/ui/button';
import * as tailwindCodeBlock from '@ui/registry/tailwind/ui/code-block';
import * as tailwindField from '@ui/registry/tailwind/ui/field';
import * as tailwindInputGroup from '@ui/registry/tailwind/ui/input-group';
import * as tailwindItem from '@ui/registry/tailwind/ui/item';
import * as tailwindSidebar from '@ui/registry/tailwind/ui/sidebar';

const styles = [
  ['css', { ...cssButton, ...cssCodeBlock, ...cssField, ...cssInputGroup, ...cssItem, ...cssSidebar }],
  ['tailwind', { ...tailwindButton, ...tailwindCodeBlock, ...tailwindField, ...tailwindInputGroup, ...tailwindItem, ...tailwindSidebar }],
] as const;

afterEach(() => {
  document.body.innerHTML = '';
});

function mountTree(render: () => ReturnType<typeof h>) {
  return mount(defineComponent({ setup: () => render }), { attachTo: document.body });
}

describe.each(styles)('%s data-slot', (_style, ui) => {
  const { Button } = ui;

  it('defaults the Button slot to "button"', () => {
    const wrapper = mount(Button, { slots: { default: () => 'Save' } });

    expect(wrapper.get('button').attributes('data-slot')).toBe('button');
  });

  it('lets a passed data-slot override the Button default', () => {
    const wrapper = mount(Button, { attrs: { 'data-slot': 'x' }, slots: { default: () => 'Save' } });

    expect(wrapper.get('button').attributes('data-slot')).toBe('x');
  });

  it('keeps the slot of each CodeBlock button', async () => {
    const wrapper = mountTree(() => h(ui.CodeBlock as Component, () => [
      h(ui.CodeBlockHeader as Component, () => h(ui.CodeBlockActions as Component, () => [
        h(ui.CodeBlockWrapButton as Component),
        h(ui.CodeBlockCopyButton as Component),
      ])),
      h(ui.CodeBlockContent as Component, { code: 'x' }),
      h(ui.CodeBlockFooter as Component, () => h(ui.CodeBlockExpandButton as Component)),
    ]));
    await flushPromises();

    expect(wrapper.get('[data-slot="code-block-copy-button"]').element.tagName).toBe('BUTTON');
    expect(wrapper.get('[data-slot="code-block-wrap-button"]').element.tagName).toBe('BUTTON');
    expect(wrapper.find('[data-slot="button"]').exists()).toBe(false);
  });

  it('keeps the slot of the sidebar trigger and separator', () => {
    const wrapper = mountTree(() => h(ui.SidebarProvider as Component, () => [
      h(ui.SidebarTrigger as Component),
      h(ui.SidebarSeparator as Component),
    ]));

    expect(wrapper.get('[data-slot="sidebar-trigger"]').element.tagName).toBe('BUTTON');
    expect(wrapper.find('[data-slot="sidebar-separator"]').exists()).toBe(true);
  });

  it('marks input group controls so the group can find them', async () => {
    const wrapper = mountTree(() => h(ui.InputGroup as Component, () => [
      h(ui.InputGroupInput as Component),
      h(ui.InputGroupAddon as Component, () => h(ui.InputGroupButton as Component, () => 'Go')),
    ]));

    const control = wrapper.get('[data-slot="input-group-control"]');
    expect(control.element.tagName).toBe('INPUT');
    expect(wrapper.find('[data-slot="input-group-button"]').exists()).toBe(true);

    await wrapper.get('[data-slot="input-group-addon"]').trigger('click');
    expect(document.activeElement).toBe(control.element);
  });

  it('keeps the slot of field labels and item separators', () => {
    const wrapper = mountTree(() => h('div', [
      h(ui.Field as Component, () => h(ui.FieldLabel as Component, () => 'Name')),
      h(ui.ItemSeparator as Component),
    ]));

    expect(wrapper.get('[data-slot="field-label"]').element.tagName).toBe('LABEL');
    expect(wrapper.find('[data-slot="item-separator"]').exists()).toBe(true);
  });
});
