<script lang="ts" setup>
import { useAttrs } from 'vue';

import { YearPickerRoot, type YearPickerRootEmits, type YearPickerRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
import { YearPickerCell, YearPickerCellTrigger, YearPickerGrid, YearPickerGridBody, YearPickerGridRow, YearPickerHeader, YearPickerHeading, YearPickerNextButton, YearPickerPrevButton } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<YearPickerRootProps>();
const emits = defineEmits<YearPickerRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <YearPickerRoot
    v-slot="{ grid }"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    data-slot="year-picker"
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
