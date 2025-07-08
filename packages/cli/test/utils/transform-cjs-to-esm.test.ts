import { expect, it } from 'vitest';
import { transformCJSToESM } from '../../src/utils/transformers/transform-cjs-to-esm';
import { TAILWIND_CONFIG_TEMPLATE } from '~/packages/shared/templates/tailwind-config';

it('handle tailwind config template correctly', () => {
  expect(transformCJSToESM('.mjs', TAILWIND_CONFIG_TEMPLATE)).toMatchSnapshot();
});
