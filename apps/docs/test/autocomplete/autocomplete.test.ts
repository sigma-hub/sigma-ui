// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';
import type { Component } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import * as cssInput from '@ui/registry/css/ui/input';
import * as cssTextarea from '@ui/registry/css/ui/textarea';
import * as tailwindInput from '@ui/registry/tailwind/ui/input';
import * as tailwindTextarea from '@ui/registry/tailwind/ui/textarea';
import CssLoginSimple from '@ui/registry/css/blocks/login-simple/LoginSimple.vue';
import CssLoginSocial from '@ui/registry/css/blocks/login-social/LoginSocial.vue';
import CssLoginSplitImage from '@ui/registry/css/blocks/login-split-image/LoginSplitImage.vue';
import CssSignupCard from '@ui/registry/css/blocks/signup-card/SignupCard.vue';
import CssSignupForm from '@ui/registry/css/blocks/signup-quote/components/SignupForm.vue';
import TailwindLoginSimple from '@ui/registry/tailwind/blocks/login-simple/LoginSimple.vue';
import TailwindLoginSocial from '@ui/registry/tailwind/blocks/login-social/LoginSocial.vue';
import TailwindLoginSplitImage from '@ui/registry/tailwind/blocks/login-split-image/LoginSplitImage.vue';
import TailwindSignupCard from '@ui/registry/tailwind/blocks/signup-card/SignupCard.vue';
import TailwindSignupForm from '@ui/registry/tailwind/blocks/signup-quote/components/SignupForm.vue';

afterEach(() => {
  document.body.innerHTML = '';
});

function render(component: Component, props: Record<string, unknown> = {}) {
  return mount(defineComponent({ setup: () => () => h(component, props) }), { attachTo: document.body });
}

describe.each([
  ['css', { ...cssInput, ...cssTextarea }],
  ['tailwind', { ...tailwindInput, ...tailwindTextarea }],
] as const)('%s field autocomplete', (_style, ui) => {
  it.each([
    ['Input', 'input'],
    ['Textarea', 'textarea'],
  ] as const)('%s turns autocomplete off when nothing is passed', (name, tag) => {
    expect(render(ui[name] as Component).find(tag).attributes('autocomplete')).toBe('off');
  });

  it.each([
    ['Input', 'input'],
    ['Textarea', 'textarea'],
  ] as const)('%s keeps the autocomplete value the caller passes', (name, tag) => {
    expect(render(ui[name] as Component, { autocomplete: 'email' }).find(tag).attributes('autocomplete')).toBe('email');
    expect(render(ui[name] as Component, { autocomplete: 'on' }).find(tag).attributes('autocomplete')).toBe('on');
  });
});

describe.each([
  ['css', { LoginSimple: CssLoginSimple, LoginSocial: CssLoginSocial, LoginSplitImage: CssLoginSplitImage, SignupCard: CssSignupCard, SignupForm: CssSignupForm }],
  ['tailwind', { LoginSimple: TailwindLoginSimple, LoginSocial: TailwindLoginSocial, LoginSplitImage: TailwindLoginSplitImage, SignupCard: TailwindSignupCard, SignupForm: TailwindSignupForm }],
] as const)('%s auth blocks', (_style, blocks) => {
  function autocompleteById(component: Component) {
    const wrapper = render(component);
    const fields = wrapper.findAll('input');

    for (const field of fields) {
      expect(Object.keys(field.attributes()).filter(name => name.startsWith('auto-'))).toEqual([]);
    }

    return Object.fromEntries(fields.map(field => [field.attributes('id'), field.attributes('autocomplete')]));
  }

  it.each(['LoginSimple', 'LoginSocial', 'LoginSplitImage'] as const)('%s fills the sign-in credentials', async (name) => {
    await flushPromises();
    expect(autocompleteById(blocks[name])).toMatchObject({ email: 'username', password: 'current-password' });
  });

  it('SignupCard fills the new account fields', () => {
    expect(autocompleteById(blocks.SignupCard)).toEqual({
      'first-name': 'given-name',
      'last-name': 'family-name',
      'email': 'email',
      'password': 'new-password',
    });
  });

  it('SignupForm fills the email', () => {
    const wrapper = render(blocks.SignupForm);
    const email = wrapper.find('input#email');

    expect(email.attributes()).toMatchObject({ autocomplete: 'email', autocapitalize: 'none', autocorrect: 'off' });
  });
});
