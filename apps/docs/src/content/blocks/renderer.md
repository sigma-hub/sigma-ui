---
title: Blocks - sigma-ui
layout: false
---

<script setup>
import { useUrlSearchParams } from '@vueuse/core'
import ComponentLoader from '../../../.vitepress/theme/components/ComponentLoader.vue'

const params = useUrlSearchParams('hash-params')
</script>

<div v-if="params.name && params.styleSystem" :class="params.containerClass">
  <ComponentLoader :key="params.styleSystem?.toString()" :name="params.name?.toString()" :type-name="'block'" :block-dir="params.blockDir?.toString()" />
</div>
