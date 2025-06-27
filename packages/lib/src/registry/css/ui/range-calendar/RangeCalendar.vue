<script lang="ts" setup>
import { RangeCalendarRoot, type RangeCalendarRootEmits, type RangeCalendarRootProps, useForwardPropsEmits } from 'reka-ui';
import { RangeCalendarCell, RangeCalendarCellTrigger, RangeCalendarGrid, RangeCalendarGridBody, RangeCalendarGridHead, RangeCalendarGridRow, RangeCalendarHeadCell, RangeCalendarHeader, RangeCalendarHeading, RangeCalendarNextButton, RangeCalendarPrevButton } from '.';

const props = defineProps<RangeCalendarRootProps>();
const emits = defineEmits<RangeCalendarRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <RangeCalendarRoot
    v-slot="{ grid, weekDays }"
    class="sigma-ui-range-calendar"
    v-bind="forwarded"
  >
    <RangeCalendarHeader>
      <RangeCalendarPrevButton />
      <RangeCalendarHeading />
      <RangeCalendarNextButton />
    </RangeCalendarHeader>

    <div class="sigma-ui-range-calendar__grid-container">
      <RangeCalendarGrid
        v-for="month in grid"
        :key="month.value.toString()"
      >
        <RangeCalendarGridHead>
          <RangeCalendarGridRow>
            <RangeCalendarHeadCell
              v-for="day in weekDays"
              :key="day"
            >
              {{ day }}
            </RangeCalendarHeadCell>
          </RangeCalendarGridRow>
        </RangeCalendarGridHead>
        <RangeCalendarGridBody>
          <RangeCalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="sigma-ui-range-calendar__week-row"
          >
            <RangeCalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
            >
              <RangeCalendarCellTrigger
                :day="weekDate"
                :month="month.value"
              />
            </RangeCalendarCell>
          </RangeCalendarGridRow>
        </RangeCalendarGridBody>
      </RangeCalendarGrid>
    </div>
  </RangeCalendarRoot>
</template>

<style>
.sigma-ui-range-calendar {
  padding: 0.75rem;
}

.sigma-ui-range-calendar__grid-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.sigma-ui-range-calendar__week-row {
  margin-top: 0.5rem;
  width: 100%;
}

@media (min-width: 640px) {
  .sigma-ui-range-calendar__grid-container {
    flex-direction: row;
    gap: 1rem;
  }
}
</style>
