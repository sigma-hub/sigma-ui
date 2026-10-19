import { describe, expect, it } from 'vitest';
import type { RegistryItem } from '../../src/schemas';
import { searchRegistryItems } from '../../src/utils/registry';

const items: RegistryItem[] = [
  { name: 'button', type: 'registry:ui', description: 'Displays a button.' },
  { name: 'login-simple', type: 'registry:block', title: 'Simple login', categories: ['authentication', 'login'] },
  { name: 'dashboard-orders', type: 'registry:block', description: 'An orders dashboard with a sidebar.' },
];

const names = (results: RegistryItem[]) => results.map(item => item.name);

describe('searchRegistryItems', () => {
  it('returns every item without filters', () => {
    expect(names(searchRegistryItems(items, {}))).toEqual(['button', 'login-simple', 'dashboard-orders']);
  });

  it('matches all query terms across name, title, description, and categories', () => {
    expect(names(searchRegistryItems(items, { query: 'authentication' }))).toEqual(['login-simple']);
    expect(names(searchRegistryItems(items, { query: 'Orders SIDEBAR' }))).toEqual(['dashboard-orders']);
    expect(names(searchRegistryItems(items, { query: 'orders login' }))).toEqual([]);
  });

  it('filters by type with or without the registry prefix', () => {
    expect(names(searchRegistryItems(items, { type: 'block' }))).toEqual(['login-simple', 'dashboard-orders']);
    expect(names(searchRegistryItems(items, { type: 'registry:ui' }))).toEqual(['button']);
  });
});
