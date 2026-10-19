<script setup lang="ts">
import { CornerDownLeftIcon } from '@lucide/vue';
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
@layer components {
  .dashboard-ai-playground__chat {
    position: relative;
    display: flex;
    height: 100%;
    min-height: 50vh;
    flex-direction: column;
    padding: calc(var(--spacing) * 4);
    border-radius: var(--radius-xl);
    background-color: color-mix(in oklch, var(--muted) 50%, transparent);
  }

  @media (width >= 64rem) {
    .dashboard-ai-playground__chat {
      grid-column: span 2 / span 2;
    }
  }

  .dashboard-ai-playground__output-badge {
    position: absolute;
    top: calc(var(--spacing) * 3);
    right: calc(var(--spacing) * 3);
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
    min-height: calc(var(--spacing) * 12);
    padding: calc(var(--spacing) * 3);
    border-width: 0;
    box-shadow: none;
    resize: none;
  }

  textarea.dashboard-ai-playground__message-input:focus-visible {
    outline: none;
  }

  .dashboard-ai-playground__composer-actions {
    display: flex;
    align-items: center;
    padding: 0 calc(var(--spacing) * 3) calc(var(--spacing) * 3);
  }

  button.dashboard-ai-playground__action-button svg {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }

  button.dashboard-ai-playground__send-button {
    margin-left: auto;
    gap: calc(var(--spacing) * 1.5);
  }

  button.dashboard-ai-playground__send-button svg {
    width: calc(var(--spacing) * 3.5);
    height: calc(var(--spacing) * 3.5);
  }

  .dashboard-ai-playground__visually-hidden {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    border-width: 0;
    margin: -1px;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
}
</style>
