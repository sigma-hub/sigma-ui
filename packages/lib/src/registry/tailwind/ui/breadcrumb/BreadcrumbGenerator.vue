<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import type { Component } from 'vue';
import { ChevronRightIcon } from 'lucide-vue-next';
import {
  Breadcrumb,
  BreadcrumbItem as BreadcrumbItemComponent,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '.';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

export interface BreadcrumbRouteLocation {
  name?: string | symbol;
  path?: string;
  params?: Record<string, unknown>;
  query?: Record<string, unknown>;
  hash?: string;
  replace?: boolean;
}

export interface BreadcrumbItem {
  label?: string;
  icon?: string | Component;
  url?: string;
  route?: string | BreadcrumbRouteLocation;
  target?: string;
  active?: boolean;
}

interface ActionProps {
  /** Classes for the active or inactive item. */
  'class'?: string;
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
}

const props = defineProps<{
  /** Item rendered first, before the model items. */
  home?: BreadcrumbItem;
  /** Items to render in order; the last one is marked as the current page. */
  model?: BreadcrumbItem[];
}>();

defineSlots<{
  /** Replaces the rendering of the home item. */
  home?: (props: { item: BreadcrumbItem; props: { action: ActionProps } }) => unknown;
  /** Replaces the chevron icon between items. */
  separator?: () => unknown;
  /** Replaces the rendering of each model item. */
  item?: (props: { item: BreadcrumbItem; props: { action: ActionProps } }) => unknown;
}>();

function getActionProps(item: BreadcrumbItem, isLast: boolean): ActionProps {
  const isActive = item.active || isLast;
  return {
    'class': `cursor-pointer flex items-center ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground'}`,
    'aria-current': isActive ? 'page' : undefined,
  };
}
</script>

<template>
  <Breadcrumb
    v-bind="delegatedAttrs"
    :class="$attrs.class"
    data-slot="breadcrumb-generator"
  >
    <BreadcrumbList>
      <BreadcrumbItemComponent v-if="home">
        <slot
          name="home"
          :item="home"
          :props="{ action: getActionProps(home, false) }"
        >
          <BreadcrumbLink
            v-if="home.route"
            :to="home.route"
            class="flex items-center gap-2"
            v-bind="getActionProps(home, false)"
          >
            <component
              :is="home.icon"
              v-if="home.icon"
              class="h-4 w-4"
            />
            <span>{{ home.label }}</span>
          </BreadcrumbLink>
          <BreadcrumbLink
            v-else-if="home.url"
            :href="home.url"
            :target="home.target"
            class="flex items-center gap-2"
            v-bind="getActionProps(home, false)"
          >
            <component
              :is="home.icon"
              v-if="home.icon"
              class="h-4 w-4"
            />
            <span v-if="home.label">{{ home.label }}</span>
          </BreadcrumbLink>
        </slot>
      </BreadcrumbItemComponent>

      <BreadcrumbSeparator v-if="home && model?.length">
        <slot name="separator">
          <ChevronRightIcon />
        </slot>
      </BreadcrumbSeparator>

      <template
        v-for="(item, index) in (model || [])"
        :key="index"
      >
        <BreadcrumbItemComponent>
          <slot
            name="item"
            :item="item"
            :props="{ action: getActionProps(item, index === (model?.length || 0) - 1) }"
          >
            <BreadcrumbLink
              v-if="item.route"
              :to="item.route"
              class="flex items-center gap-2"
              v-bind="getActionProps(item, index === (model?.length || 0) - 1)"
            >
              <component
                :is="item.icon"
                v-if="item.icon"
                class="h-4 w-4"
              />
              <span>{{ item.label }}</span>
            </BreadcrumbLink>
            <BreadcrumbLink
              v-else-if="item.url"
              :href="item.url"
              :target="item.target"
              class="flex items-center gap-2"
              v-bind="getActionProps(item, index === (model?.length || 0) - 1)"
            >
              <component
                :is="item.icon"
                v-if="item.icon"
                class="h-4 w-4"
              />
              <span>{{ item.label }}</span>
            </BreadcrumbLink>
            <BreadcrumbPage
              v-else
              v-bind="getActionProps(item, index === (model?.length || 0) - 1)"
            >
              <div class="flex items-center gap-2">
                <component
                  :is="item.icon"
                  v-if="item.icon"
                  class="h-4 w-4"
                />
                <span>{{ item.label }}</span>
              </div>
            </BreadcrumbPage>
          </slot>
        </BreadcrumbItemComponent>

        <BreadcrumbSeparator v-if="index < (model?.length || 0) - 1">
          <slot name="separator">
            <ChevronRightIcon />
          </slot>
        </BreadcrumbSeparator>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
