<script setup lang="ts">
import type { DateRange } from 'reka-ui';
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { CalendarIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/tailwind/ui/popover';
import { RangeCalendar } from '@ui/registry/tailwind/ui/range-calendar';

defineProps<{
  placeholder: string;
}>();

const formatter = new DateFormatter('en-US', {
  dateStyle: 'medium',
});

const start = new CalendarDate(2023, 1, 20);

const value = ref<DateRange>({
  start,
  end: start.add({ days: 20 }),
});

function formatDate(date: DateRange['start']) {
  if (!date) {
    return '';
  }

  return formatter.format(date.toDate(getLocalTimeZone()));
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        id="date"
        variant="outline"
        class="w-[300px] justify-start text-left font-normal"
      >
        <CalendarIcon class="mr-2 size-4" />
        <template v-if="value.start">
          <template v-if="value.end">
            {{ formatDate(value.start) }} - {{ formatDate(value.end) }}
          </template>
          <template v-else>
            {{ formatDate(value.start) }}
          </template>
        </template>
        <template v-else>
          {{ placeholder }}
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent
      class="w-auto p-0"
      align="end"
    >
      <RangeCalendar
        v-model="value"
        weekday-format="short"
        :number-of-months="2"
        :placeholder="value.start"
      />
    </PopoverContent>
  </Popover>
</template>
