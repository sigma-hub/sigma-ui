<script setup lang="ts">
import { ref } from 'vue';
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date';
import { CalendarIcon } from '@lucide/vue';
import { YearPicker } from '@ui/registry/css/ui/calendar';
import { Button } from '@ui/registry/css/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/css/ui/popover';

const df = new DateFormatter('en-US', { year: 'numeric' });

const open = ref(false);
const value = ref<DateValue>();
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        class="example-sigma-ui-date-picker-year__button"
        :class="!value && 'example-sigma-ui-date-picker-year__button--placeholder'"
      >
        <CalendarIcon class="example-sigma-ui-date-picker-year__button-icon" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a year' }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="example-sigma-ui-date-picker-year__content">
      <YearPicker
        v-model="value"
        @update:model-value="open = false"
      />
    </PopoverContent>
  </Popover>
</template>

<style>
.example-sigma-ui-date-picker-year__button {
  width: 240px;
  justify-content: flex-start;
  font-weight: normal;
  text-align: left;
}

.example-sigma-ui-date-picker-year__button--placeholder {
  color: var(--muted-foreground);
}

.example-sigma-ui-date-picker-year__button-icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  margin-right: calc(var(--spacing) * 2);
}

.example-sigma-ui-date-picker-year__content {
  width: auto;
  padding: 0;
}
</style>
