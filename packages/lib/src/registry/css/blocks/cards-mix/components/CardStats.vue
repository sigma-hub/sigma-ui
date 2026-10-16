<script setup lang="ts">
import { VisLine, VisScatter, VisStackedBar, VisXYContainer } from '@unovis/vue';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/registry/css/ui/card';

type Data = typeof data[number];
const data = [
  { revenue: 10400, subscription: 240 },
  { revenue: 14405, subscription: 300 },
  { revenue: 9400, subscription: 200 },
  { revenue: 8200, subscription: 278 },
  { revenue: 7000, subscription: 189 },
  { revenue: 9600, subscription: 239 },
  { revenue: 11244, subscription: 278 },
  { revenue: 26475, subscription: 189 },
];

const lineX = (d: Data, i: number) => i;
const lineY = (d: Data) => d.revenue;
</script>

<template>
  <div class="cards-mix__card-stats">
    <Card>
      <CardHeader class="cards-mix__card-stats__header">
        <CardTitle class="cards-mix__card-stats__title">
          Total Revenue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="cards-mix__card-stats__value">
          $15,231.89
        </div>
        <p class="cards-mix__card-stats__change">
          +20.1% from last month
        </p>

        <div class="cards-mix__card-stats__chart">
          <VisXYContainer
            height="80px"
            :data="data"
            :margin="{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }"
          >
            <VisLine
              :x="lineX"
              :y="lineY"
              color="var(--primary)"
            />
            <VisScatter
              :x="lineX"
              :y="lineY"
              :size="6"
              stroke-color="var(--primary)"
              :stroke-width="2"
              color="white"
            />
          </VisXYContainer>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="cards-mix__card-stats__header">
        <CardTitle class="cards-mix__card-stats__title">
          Subscriptions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="cards-mix__card-stats__value">
          +2,350
        </div>
        <p class="cards-mix__card-stats__change">
          +54.8% from last month
        </p>

        <div class="cards-mix__card-stats__chart">
          <VisXYContainer
            height="80px"
            :data="data"
          >
            <VisStackedBar
              :x="lineX"
              :y="(d: Data) => d.subscription"
              :bar-padding="0.1"
              :rounded-corners="0"
              color="var(--primary)"
            />
          </VisXYContainer>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style>
.cards-mix__card-stats {
  display: grid;
  gap: 1rem;
}

@media (width >= 640px) {
  .cards-mix__card-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

.cards-mix__card-stats__header {
  padding-bottom: 0.5rem;
}

.cards-mix__card-stats__title {
  font-size: 0.875rem;
  font-weight: 400;
}

.cards-mix__card-stats__value {
  font-size: 1.5rem;
  font-weight: 700;
}

.cards-mix__card-stats__change {
  color: var(--muted-foreground);
  font-size: 0.75rem;
}

.cards-mix__card-stats__chart {
  height: 5rem;
  margin-top: 1rem;
}
</style>
