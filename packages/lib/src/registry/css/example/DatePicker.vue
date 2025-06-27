<script setup lang="ts">
import { ref } from 'vue';
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date';
import { CalendarIcon } from 'lucide-vue-next';
import { Calendar } from '@ui/registry/css/ui/calendar';
import { Button } from '@ui/registry/css/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/css/ui/popover';

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
});

const value = ref<DateValue>();
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
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="example-sigma-ui-date-picker__content">
      <Calendar
        v-model="value"
        initial-focus
      />
    </PopoverContent>
  </Popover>
</template>

<style>
.example-sigma-ui-date-picker__button {
  width: 280px;
  justify-content: flex-start;
  text-align: left;
  font-weight: normal;
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
