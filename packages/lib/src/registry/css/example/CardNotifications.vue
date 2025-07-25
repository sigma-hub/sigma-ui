<script setup lang="ts">
import { BellRingIcon, CheckIcon } from 'lucide-vue-next';
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
  <Card class="example-sigma-ui-card-notifications">
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
  gap: 1rem;
}

.example-sigma-ui-card-notifications__switch {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  gap: 1rem;
}

.example-sigma-ui-card-notifications__switch-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.25rem;
}

.example-sigma-ui-card-notifications__switch-title {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.example-sigma-ui-card-notifications__switch-description {
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
}

.example-sigma-ui-card-notifications__item {
  display: grid;
  align-items: start;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  grid-template-columns: 25px minmax(0, 1fr);
}

.example-sigma-ui-card-notifications__item:last-child {
  padding-bottom: 0;
  margin-bottom: 0;
}

.example-sigma-ui-card-notifications__item-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: var(--radius-full);
  margin-top: 0.25rem;
  background-color: hsl(200deg 98% 39%);
}

.example-sigma-ui-card-notifications__item-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.example-sigma-ui-card-notifications__item-title {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.example-sigma-ui-card-notifications__item-description {
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
}

.example-sigma-ui-card-notifications__button {
  width: 100%;
}

.example-sigma-ui-card-notifications__button-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}
</style>
