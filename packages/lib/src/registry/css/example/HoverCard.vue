<script setup lang="ts">
import { CalendarDaysIcon } from 'lucide-vue-next';
import { Avatar } from '@ui/registry/css/ui/avatar';
import { Button } from '@ui/registry/css/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@ui/registry/css/ui/hover-card';
</script>

<template>
  <HoverCard
    :open-delay="0"
    :close-delay="100"
  >
    <HoverCardTrigger as-child>
      <Button variant="link">
        @vuejs
      </Button>
    </HoverCardTrigger>
    <HoverCardContent class="example-sigma-ui-hover__content">
      <div class="example-sigma-ui-hover__container">
        <Avatar size="sm" />
        <div class="example-sigma-ui-hover__info">
          <h4 class="example-sigma-ui-hover__title">
            @vuejs
          </h4>
          <p class="example-sigma-ui-hover__description">
            Progressive JavaScript framework for building modern web interfaces.
          </p>
          <div class="example-sigma-ui-hover__footer">
            <CalendarDaysIcon class="example-sigma-ui-hover__icon" />
            <span class="example-sigma-ui-hover__date">
              Joined January 2014
            </span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>

<style>
.example-sigma-ui-hover__content {
  width: 20rem;
}

.example-sigma-ui-hover__container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.example-sigma-ui-hover__info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.example-sigma-ui-hover__title {
  font-size: 0.875rem;
  font-weight: 600;
}

.example-sigma-ui-hover__description {
  font-size: 0.875rem;
}

.example-sigma-ui-hover__footer {
  display: flex;
  align-items: center;
  padding-top: 0.5rem;
}

.example-sigma-ui-hover__icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  opacity: 0.7;
}

.example-sigma-ui-hover__date {
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
}
</style>
