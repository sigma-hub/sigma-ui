<script lang="ts" setup>
import { useAttrs } from 'vue';

import { CalendarRoot, type CalendarRootEmits, type CalendarRootProps, useForwardPropsEmits } from 'reka-ui';
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading, CalendarNextButton, CalendarPrevButton } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<CalendarRootProps>();
const emits = defineEmits<CalendarRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <CalendarRoot
    v-slot="{ grid, weekDays }"
    class="sigma-ui-calendar"
    data-slot="calendar"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <CalendarHeader>
      <CalendarPrevButton />
      <CalendarHeading />
      <CalendarNextButton />
    </CalendarHeader>

    <div class="sigma-ui-calendar__grid-container">
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
        <CalendarGridBody>
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="sigma-ui-calendar__week-row"
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
@layer components {
  .sigma-ui-calendar {
    padding: calc(var(--spacing) * 3);
  }

  .sigma-ui-calendar__grid-container {
    display: flex;
    flex-direction: column;
    margin-top: calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 4);
  }

  .sigma-ui-calendar__week-row {
    width: 100%;
    margin-top: calc(var(--spacing) * 2);
  }

  @media (width >= 40rem) {
    .sigma-ui-calendar__grid-container {
      flex-direction: row;
      gap: calc(var(--spacing) * 4);
    }
  }
}
</style>
