<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/registry/css/ui/card';
import { BellIcon, EyeOffIcon, UserRoundIcon } from 'lucide-vue-next';
</script>

<template>
  <Card>
    <CardHeader class="cards-mix__gen-60">
      <CardTitle>Notifications</CardTitle>
      <CardDescription>
        Choose what you want to be notified about.
      </CardDescription>
    </CardHeader>
    <CardContent class="cards-mix__gen-61">
      <div class="cards-mix__gen-62">
        <BellIcon class="cards-mix__gen-63" />
        <div class="cards-mix__gen-40">
          <p class="cards-mix__gen-16">
            Everything
          </p>
          <p class="cards-mix__gen-17">
            Email digest, mentions & all activity.
          </p>
        </div>
      </div>
      <div class="cards-mix__gen-64">
        <UserRoundIcon class="cards-mix__gen-63" />
        <div class="cards-mix__gen-40">
          <p class="cards-mix__gen-16">
            Available
          </p>
          <p class="cards-mix__gen-17">
            Only mentions and comments.
          </p>
        </div>
      </div>
      <div class="cards-mix__gen-62">
        <EyeOffIcon class="cards-mix__gen-63" />
        <div class="cards-mix__gen-40">
          <p class="cards-mix__gen-16">
            Ignoring
          </p>
          <p class="cards-mix__gen-17">
            Turn off all notifications.
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
