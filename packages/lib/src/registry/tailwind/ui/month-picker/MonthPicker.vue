<script lang="ts" setup>
import { MonthPickerRoot, type MonthPickerRootEmits, type MonthPickerRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
import { MonthPickerCell, MonthPickerCellTrigger, MonthPickerGrid, MonthPickerGridBody, MonthPickerGridRow, MonthPickerHeader, MonthPickerHeading, MonthPickerNextButton, MonthPickerPrevButton } from '.';

const props = defineProps<MonthPickerRootProps>();
const emits = defineEmits<MonthPickerRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MonthPickerRoot
    v-slot="{ grid }"
    data-slot="month-picker"
    v-bind="forwarded"
    :class="cn('w-fit rounded-md border p-3', $attrs.class ?? '')"
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
          class="mt-2 w-full"
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
