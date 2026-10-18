<script lang="ts" setup>
import { useAttrs } from 'vue';

import { YearPickerRoot, type YearPickerRootEmits, type YearPickerRootProps, useForwardPropsEmits } from 'reka-ui';
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
    data-slot="year-picker"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-year-picker"
    :class="[$attrs.class]"
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
          class="sigma-ui-year-picker__row"
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

<style>
.sigma-ui-year-picker {
  width: fit-content;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.sigma-ui-year-picker__row {
  width: 100%;
  margin-top: 0.5rem;
}
</style>
