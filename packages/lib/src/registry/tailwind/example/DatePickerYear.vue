<script setup lang="ts">
import { ref } from 'vue';
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date';
import { CalendarIcon } from '@lucide/vue';
import { YearPicker } from '@ui/registry/tailwind/ui/calendar';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/tailwind/ui/popover';
import { cn } from '@ui/utils';

const df = new DateFormatter('en-US', { year: 'numeric' });

const open = ref(false);
const value = ref<DateValue>();
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-[240px] justify-start text-left font-normal',
          !value && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a year' }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <YearPicker
        v-model="value"
        @update:model-value="open = false"
      />
    </PopoverContent>
  </Popover>
</template>
