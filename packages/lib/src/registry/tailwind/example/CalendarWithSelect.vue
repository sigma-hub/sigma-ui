<script setup lang="ts">
import { type Ref, computed } from 'vue';
import { CalendarRoot, type CalendarRootEmits, type CalendarRootProps, useDateFormatter, useForwardPropsEmits } from 'reka-ui';
import { createDecade, createYear, toDate } from 'reka-ui/date';
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import { useVModel } from '@vueuse/core';
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading } from '@ui/registry/tailwind/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/registry/tailwind/ui/select';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<CalendarRootProps>(), {
  modelValue: undefined,
  placeholder() {
    return today(getLocalTimeZone());
  },
  weekdayFormat: 'short',
});
const emits = defineEmits<CalendarRootEmits>();

const delegatedProps = computed(() => ({ ...props, placeholder: undefined }));
const forwarded = useForwardPropsEmits(delegatedProps, emits);

const placeholder = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: today(getLocalTimeZone()),
}) as Ref<DateValue>;

const formatter = useDateFormatter('en');
</script>

<template>
  <CalendarRoot
    v-slot="{ date, grid, weekDays }"
    v-model:placeholder="placeholder"
    v-bind="forwarded"
    :class="cn('rounded-md border p-3', $attrs.class ?? '')"
  >
    <CalendarHeader>
      <CalendarHeading class="flex w-full items-center justify-between gap-2">
        <Select
          :default-value="placeholder.month.toString()"
          @update:model-value="(value) => {
            if (!value || !placeholder) { return };
            if (Number(value) === placeholder?.month) { return };
            placeholder = placeholder.set({
              month: Number(value),
            })
          }"
        >
          <SelectTrigger
            aria-label="Select month"
            class="w-[60%]"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent class="max-h-[200px]">
            <SelectItem
              v-for="month in createYear({ dateObj: date })"
              :key="month.toString()"
              :value="month.month.toString()"
            >
              {{ formatter.custom(toDate(month), { month: 'long' }) }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          :default-value="props.placeholder.year.toString()"
          @update:model-value="(value) => {
            if (!value || !placeholder) { return };
            if (Number(value) === placeholder?.year) { return };
            placeholder = placeholder.set({
              year: Number(value),
            })
          }"
        >
          <SelectTrigger
            aria-label="Select year"
            class="w-[40%]"
          >
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent class="max-h-[200px]">
            <SelectItem
              v-for="yearValue in createDecade({ dateObj: date, startIndex: -10, endIndex: 10 })"
              :key="yearValue.toString()"
              :value="yearValue.year.toString()"
            >
              {{ yearValue.year }}
            </SelectItem>
          </SelectContent>
        </Select>
      </CalendarHeading>
    </CalendarHeader>

    <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <CalendarGrid
        v-for="month in grid"
        :key="month.value.toString()"
      >
        <CalendarGridHead>
          <CalendarGridRow>
            <CalendarHeadCell
              v-for="day in weekDays"
              :key="day"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody class="grid">
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="mt-2 w-full"
          >
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
              />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
