<script setup lang="ts">
import { CornerDownLeftIcon } from 'lucide-vue-next';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import { Label } from '@ui/registry/css/ui/label';
import { Textarea } from '@ui/registry/css/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/registry/css/ui/tooltip';
import { chatActions } from '../data';
</script>

<template>
  <div class="dashboard-ai-playground__chat">
    <Badge
      variant="outline"
      class="dashboard-ai-playground__output-badge"
    >
      Output
    </Badge>
    <div class="dashboard-ai-playground__chat-spacer" />
    <form class="dashboard-ai-playground__composer">
      <Label
        for="message"
        class="dashboard-ai-playground__visually-hidden"
      >
        Message
      </Label>
      <Textarea
        id="message"
        placeholder="Type your message here..."
        class="dashboard-ai-playground__message-input"
      />
      <div class="dashboard-ai-playground__composer-actions">
        <TooltipProvider
          v-for="action in chatActions"
          :key="action.label"
        >
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="ghost"
                size="icon"
                class="dashboard-ai-playground__action-button"
              >
                <component :is="action.icon" />
                <span class="dashboard-ai-playground__visually-hidden">{{ action.label }}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {{ action.tooltip }}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button
          type="submit"
          size="sm"
          class="dashboard-ai-playground__send-button"
        >
          Send Message
          <CornerDownLeftIcon />
        </Button>
      </div>
    </form>
  </div>
</template>

<style>
.dashboard-ai-playground__chat {
  position: relative;
  display: flex;
  height: 100%;
  min-height: 50vh;
  flex-direction: column;
  border-radius: var(--radius-xl);
  background-color: color-mix(in oklch, var(--muted) 50%, transparent);
  padding: 1rem;
}

@media (width >= 1024px) {
  .dashboard-ai-playground__chat {
    grid-column: span 2 / span 2;
  }
}

.dashboard-ai-playground__output-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}

.dashboard-ai-playground__chat-spacer {
  flex: 1 1 0%;
}

.dashboard-ai-playground__composer {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background-color: var(--background);
}

.dashboard-ai-playground__composer:focus-within {
  box-shadow: 0 0 0 1px var(--ring);
}

textarea.dashboard-ai-playground__message-input {
  min-height: 3rem;
  resize: none;
  border-width: 0;
  padding: 0.75rem;
  box-shadow: none;
}

textarea.dashboard-ai-playground__message-input:focus-visible {
  outline: none;
}

.dashboard-ai-playground__composer-actions {
  display: flex;
  align-items: center;
  padding: 0 0.75rem 0.75rem;
}

button.dashboard-ai-playground__action-button svg {
  width: 1rem;
  height: 1rem;
}

button.dashboard-ai-playground__send-button {
  margin-left: auto;
  gap: 0.375rem;
}

button.dashboard-ai-playground__send-button svg {
  width: 0.875rem;
  height: 0.875rem;
}

.dashboard-ai-playground__visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
