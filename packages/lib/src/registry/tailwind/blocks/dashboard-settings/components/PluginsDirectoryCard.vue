<script setup lang="ts">
import { Button } from '@ui/registry/tailwind/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import { Checkbox } from '@ui/registry/tailwind/ui/checkbox';
import { Input } from '@ui/registry/tailwind/ui/input';
import type { PluginsDirectoryCardData } from '../data';

defineProps<PluginsDirectoryCardData>();
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
      <form class="flex flex-col gap-4">
        <Input
          :placeholder="placeholder"
          :model-value="directory"
        />
        <div class="flex items-center space-x-2">
          <Checkbox
            :id="checkboxId"
            :model-value="includeChecked"
          />
          <label
            :for="checkboxId"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {{ checkboxLabel }}
          </label>
        </div>
      </form>
    </CardContent>
    <CardFooter class="border-t px-6 py-4">
      <Button>{{ saveLabel }}</Button>
    </CardFooter>
  </Card>
</template>
