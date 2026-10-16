<script setup lang="ts">
import { ref } from 'vue';
import { MinusIcon, PlusIcon } from 'lucide-vue-next';
import { VisStackedBar, VisXYContainer } from '@unovis/vue';
import { Button } from '@ui/registry/css/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/registry/css/ui/card';

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
  <Card>
    <CardHeader class="cards-mix__gen-29">
      <CardTitle class="cards-mix__gen-30">
        Move Goal
      </CardTitle>
      <CardDescription>Set your daily activity goal.</CardDescription>
    </CardHeader>
    <CardContent class="cards-mix__gen-31">
      <div class="cards-mix__gen-32">
        <Button
          variant="outline"
          size="icon"
          class="cards-mix__gen-33"
          :disabled="goal <= 200"
          @click="goal -= 10"
        >
          <MinusIcon class="cards-mix__gen-34" />
          <span class="cards-mix__sr-only">Decrease</span>
        </Button>
        <div class="cards-mix__gen-35">
          <div class="cards-mix__gen-36">
            {{ goal }}
          </div>
          <div class="cards-mix__gen-37">
            Calories/day
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          class="cards-mix__gen-33"
          :disabled="goal >= 400"
          @click="goal += 10 "
        >
          <PlusIcon class="cards-mix__gen-34" />
          <span class="cards-mix__sr-only">Increase</span>
        </Button>
      </div>
      <div class="cards-mix__gen-38">
        <VisXYContainer
          :data="data"
          height="60px"
          :style="{
            opacity: 0.2,
          }"
        >
          <VisStackedBar
            :x="(d: Data, i :number) => i"
            :y="(d: Data) => d.goal"
            color="var(--primary)"
            :bar-padding="0.1"
            :rounded-corners="0"
          />
        </VisXYContainer>
      </div>
    </CardContent>
    <CardFooter>
      <Button class="cards-mix__gen-1">
        Set Goal
      </Button>
    </CardFooter>
  </Card>
</template>

<style>
.cards-mix__sr-only {
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
</style>
