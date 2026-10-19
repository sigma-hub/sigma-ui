<script setup lang="ts">
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from '@ui/registry/tailwind/ui/native-select';
</script>

<template>
  <NativeSelect aria-label="Timezone">
    <NativeSelectOptGroup label="North America">
      <NativeSelectOption value="est">
        Eastern
      </NativeSelectOption>
      <NativeSelectOption value="pst">
        Pacific
      </NativeSelectOption>
    </NativeSelectOptGroup>
    <NativeSelectOptGroup label="Europe">
      <NativeSelectOption value="gmt">
        London
      </NativeSelectOption>
      <NativeSelectOption value="cet">
        Berlin
      </NativeSelectOption>
    </NativeSelectOptGroup>
  </NativeSelect>
</template>
