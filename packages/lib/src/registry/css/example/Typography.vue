<template>
  <div class="example-sigma-ui-typography">
    <h1 class="example-sigma-ui-typography__heading-1">
      The Joke Tax Chronicles
    </h1>
    <p class="example-sigma-ui-typography__paragraph">
      Once upon a time, in a far-off land, there was a very lazy king who
      spent all day lounging on his throne. One day, his advisors came to him
      with a problem: the kingdom was running out of money.
    </p>
    <h2 class="example-sigma-ui-typography__heading-2">
      The King's Plan
    </h2>
    <p class="example-sigma-ui-typography__paragraph">
      The king thought long and hard, and finally came up with
      <a
        href="#"
        class="example-sigma-ui-typography__link"
      >
        a brilliant plan
      </a>
      : he would tax the jokes in the kingdom.
    </p>
    <blockquote class="example-sigma-ui-typography__blockquote">
      "After all," he said, "everyone enjoys a good joke, so it's only fair
      that they should pay for the privilege."
    </blockquote>
    <h3 class="example-sigma-ui-typography__heading-3">
      The Joke Tax
    </h3>
    <p class="example-sigma-ui-typography__paragraph">
      The king's subjects were not amused. They grumbled and complained, but
      the king was firm:
    </p>
    <ul class="example-sigma-ui-typography__list">
      <li class="example-sigma-ui-typography__list-item">
        1st level of puns: 5 gold coins
      </li>
      <li class="example-sigma-ui-typography__list-item">
        2nd level of jokes: 10 gold coins
      </li>
      <li class="example-sigma-ui-typography__list-item">
        3rd level of one-liners : 20 gold coins
      </li>
    </ul>
    <p class="example-sigma-ui-typography__paragraph">
      As a result, people stopped telling jokes, and the kingdom fell into a
      gloom. But there was one person who refused to let the king's
      foolishness get him down: a court jester named Jokester.
    </p>
    <h3 class="example-sigma-ui-typography__heading-3">
      Jokester's Revolt
    </h3>
    <p class="example-sigma-ui-typography__paragraph">
      Jokester began sneaking into the castle in the middle of the night and
      leaving jokes all over the place: under the king's pillow, in his soup,
      even in the royal toilet. The king was furious, but he couldn't seem to
      stop Jokester.
    </p>
    <p class="example-sigma-ui-typography__paragraph">
      And then, one day, the people of the kingdom discovered that the jokes
      left by Jokester were so funny that they couldn't help but laugh. And
      once they started laughing, they couldn't stop.
    </p>
    <h3 class="example-sigma-ui-typography__heading-3">
      The People's Rebellion
    </h3>
    <p class="example-sigma-ui-typography__paragraph">
      The people of the kingdom, feeling uplifted by the laughter, started to
      tell jokes and puns again, and soon the entire kingdom was in on the
      joke.
    </p>
    <div class="example-sigma-ui-typography__table-container">
      <table class="example-sigma-ui-typography__table">
        <thead>
          <tr class="example-sigma-ui-typography__table-row">
            <th class="example-sigma-ui-typography__table-header">
              King's Treasury
            </th>
            <th class="example-sigma-ui-typography__table-header">
              People's happiness
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="example-sigma-ui-typography__table-row">
            <td class="example-sigma-ui-typography__table-cell">
              Empty
            </td>
            <td class="example-sigma-ui-typography__table-cell">
              Overflowing
            </td>
          </tr>
          <tr class="example-sigma-ui-typography__table-row">
            <td class="example-sigma-ui-typography__table-cell">
              Modest
            </td>
            <td class="example-sigma-ui-typography__table-cell">
              Satisfied
            </td>
          </tr>
          <tr class="example-sigma-ui-typography__table-row">
            <td class="example-sigma-ui-typography__table-cell">
              Full
            </td>
            <td class="example-sigma-ui-typography__table-cell">
              Ecstatic
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="example-sigma-ui-typography__paragraph">
      The king, seeing how much happier his subjects were, realized the error
      of his ways and repealed the joke tax. Jokester was declared a hero, and
      the kingdom lived happily ever after.
    </p>
    <p class="example-sigma-ui-typography__paragraph">
      The moral of the story is: never underestimate the power of a good laugh
      and always be careful of bad ideas.
    </p>
  </div>
</template>

<style>
.example-sigma-ui-typography__heading-1 {
  scroll-margin-top: 5rem;
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

@media (min-width: 1024px) {
  .example-sigma-ui-typography__heading-1 {
    font-size: 3rem;
  }
}

.example-sigma-ui-typography__heading-2 {
  margin-top: 2.5rem;
  scroll-margin-top: 5rem;
  border-bottom: 1px solid hsl(var(--border));
  padding-bottom: 0.5rem;
  font-size: 1.875rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  transition-property: color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.example-sigma-ui-typography__heading-2:first-child {
  margin-top: 0;
}

.example-sigma-ui-typography__heading-3 {
  margin-top: 2rem;
  scroll-margin-top: 5rem;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.example-sigma-ui-typography__paragraph {
  line-height: 1.75;
}

.example-sigma-ui-typography__paragraph:not(:first-child) {
  margin-top: 1.5rem;
}

.example-sigma-ui-typography__link {
  font-weight: 500;
  color: hsl(var(--primary));
  text-decoration-line: underline;
  text-underline-offset: 4px;
}

.example-sigma-ui-typography__blockquote {
  margin-top: 1.5rem;
  border-left: 2px solid hsl(var(--border));
  padding-left: 1.5rem;
  font-style: italic;
}

.example-sigma-ui-typography__list {
  margin: 1.5rem 0 1.5rem 1.5rem;
  list-style-type: disc;
}

.example-sigma-ui-typography__list-item {
  margin-top: 0.5rem;
}

.example-sigma-ui-typography__table-container {
  margin: 1.5rem 0;
  width: 100%;
  overflow-y: auto;
}

.example-sigma-ui-typography__table {
  width: 100%;
}

.example-sigma-ui-typography__table-row {
  margin: 0;
  border-top: 1px solid hsl(var(--border));
  padding: 0;
}

.example-sigma-ui-typography__table-header,
.example-sigma-ui-typography__table-cell {
  border: 1px solid hsl(var(--border));
  padding: 0.5rem 1rem;
  text-align: left;
}

.example-sigma-ui-typography__table-header {
  font-weight: 700;
}

.example-sigma-ui-typography__table-header[align="center"],
.example-sigma-ui-typography__table-cell[align="center"] {
  text-align: center;
}

.example-sigma-ui-typography__table-header[align="right"],
.example-sigma-ui-typography__table-cell[align="right"] {
  text-align: right;
}

.example-sigma-ui-typography__table tbody tr:nth-child(even) {
  background-color: hsl(var(--muted));
}
</style>
