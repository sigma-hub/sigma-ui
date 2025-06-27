<script lang="ts" setup>
import Card from '@ui/registry/tailwind/ui/card/Card.vue';
import Mail from './components/Mail.vue';
import { accounts, mails } from './data/mails';
</script>

<template>
  <Card>
    <Mail
      :accounts="accounts"
      :mails="mails"
      :nav-collapsed-size="4"
    />
  </Card>
</template>
