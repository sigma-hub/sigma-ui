<script setup lang="ts">
import { type Ref, computed } from 'vue';
import { CalendarRoot, type CalendarRootEmits, type CalendarRootProps, useDateFormatter, useForwardPropsEmits } from 'reka-ui';
import { createDecade, createYear, toDate } from 'reka-ui/date';
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import { useVModel } from '@vueuse/core';
import { ref } from 'vue';
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading } from '@ui/registry/css/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/registry/css/ui/select';

const props = withDefaults(defineProps<CalendarRootProps>(), {
  modelValue: undefined,
  placeholder() {
    return today(getLocalTimeZone());
  },
  weekdayFormat: 'short',
});
const emits = defineEmits<CalendarRootEmits>();

const delegatedProps = computed(() => ({ ...props, placeholder: undefined }));

const placeholder = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: today(getLocalTimeZone()),
}) as Ref<DateValue>;

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const formatter = useDateFormatter('en');

const locale = ref('fr');
formatter.setLocale(locale.value);
</script>

<template>
  <CalendarRoot
    v-slot="{ date, grid, weekDays }"
    v-model:placeholder="placeholder"
    v-bind="forwarded"
    :locale="locale"
    class="example-sigma-ui-calendar-localization"
  >
    <CalendarHeader>
      <CalendarHeading class="example-sigma-ui-calendar-localization__heading">
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
            class="example-sigma-ui-calendar-localization__month-trigger"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent class="example-sigma-ui-calendar-localization__month-content">
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
            class="example-sigma-ui-calendar-localization__year-trigger"
          >
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent class="example-sigma-ui-calendar-localization__year-content">
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

    <div class="example-sigma-ui-calendar-localization__grid-container">
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
        <CalendarGridBody class="example-sigma-ui-calendar-localization__grid">
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="example-sigma-ui-calendar-localization__week-row"
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

<style>
.example-sigma-ui-calendar-localization {
  padding: 0.75rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
}

.example-sigma-ui-calendar-localization__heading {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.example-sigma-ui-calendar-localization__month-trigger {
  width: 60%;
}

.example-sigma-ui-calendar-localization__year-trigger {
  width: 40%;
}

.example-sigma-ui-calendar-localization__month-content,
.example-sigma-ui-calendar-localization__year-content {
  max-height: 200px;
}

.example-sigma-ui-calendar-localization__grid-container {
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  gap: 1rem;
}

.example-sigma-ui-calendar-localization__grid {
  display: grid;
}

.example-sigma-ui-calendar-localization__week-row {
  width: 100%;
  margin-top: 0.5rem;
}

@media (width >= 640px) {
  .example-sigma-ui-calendar-localization__grid-container {
    flex-direction: row;
    gap: 1rem;
  }
}
</style>
