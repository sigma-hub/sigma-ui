<script setup lang="ts">
import DatePickerWithRange from '@ui/registry/tailwind/example/DatePickerWithRange.vue';
import { Card, CardContent } from '@ui/registry/tailwind/ui/card';
import { Label } from '@ui/registry/tailwind/ui/label';
</script>

<template>
  <Card>
    <CardContent class="pt-6">
      <div class="space-y-2">
        <Label
          for="date"
          class="shrink-0"
        >
          Pick a date
        </Label>
        <DatePickerWithRange class="[&>button]:w-[260px]" />
      </div>
    </CardContent>
  </Card>
</template>
