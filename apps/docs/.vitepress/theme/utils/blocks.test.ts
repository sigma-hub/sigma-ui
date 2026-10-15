import { describe, expect, it } from 'vitest';
import { getBlockFileTree, getBlockMainFile } from './blocks';

describe('block file tree', () => {
  it('lists the main file first and nests component folders', () => {
    const tree = getBlockFileTree('dashboard-orders', [
      'blocks/dashboard-orders/components/AppSidebar.vue',
      'blocks/dashboard-orders/data.ts',
      'blocks/dashboard-orders/DashboardOrders.vue',
    ]);

    expect(getBlockMainFile('dashboard-orders')).toBe('DashboardOrders.vue');
    expect(tree.map(node => node.name)).toEqual([
      'components',
      'AppSidebar.vue',
      'DashboardOrders.vue',
      'data.ts',
    ]);
    expect(tree.find(node => node.name === 'AppSidebar.vue')).toMatchObject({
      path: 'components/AppSidebar.vue',
      depth: 1,
    });
    expect(tree.find(node => node.name === 'components')?.path).toBeNull();
  });
});
