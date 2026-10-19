<script setup lang="ts">
import { Typography } from '@ui/registry/css/ui/typography';
</script>

<template>
  <div class="example-typography">
    <Typography variant="h1">
      The Joke Tax Chronicles
    </Typography>
    <Typography variant="p">
      Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne.
    </Typography>
    <Typography variant="h2">
      The King's Plan
    </Typography>
    <Typography variant="p">
      The king thought long and hard, and finally came up with
      <Typography
        variant="link"
        href="#"
      >
        a brilliant plan
      </Typography>: he would tax the jokes in the kingdom.
    </Typography>
    <Typography variant="blockquote">
      "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
    </Typography>
    <Typography variant="h3">
      The Joke Tax
    </Typography>
    <Typography variant="list">
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners: 20 gold coins</li>
    </Typography>
    <Typography variant="p">
      People stopped telling jokes. The court jester left notes written in
      <Typography variant="code">
        gold
      </Typography>
      ink.
    </Typography>
    <Typography variant="lead">
      Laughter returned to the kingdom.
    </Typography>
    <Typography variant="large">
      The treasury
    </Typography>
    <div class="example-typography__table">
      <Typography variant="table">
        <thead>
          <tr>
            <th>King's Treasury</th>
            <th>People's happiness</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Empty</td>
            <td>Overflowing</td>
          </tr>
          <tr>
            <td>Full</td>
            <td>Ecstatic</td>
          </tr>
        </tbody>
      </Typography>
    </div>
    <Typography variant="small">
      Repealed by royal decree.
    </Typography>
    <Typography variant="muted">
      The moral: never underestimate a good laugh.
    </Typography>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .example-typography {
    max-width: 65ch;
  }

  .example-typography__table {
    width: 100%;
    margin: calc(var(--spacing) * 6) 0;
    overflow-y: auto;
  }
}
</style>
