<script lang="ts" setup>
import { CalendarRoot, type CalendarRootEmits, type CalendarRootProps, useForwardPropsEmits } from 'reka-ui';
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading, CalendarNextButton, CalendarPrevButton } from '.';

const props = defineProps<CalendarRootProps>();
const emits = defineEmits<CalendarRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <CalendarRoot
    v-slot="{ grid, weekDays }"
    class="sigma-ui-calendar"
    v-bind="forwarded"
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
.sigma-ui-calendar {
  padding: 0.75rem;
}

.sigma-ui-calendar__grid-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.sigma-ui-calendar__week-row {
  margin-top: 0.5rem;
  width: 100%;
}

@media (min-width: 640px) {
  .sigma-ui-calendar__grid-container {
    flex-direction: row;
    gap: 1rem;
  }
}
</style>
