<script setup lang="ts">
import FormsLayout from './layouts/FormsLayout.vue';
import ProfileForm from './components/ProfileForm.vue';
import Card from '@ui/registry/tailwind/ui/card/Card.vue';
</script>

<template>
  <Card>
    <FormsLayout>
      <ProfileForm />
    </FormsLayout>
  </Card>
</template>
