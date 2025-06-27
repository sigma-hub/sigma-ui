<script setup lang="ts">
import { type Ref, ref, watch } from 'vue';
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-vue-next';
import {
  CalendarDate,
  type DateValue,
  isEqualMonth,
} from '@internationalized/date';
import { type DateRange, RangeCalendarRoot, useDateFormatter } from 'reka-ui';
import { type Grid, createMonth, toDate } from 'reka-ui/date';
import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
} from '@ui/registry/css/ui/range-calendar';
import { Button } from '@ui/registry/css/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ui/registry/css/ui/popover';

const value = ref({
  start: new CalendarDate(2022, 1, 20),
  end: new CalendarDate(2022, 1, 20).add({ days: 20 }),
}) as Ref<DateRange>;

const locale = ref('en-US');
const formatter = useDateFormatter(locale.value);

const placeholder = ref(value.value.start) as Ref<DateValue>;
const secondMonthPlaceholder = ref(value.value.end) as Ref<DateValue>;

const firstMonth = ref(
  createMonth({
    dateObj: placeholder.value,
    locale: locale.value,
    fixedWeeks: true,
    weekStartsOn: 0,
  }),
) as Ref<Grid<DateValue>>;
const secondMonth = ref(
  createMonth({
    dateObj: secondMonthPlaceholder.value,
    locale: locale.value,
    fixedWeeks: true,
    weekStartsOn: 0,
  }),
) as Ref<Grid<DateValue>>;

function updateMonth(reference: 'first' | 'second', months: number) {
  if (reference === 'first') {
    placeholder.value = placeholder.value.add({ months });
  } else {
    secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
      months,
    });
  }
}

watch(placeholder, (_placeholder) => {
  firstMonth.value = createMonth({
    dateObj: _placeholder,
    weekStartsOn: 0,
    fixedWeeks: false,
    locale: locale.value,
  });

  if (isEqualMonth(secondMonthPlaceholder.value, _placeholder)) {
    secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
      months: 1,
    });
  }
});

watch(secondMonthPlaceholder, (_secondMonthPlaceholder) => {
  secondMonth.value = createMonth({
    dateObj: _secondMonthPlaceholder,
    weekStartsOn: 0,
    fixedWeeks: false,
    locale: locale.value,
  });

  if (isEqualMonth(_secondMonthPlaceholder, placeholder.value)) {
    placeholder.value = placeholder.value.subtract({ months: 1 });
  }
});
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
            {{
              formatter.custom(toDate(value.start), {
                dateStyle: "medium",
              })
            }}
            -
            {{
              formatter.custom(toDate(value.end), {
                dateStyle: "medium",
              })
            }}
          </template>

          <template v-else>
            {{
              formatter.custom(toDate(value.start), {
                dateStyle: "medium",
              })
            }}
          </template>
        </template>
        <template v-else>
          Pick a date
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="example-sigma-ui-date-picker__content">
      <RangeCalendarRoot
        v-slot="{ weekDays }"
        v-model="value"
        v-model:placeholder="placeholder"
        class="example-sigma-ui-date-picker__calendar"
      >
        <div class="example-sigma-ui-date-picker__months">
          <div class="example-sigma-ui-date-picker__month">
            <div class="example-sigma-ui-date-picker__month-header">
              <button
                class="example-sigma-ui-date-picker__month-button"
                @click="updateMonth('first', -1)"
              >
                <ChevronLeft class="example-sigma-ui-date-picker__month-button-icon" />
              </button>
              <div class="example-sigma-ui-date-picker__month-label">
                {{
                  formatter.fullMonthAndYear(
                    toDate(firstMonth.value),
                  )
                }}
              </div>
              <button
                class="example-sigma-ui-date-picker__month-button"
                @click="updateMonth('first', 1)"
              >
                <ChevronRight class="example-sigma-ui-date-picker__month-button-icon" />
              </button>
            </div>
            <RangeCalendarGrid>
              <RangeCalendarGridHead>
                <RangeCalendarGridRow>
                  <RangeCalendarHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="example-sigma-ui-date-picker__weekday"
                  >
                    {{ day }}
                  </RangeCalendarHeadCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridHead>
              <RangeCalendarGridBody>
                <RangeCalendarGridRow
                  v-for="(weekDates, index) in firstMonth.rows"
                  :key="`weekDate-${index}`"
                  class="example-sigma-ui-date-picker__week"
                >
                  <RangeCalendarCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                  >
                    <RangeCalendarCellTrigger
                      :day="weekDate"
                      :month="firstMonth.value"
                    />
                  </RangeCalendarCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridBody>
            </RangeCalendarGrid>
          </div>
          <div class="example-sigma-ui-date-picker__month">
            <div class="example-sigma-ui-date-picker__month-header">
              <button
                class="example-sigma-ui-date-picker__month-button"
                @click="updateMonth('second', -1)"
              >
                <ChevronLeft class="example-sigma-ui-date-picker__month-button-icon" />
              </button>
              <div class="example-sigma-ui-date-picker__month-label">
                {{
                  formatter.fullMonthAndYear(
                    toDate(secondMonth.value),
                  )
                }}
              </div>
              <button
                class="example-sigma-ui-date-picker__month-button"
                @click="updateMonth('second', 1)"
              >
                <ChevronRight class="example-sigma-ui-date-picker__month-button-icon" />
              </button>
            </div>
            <RangeCalendarGrid>
              <RangeCalendarGridHead>
                <RangeCalendarGridRow>
                  <RangeCalendarHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="example-sigma-ui-date-picker__weekday"
                  >
                    {{ day }}
                  </RangeCalendarHeadCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridHead>
              <RangeCalendarGridBody>
                <RangeCalendarGridRow
                  v-for="(weekDates, index) in secondMonth.rows"
                  :key="`weekDate-${index}`"
                  class="example-sigma-ui-date-picker__week"
                >
                  <RangeCalendarCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                  >
                    <RangeCalendarCellTrigger
                      :day="weekDate"
                      :month="secondMonth.value"
                    />
                  </RangeCalendarCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridBody>
            </RangeCalendarGrid>
          </div>
        </div>
      </RangeCalendarRoot>
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

.example-sigma-ui-date-picker__calendar {
  padding: 0.75rem;
}

.example-sigma-ui-date-picker__months {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

@media (min-width: 640px) {
  .example-sigma-ui-date-picker__months {
    flex-direction: row;
    gap: 1rem;
    margin-top: 0;
  }
}

.example-sigma-ui-date-picker__month {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.example-sigma-ui-date-picker__month-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.example-sigma-ui-date-picker__month-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.75rem;
  width: 1.75rem;
  background-color: transparent;
  padding: 0;
  opacity: 0.5;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
}

.example-sigma-ui-date-picker__month-button:hover {
  opacity: 1;
}

.example-sigma-ui-date-picker__month-button-icon {
  width: 1rem;
  height: 1rem;
}

.example-sigma-ui-date-picker__month-label {
  font-size: 0.875rem;
  font-weight: 500;
}

.example-sigma-ui-date-picker__weekday {
  width: 100%;
}

.example-sigma-ui-date-picker__week {
  margin-top: 0.5rem;
  width: 100%;
}
</style>
