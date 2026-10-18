<script lang="ts" setup>
import { useAttrs } from 'vue';

import type { Component } from 'vue';
import { ChevronRightIcon } from '@lucide/vue';
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

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    'class': `sigma-ui-breadcrumb__action ${isActive ? 'sigma-ui-breadcrumb__action--active' : ''}`,
    'aria-current': isActive ? 'page' : undefined,
  };
}
</script>

<template>
  <Breadcrumb
    data-slot="breadcrumb-generator"
    v-bind="delegatedAttrs()"
    :class="$attrs.class"
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
            class="sigma-ui-breadcrumb__link"
            v-bind="getActionProps(home, false)"
          >
            <component
              :is="home.icon"
              v-if="home.icon"
              class="sigma-ui-breadcrumb__icon"
            />
            <span>{{ home.label }}</span>
          </BreadcrumbLink>
          <BreadcrumbLink
            v-else-if="home.url"
            :href="home.url"
            :target="home.target"
            class="sigma-ui-breadcrumb__link"
            v-bind="getActionProps(home, false)"
          >
            <component
              :is="home.icon"
              v-if="home.icon"
              class="sigma-ui-breadcrumb__icon"
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
              class="sigma-ui-breadcrumb__link"
              v-bind="getActionProps(item, index === (model?.length || 0) - 1)"
            >
              <component
                :is="item.icon"
                v-if="item.icon"
                class="sigma-ui-breadcrumb__icon"
              />
              <span>{{ item.label }}</span>
            </BreadcrumbLink>
            <BreadcrumbLink
              v-else-if="item.url"
              :href="item.url"
              :target="item.target"
              class="sigma-ui-breadcrumb__link"
              v-bind="getActionProps(item, index === (model?.length || 0) - 1)"
            >
              <component
                :is="item.icon"
                v-if="item.icon"
                class="sigma-ui-breadcrumb__icon"
              />
              <span>{{ item.label }}</span>
            </BreadcrumbLink>
            <BreadcrumbPage
              v-else
              v-bind="getActionProps(item, index === (model?.length || 0) - 1)"
            >
              <div class="sigma-ui-breadcrumb__content">
                <component
                  :is="item.icon"
                  v-if="item.icon"
                  class="sigma-ui-breadcrumb__icon"
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

<style>
.sigma-ui-breadcrumb__action {
  display: flex;
  align-items: center;
  color: var(--muted-foreground);
  cursor: pointer;
}

.sigma-ui-breadcrumb__action--active {
  color: var(--foreground);
  font-weight: 500;
}

.sigma-ui-breadcrumb__link {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
}

.sigma-ui-breadcrumb__content {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
}

.sigma-ui-breadcrumb__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}
</style>
