<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/css/ui/card';

withDefaults(defineProps<{
  title: string;
  description: string;
  actionLabel: string;
  compact?: boolean;
}>(), {
  compact: false,
});
</script>

<template>
  <Card>
    <CardHeader
      class="dashboard-sidebar__upgrade-header"
      :class="{ 'dashboard-sidebar__upgrade-header--compact': compact }"
    >
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>
        {{ description }}
      </CardDescription>
    </CardHeader>
    <CardContent
      class="dashboard-sidebar__upgrade-content"
      :class="{ 'dashboard-sidebar__upgrade-content--compact': compact }"
    >
      <Button
        size="sm"
        class="dashboard-sidebar__upgrade-button"
      >
        {{ actionLabel }}
      </Button>
    </CardContent>
  </Card>
</template>

<style>
.dashboard-sidebar__upgrade-header--compact.dashboard-sidebar__upgrade-header--compact {
  padding: 0 0.5rem 0.5rem;
}

.dashboard-sidebar__upgrade-content--compact.dashboard-sidebar__upgrade-content--compact {
  padding: 0 0.5rem 0.5rem;
}

.dashboard-sidebar__upgrade-button.dashboard-sidebar__upgrade-button {
  width: 100%;
}

@media (width >= 48rem) {
  .dashboard-sidebar__upgrade-header--compact.dashboard-sidebar__upgrade-header--compact {
    padding: 1rem;
  }

  .dashboard-sidebar__upgrade-content--compact.dashboard-sidebar__upgrade-content--compact {
    padding: 0 1rem 1rem;
  }
}
</style>
