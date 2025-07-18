<script setup lang="ts">
import { type Ref, ref } from 'vue';
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date';
import { CalendarIcon } from 'lucide-vue-next';
import type { DateRange } from 'reka-ui';
import { RangeCalendar } from '@ui/registry/css/ui/range-calendar';
import { Button } from '@ui/registry/css/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/css/ui/popover';

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
});

const value = ref({
  start: new CalendarDate(2022, 1, 20),
  end: new CalendarDate(2022, 1, 20).add({ days: 20 }),
}) as Ref<DateRange>;
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        class="example-sigma-ui-date-picker__button"
        :class="!value && 'example-sigma-ui-date-picker__button--placeholder'"
      >
        <CalendarIcon class="example-sigma-ui-date-picker__button-icon" />
        <template v-if="value.start">
          <template v-if="value.end">
            {{ df.format(value.start.toDate(getLocalTimeZone())) }} - {{ df.format(value.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else>
            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else>
          Pick a date
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="example-sigma-ui-date-picker__content">
      <RangeCalendar
        v-model="value"
        initial-focus
        :number-of-months="2"
        @update:start-value="(startDate) => value.start = startDate"
      />
    </PopoverContent>
  </Popover>
</template>

<style>
.example-sigma-ui-date-picker__button {
  width: 280px;
  justify-content: flex-start;
  font-weight: normal;
  text-align: left;
}

.example-sigma-ui-date-picker__button--placeholder {
  color: hsl(var(--muted-foreground));
}

.example-sigma-ui-date-picker__button-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.example-sigma-ui-date-picker__content {
  width: auto;
  padding: 0;
}
</style>
