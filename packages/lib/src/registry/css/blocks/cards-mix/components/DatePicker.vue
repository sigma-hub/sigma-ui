<script setup lang="ts">
import DatePickerWithRange from './DatePickerWithRange.vue';
import { Card, CardContent } from '@ui/registry/css/ui/card';
import { Label } from '@ui/registry/css/ui/label';
</script>

<template>
  <Card>
    <CardContent class="cards-mix__gen-27">
      <div class="cards-mix__gen-28">
        <Label
          for="date"
          class="cards-mix__gen-9"
        >
          Pick a date
        </Label>
        <DatePickerWithRange class="cards-mix__date-slot" />
      </div>
    </CardContent>
  </Card>
</template>
