<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import { Input } from '@ui/registry/css/ui/input';
import type { StoreNameCardData } from '../data';

defineProps<StoreNameCardData>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>
        {{ description }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <Input :placeholder="placeholder" />
      </form>
    </CardContent>
    <CardFooter class="dashboard-settings__card-footer">
      <Button>{{ saveLabel }}</Button>
    </CardFooter>
  </Card>
</template>

<style>
.dashboard-settings__card-footer.dashboard-settings__card-footer {
  padding: calc(var(--spacing) * 4) calc(var(--spacing) * 6);
  border-top: 1px solid var(--border);
}
</style>
