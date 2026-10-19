// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h } from 'vue';
import type { Component } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import * as v from 'valibot';
import { type } from 'arktype';
import { toTypedSchema } from '@ui/registry/shared/ui/form/standard-schema';
import * as cssForm from '@ui/registry/css/ui/form';
import * as tailwindForm from '@ui/registry/tailwind/ui/form';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('toTypedSchema', () => {
  it('returns the parsed value of a valid zod 4 schema', async () => {
    const schema = toTypedSchema(z.object({ name: z.string().min(2), subscribed: z.boolean().default(false) }));

    expect(await schema.parse({ name: 'Ada' })).toEqual({ value: { name: 'Ada', subscribed: false }, errors: [] });
  });

  it('groups issues by vee-validate field paths', async () => {
    const schema = toTypedSchema(z.object({
      email: z.email({ error: 'Enter an email.' }),
      urls: z.array(z.object({ value: z.url({ error: 'Enter a URL.' }) })),
      name: z.string().min(2, 'Too short.').regex(/^[a-z]+$/, 'Lowercase only.'),
    }));

    const result = await schema.parse({ email: 'nope', urls: [{ value: 'https://sigma-ui.dev' }, { value: 'nope' }], name: 'A' });

    expect(result.value).toBeUndefined();
    expect(result.errors).toEqual([
      { path: 'email', errors: ['Enter an email.'] },
      { path: 'urls[1].value', errors: ['Enter a URL.'] },
      { path: 'name', errors: ['Too short.', 'Lowercase only.'] },
    ]);
  });

  it('fills zod 4 .default() values when casting invalid or partial values', () => {
    const schema = toTypedSchema(z.object({
      type: z.enum(['all', 'none']),
      mobile: z.boolean().default(false).optional(),
      nested: z.object({ theme: z.string().default('light'), size: z.number() }),
    }));

    expect(schema.cast?.({})).toEqual({ mobile: false, nested: { theme: 'light' } });
    expect(schema.cast?.({ mobile: true, nested: { size: 2 } })).toEqual({ mobile: true, nested: { theme: 'light', size: 2 } });
  });

  it('works with valibot', async () => {
    const schema = toTypedSchema(v.object({
      email: v.pipe(v.string(), v.email('Enter an email.')),
      tags: v.array(v.pipe(v.string(), v.minLength(2, 'Too short.'))),
      newsletter: v.optional(v.boolean(), true),
    }));

    expect(await schema.parse({ email: 'ada@sigma-ui.dev', tags: ['vue'] })).toEqual({
      value: { email: 'ada@sigma-ui.dev', tags: ['vue'], newsletter: true },
      errors: [],
    });
    expect((await schema.parse({ email: 'nope', tags: ['ok', 'x'] })).errors).toEqual([
      { path: 'email', errors: ['Enter an email.'] },
      { path: 'tags[1]', errors: ['Too short.'] },
    ]);
    expect(schema.cast?.({ email: 'nope' })).toEqual({ email: 'nope', newsletter: true });
  });

  it('works with arktype', async () => {
    const schema = toTypedSchema(type({ name: 'string >= 2', age: 'number.integer' }));

    expect(await schema.parse({ name: 'Ada', age: 36 })).toEqual({ value: { name: 'Ada', age: 36 }, errors: [] });

    const { errors } = await schema.parse({ name: 'A', age: 1.5 });

    expect(errors.map(error => error.path).sort()).toEqual(['age', 'name']);
    expect(errors.every(error => error.errors.length === 1)).toBe(true);
  });

  it('supports async schemas', async () => {
    const schema = toTypedSchema(z.object({ name: z.string().refine(async value => value !== 'taken', 'Name is taken.') }));

    expect((await schema.parse({ name: 'taken' })).errors).toEqual([{ path: 'name', errors: ['Name is taken.'] }]);
    expect(schema.cast?.({ name: 'taken' })).toEqual({ name: 'taken' });
  });
});

describe.each([
  ['css', cssForm],
  ['tailwind', tailwindForm],
] as const)('%s form', (_style, form) => {
  it('shows schema errors and submits zod 4 defaults', async () => {
    const { FormControl, FormField, FormItem, FormLabel, FormMessage } = form;
    let submitted: unknown;

    const wrapper = mount(defineComponent({
      setup() {
        const { handleSubmit } = useForm({
          validationSchema: form.toTypedSchema(z.object({
            username: z.string({ error: 'Required.' }).min(2, 'Username must be at least 2 characters.'),
            marketing: z.boolean().default(false).optional(),
          })),
        });
        const onSubmit = handleSubmit((values) => {
          submitted = values;
        });

        return () => h('form', { onSubmit }, [
          h(FormField as Component, { name: 'username' }, {
            default: ({ componentField }: { componentField: Record<string, unknown> }) => h(FormItem as Component, null, () => [
              h(FormLabel as Component, null, () => 'Username'),
              h(FormControl as Component, null, () => h('input', {
                value: componentField.modelValue,
                onInput: (event: Event) => (componentField['onUpdate:modelValue'] as (value: string) => void)((event.target as HTMLInputElement).value),
              })),
              h(FormMessage as Component),
            ]),
          }),
          h('button', { type: 'submit' }, 'Submit'),
        ]);
      },
    }), { attachTo: document.body });

    await wrapper.find('form').trigger('submit');
    await flushPromises();

    await vi.waitFor(() => expect(wrapper.text()).toContain('Required.'));
    expect(submitted).toBeUndefined();
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true');

    await wrapper.find('input').setValue('A');
    await wrapper.find('form').trigger('submit');
    await flushPromises();

    await vi.waitFor(() => expect(wrapper.text()).toContain('Username must be at least 2 characters.'));

    await wrapper.find('input').setValue('Ada');
    await wrapper.find('form').trigger('submit');
    await flushPromises();

    await vi.waitFor(() => expect(submitted).toEqual({ username: 'Ada', marketing: false }));
  });
});
