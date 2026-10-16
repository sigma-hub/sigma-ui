<script lang="ts" setup>
import { YearPickerRoot, type YearPickerRootEmits, type YearPickerRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
import { YearPickerCell, YearPickerCellTrigger, YearPickerGrid, YearPickerGridBody, YearPickerGridRow, YearPickerHeader, YearPickerHeading, YearPickerNextButton, YearPickerPrevButton } from '.';

const props = defineProps<YearPickerRootProps>();
const emits = defineEmits<YearPickerRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <YearPickerRoot
    v-slot="{ grid }"
    data-slot="year-picker"
    v-bind="forwarded"
    :class="cn('w-fit rounded-md border p-3', $attrs.class ?? '')"
  >
    <YearPickerHeader>
      <YearPickerPrevButton />
      <YearPickerHeading />
      <YearPickerNextButton />
    </YearPickerHeader>
    <YearPickerGrid>
      <YearPickerGridBody>
        <YearPickerGridRow
          v-for="(row, index) in grid.rows"
          :key="index"
          class="mt-2 w-full"
        >
          <YearPickerCell
            v-for="date in row"
            :key="date.toString()"
            :date="date"
          >
            <YearPickerCellTrigger :year="date" />
          </YearPickerCell>
        </YearPickerGridRow>
      </YearPickerGridBody>
    </YearPickerGrid>
  </YearPickerRoot>
</template>
