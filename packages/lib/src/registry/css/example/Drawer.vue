<script setup lang="ts">
import { ref } from 'vue';
import { MinusIcon, PlusIcon } from 'lucide-vue-next';
import { VisStackedBar, VisXYContainer } from '@unovis/vue';
import { Button } from '@ui/registry/css/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@ui/registry/css/ui/drawer';

const goal = ref(350);

type Data = typeof data[number];
const data = [
  { goal: 400 },
  { goal: 300 },
  { goal: 200 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 239 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 349 },
];
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button variant="outline">
        Open Drawer
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <div class="example-sigma-ui-drawer__container">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div class="example-sigma-ui-drawer__content">
          <div class="example-sigma-ui-drawer__goal">
            <Button
              variant="outline"
              size="icon"
              class="example-sigma-ui-drawer__goal-button"
              :disabled="goal <= 200"
              @click="goal -= 10"
            >
              <MinusIcon class="example-sigma-ui-drawer__goal-icon" />
              <span class="sr-only">Decrease</span>
            </Button>
            <div class="example-sigma-ui-drawer__goal-display">
              <div class="example-sigma-ui-drawer__goal-value">
                {{ goal }}
              </div>
              <div class="example-sigma-ui-drawer__goal-label">
                Calories/day
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              class="example-sigma-ui-drawer__goal-button"
              :disabled="goal >= 400"
              @click="goal += 10"
            >
              <PlusIcon class="example-sigma-ui-drawer__goal-icon" />
              <span class="sr-only">Increase</span>
            </Button>
          </div>
          <div class="example-sigma-ui-drawer__chart">
            <VisXYContainer
              :data="data"
              class="example-sigma-ui-drawer__chart-container"
              :style="{
                'opacity': 0.9,
                '--theme-primary': `hsl(var(--foreground))`,
              }"
            >
              <VisStackedBar
                :x="(d: Data, i :number) => i"
                :y="(d: Data) => d.goal"
                color="var(--theme-primary)"
                :bar-padding="0.1"
                :rounded-corners="0"
              />
            </VisXYContainer>
          </div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose as-child>
            <Button variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>

<style>
.example-sigma-ui-drawer__container {
  width: 100%;
  max-width: 24rem;
  margin: 0 auto;
}

.example-sigma-ui-drawer__content {
  padding: 1rem;
  padding-bottom: 0;
}

.example-sigma-ui-drawer__goal {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.example-sigma-ui-drawer__goal-button {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: var(--radius-full);
}

.example-sigma-ui-drawer__goal-icon {
  width: 1rem;
  height: 1rem;
}

.example-sigma-ui-drawer__goal-display {
  flex: 1;
  text-align: center;
}

.example-sigma-ui-drawer__goal-value {
  font-size: 4.5rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1;
}

.example-sigma-ui-drawer__goal-label {
  color: hsl(var(--muted-foreground));
  font-size: 0.7rem;
  line-height: 1;
  text-transform: uppercase;
}

.example-sigma-ui-drawer__chart {
  height: 120px;
  padding: 0 0.75rem;
  margin: 0.75rem;
}

.example-sigma-ui-drawer__chart-container {
  height: 120px;
}
</style>
