<script setup lang="ts">
import { useAttrs } from 'vue';

import { BellRingIcon, CheckIcon } from '@lucide/vue';
import { Button } from '@ui/registry/css/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/registry/css/ui/card';
import { Switch } from '@ui/registry/css/ui/switch';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
];
</script>

<template>
  <Card
    class="example-sigma-ui-card-notifications"
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
  >
    <CardHeader>
      <CardTitle>Notifications</CardTitle>
      <CardDescription>You have 3 unread messages.</CardDescription>
    </CardHeader>
    <CardContent class="example-sigma-ui-card-notifications__content">
      <div class="example-sigma-ui-card-notifications__switch">
        <BellRingIcon />
        <div class="example-sigma-ui-card-notifications__switch-content">
          <p class="example-sigma-ui-card-notifications__switch-title">
            Push Notifications
          </p>
          <p class="example-sigma-ui-card-notifications__switch-description">
            Send notifications to device.
          </p>
        </div>
        <Switch />
      </div>
      <div>
        <div
          v-for="(notification, index) in notifications"
          :key="index"
          class="example-sigma-ui-card-notifications__item"
        >
          <span class="example-sigma-ui-card-notifications__item-dot" />
          <div class="example-sigma-ui-card-notifications__item-content">
            <p class="example-sigma-ui-card-notifications__item-title">
              {{ notification.title }}
            </p>
            <p class="example-sigma-ui-card-notifications__item-description">
              {{ notification.description }}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button class="example-sigma-ui-card-notifications__button">
        <CheckIcon class="example-sigma-ui-card-notifications__button-icon" /> Mark all as read
      </Button>
    </CardFooter>
  </Card>
</template>

<style>
.example-sigma-ui-card-notifications {
  width: 380px;
}

.example-sigma-ui-card-notifications__content {
  display: grid;
  gap: calc(var(--spacing) * 4);
}

.example-sigma-ui-card-notifications__switch {
  display: flex;
  align-items: center;
  padding: calc(var(--spacing) * 4);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  gap: calc(var(--spacing) * 4);
}

.example-sigma-ui-card-notifications__switch-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: calc(var(--spacing) * 1);
}

.example-sigma-ui-card-notifications__switch-title {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.example-sigma-ui-card-notifications__switch-description {
  color: var(--muted-foreground);
  font-size: 0.875rem;
}

.example-sigma-ui-card-notifications__item {
  display: grid;
  align-items: start;
  padding-bottom: calc(var(--spacing) * 4);
  margin-bottom: calc(var(--spacing) * 4);
  grid-template-columns: 25px minmax(0, 1fr);
}

.example-sigma-ui-card-notifications__item:last-child {
  padding-bottom: 0;
  margin-bottom: 0;
}

.example-sigma-ui-card-notifications__item-dot {
  width: calc(var(--spacing) * 2);
  height: calc(var(--spacing) * 2);
  border-radius: var(--radius-full);
  margin-top: calc(var(--spacing) * 1);
  background-color: hsl(200deg 98% 39%);
}

.example-sigma-ui-card-notifications__item-content {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 1);
}

.example-sigma-ui-card-notifications__item-title {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.example-sigma-ui-card-notifications__item-description {
  color: var(--muted-foreground);
  font-size: 0.875rem;
}

.example-sigma-ui-card-notifications__button {
  width: 100%;
}

.example-sigma-ui-card-notifications__button-icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  margin-right: calc(var(--spacing) * 2);
}
</style>
