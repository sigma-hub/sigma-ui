<script setup lang="ts">
import { ref } from 'vue';
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  today,
} from '@internationalized/date';
import { CalendarIcon } from 'lucide-vue-next';
import { Calendar } from '@ui/registry/css/ui/calendar';
import { Button } from '@ui/registry/css/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/css/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/registry/css/ui/select';

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
});

const items = [
  { value: 0, label: 'Today' },
  { value: 1, label: 'Tomorrow' },
  { value: 3, label: 'In 3 days' },
  { value: 7, label: 'In a week' },
];

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
      <div class="example-sigma-ui-date-picker__presets">
        <Select
          @update:model-value="(v) => {
            if (!v) {
              return
            };
            value = today(getLocalTimeZone()).add({ days: Number(v) });
          }"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="item in items"
              :key="item.value"
              :value="item.value.toString()"
            >
              {{ item.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <Calendar v-model="value" />
      </div>
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
}

.example-sigma-ui-date-picker__presets {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
}
</style>
