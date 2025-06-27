<template>
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
</template>

<style>
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

.example-sigma-ui-typography__table tbody tr:nth-child(even) {
  background-color: hsl(var(--muted));
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
</style>
