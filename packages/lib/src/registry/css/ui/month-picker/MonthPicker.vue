<script lang="ts" setup>
import { MonthPickerRoot, type MonthPickerRootEmits, type MonthPickerRootProps, useForwardPropsEmits } from 'reka-ui';
import { MonthPickerCell, MonthPickerCellTrigger, MonthPickerGrid, MonthPickerGridBody, MonthPickerGridRow, MonthPickerHeader, MonthPickerHeading, MonthPickerNextButton, MonthPickerPrevButton } from '.';

const props = defineProps<MonthPickerRootProps>();
const emits = defineEmits<MonthPickerRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MonthPickerRoot
    v-slot="{ grid }"
    data-slot="month-picker"
    class="sigma-ui-month-picker"
    v-bind="forwarded"
    :class="[$attrs.class]"
  >
    <MonthPickerHeader>
      <MonthPickerPrevButton />
      <MonthPickerHeading />
      <MonthPickerNextButton />
    </MonthPickerHeader>
    <MonthPickerGrid>
      <MonthPickerGridBody>
        <MonthPickerGridRow
          v-for="(row, index) in grid.rows"
          :key="index"
          class="sigma-ui-month-picker__row"
        >
          <MonthPickerCell
            v-for="date in row"
            :key="date.toString()"
            :date="date"
          >
            <MonthPickerCellTrigger :month="date" />
          </MonthPickerCell>
        </MonthPickerGridRow>
      </MonthPickerGridBody>
    </MonthPickerGrid>
  </MonthPickerRoot>
</template>

<style>
.sigma-ui-month-picker {
  width: fit-content;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.sigma-ui-month-picker__row {
  width: 100%;
  margin-top: 0.5rem;
}
</style>
