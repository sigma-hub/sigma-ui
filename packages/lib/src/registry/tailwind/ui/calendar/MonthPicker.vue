<script lang="ts" setup>
import { useAttrs } from 'vue';

import { MonthPickerRoot, type MonthPickerRootEmits, type MonthPickerRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
import { MonthPickerCell, MonthPickerCellTrigger, MonthPickerGrid, MonthPickerGridBody, MonthPickerGridRow, MonthPickerHeader, MonthPickerHeading, MonthPickerNextButton, MonthPickerPrevButton } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MonthPickerRootProps>();
const emits = defineEmits<MonthPickerRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MonthPickerRoot
    v-slot="{ grid }"
    data-slot="month-picker"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('w-fit p-3', $attrs.class ?? '')"
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
