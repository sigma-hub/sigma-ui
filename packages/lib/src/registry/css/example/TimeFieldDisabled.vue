<script setup lang="ts">
import { Time } from '@internationalized/date';
import { type TimeValue } from 'reka-ui';
import { type Ref, ref } from 'vue';
import { TimeField } from '@ui/registry/css/ui/time-field';

const value = ref(new Time(9, 0)) as Ref<TimeValue>;
</script>

<template>
  <TimeField
    v-model="value"
    disabled
  />
</template>
