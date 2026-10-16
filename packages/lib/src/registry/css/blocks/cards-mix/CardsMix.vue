<script setup lang="ts">
import type { DateRange } from 'reka-ui';
import { ref } from 'vue';
import { getLocalTimeZone, today } from '@internationalized/date';
import { Card } from '@ui/registry/css/ui/card';
import { RangeCalendar } from '@ui/registry/css/ui/range-calendar';
import ActivityGoal from './components/ActivityGoal.vue';
import CardChat from './components/CardChat.vue';
import CardStats from './components/CardStats.vue';
import CookieSettings from './components/CookieSettings.vue';
import CreateAccount from './components/CreateAccount.vue';
import DataTable from './components/DataTable.vue';
import DatePicker from './components/DatePicker.vue';
import GitHubCard from './components/GitHubCard.vue';
import Metric from './components/Metric.vue';
import Notifications from './components/Notifications.vue';
import PaymentMethod from './components/PaymentMethod.vue';
import ReportAnIssue from './components/ReportAnIssue.vue';
import ShareDocument from './components/ShareDocument.vue';
import TeamMembers from './components/TeamMembers.vue';

const now = today(getLocalTimeZone());

const range = ref<DateRange>({
  start: now,
  end: now.add({ days: 8 }),
});
</script>

<template>
  <div class="cards-mix">
    <div class="cards-mix__primary">
      <CardStats />
      <div class="cards-mix__primary-grid">
        <div class="cards-mix__stack">
          <TeamMembers />
          <CookieSettings />
          <PaymentMethod />
          <DatePicker />
          <Notifications />
        </div>
        <div class="cards-mix__stack">
          <CardChat />
          <CreateAccount />
          <ReportAnIssue />
          <GitHubCard />
        </div>
      </div>
    </div>
    <div class="cards-mix__secondary">
      <div class="cards-mix__secondary-grid">
        <Card class="cards-mix__calendar">
          <RangeCalendar v-model="range" />
        </Card>
        <div class="cards-mix__goal">
          <ActivityGoal />
        </div>
        <div class="cards-mix__span">
          <Metric />
        </div>
        <div class="cards-mix__span">
          <DataTable />
        </div>
        <div class="cards-mix__span">
          <ShareDocument />
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.cards-mix {
  display: grid;
  align-items: start;
  justify-content: center;
  gap: 1.5rem;
}

.cards-mix__primary,
.cards-mix__stack,
.cards-mix__secondary {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cards-mix__primary-grid {
  display: grid;
  gap: 1rem;
}

.cards-mix__secondary-grid {
  display: none;
}

.cards-mix__calendar {
  max-width: 280px;
}

.cards-mix__span {
  padding-top: 0.75rem;
}

.cards-mix__empty-cell {
  height: 6rem;
  text-align: center;
}

.cards-mix__table-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-block: 1rem;
}

.cards-mix__table-count {
  flex: 1;
  color: var(--muted-foreground);
  font-size: 0.875rem;
}

.cards-mix__table-pager {
  display: flex;
  gap: 0.5rem;
}

@media (width >= 768px) {
  .cards-mix {
    gap: 1rem;
  }

  .cards-mix__primary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cards-mix__secondary-grid {
    display: grid;
    gap: 0.25rem;
    grid-template-columns: 280px 1fr;
  }

  .cards-mix__goal {
    padding-top: 0;
    padding-left: 0.5rem;
  }
}

@media (width >= 1024px) {
  .cards-mix {
    grid-template-columns: repeat(10, minmax(0, 1fr));
  }

  .cards-mix__primary {
    grid-column: span 4;
  }

  .cards-mix__primary-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .cards-mix__secondary {
    grid-column: span 6;
  }
}

@media (width >= 1280px) {
  .cards-mix {
    gap: 1rem;
    grid-template-columns: repeat(11, minmax(0, 1fr));
  }

  .cards-mix__primary {
    grid-column: span 6;
  }

  .cards-mix__primary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cards-mix__secondary {
    grid-column: span 5;
  }

  .cards-mix__goal {
    padding-left: 0.75rem;
  }

  .cards-mix__span {
    grid-column: span 2;
  }
}

.cards-mix__pay-radio[data-state="checked"] + .cards-mix__pay-label {
  border-color: var(--primary);
}

.cards-mix__pay-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 2px solid var(--muted);
  border-radius: var(--radius);
  background: var(--popover);
}

.cards-mix__pay-label:hover {
  background: var(--secondary);
  color: var(--secondary-foreground);
}

.cards-mix__check-pad:has([role="checkbox"]) {
  padding-left: 0.75rem;
}

.cards-mix__date-slot > button {
  width: 260px;
}

.cards-mix__gen-1 {
  width: 100%;
}

.cards-mix__gen-2 {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.cards-mix__gen-3 {
  max-width: 24rem;
}

.cards-mix__gen-4 {
  margin-left: auto;
}

.cards-mix__gen-5 {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
}

.cards-mix__gen-6 {
  text-transform: capitalize;
}

.cards-mix__gen-7 {
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.cards-mix__gen-8 {
  display: flex;
}

.cards-mix__gen-8 > * + * {
  margin-left: 0.5rem;
}

.cards-mix__gen-9 {
  flex-shrink: 0;
}

.cards-mix__gen-10 {
  margin-block: 1rem;
}

.cards-mix__gen-11 > * + * {
  margin-top: 1rem;
}

.cards-mix__gen-12 {
  font-size: 0.875rem;
  font-weight: 500;
}

.cards-mix__gen-13 {
  display: grid;
  gap: 1.5rem;
}

.cards-mix__gen-14 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cards-mix__gen-14 > * + * {
  margin-left: 1rem;
}

.cards-mix__gen-15 {
  display: flex;
  align-items: center;
}

.cards-mix__gen-15 > * + * {
  margin-left: 1rem;
}

.cards-mix__gen-16 {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.cards-mix__gen-17 {
  color: var(--muted-foreground);
  font-size: 0.875rem;
}

.cards-mix__gen-18 {
  width: 110px;
  margin-left: auto;
}

.cards-mix__gen-19 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cards-mix__gen-19 > * + * {
  margin-left: 0.5rem;
}

.cards-mix__gen-20 {
  display: flex;
  flex-direction: column;
}

.cards-mix__gen-20 > * + * {
  margin-top: 0.25rem;
}

.cards-mix__gen-21 {
  color: var(--muted-foreground);
  font-weight: 400;
  line-height: 1.375;
}

.cards-mix__gen-22 {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.cards-mix__gen-23 {
  display: grid;
  gap: 0.5rem;
}

.cards-mix__gen-24 {
  justify-content: space-between;
}

.cards-mix__gen-24 > * + * {
  margin-left: 0.5rem;
}

.cards-mix__gen-25 {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.cards-mix__gen-26 {
  width: 1.5rem;
  height: 1.5rem;
  margin-bottom: 0.75rem;
}

.cards-mix__gen-27 {
  padding-top: 1.5rem;
}

.cards-mix__gen-28 > * + * {
  margin-top: 0.5rem;
}

.cards-mix__gen-29 {
  padding-bottom: 1rem;
}

.cards-mix__gen-30 {
  font-size: 1rem;
}

.cards-mix__gen-31 {
  padding-bottom: 0.5rem;
}

.cards-mix__gen-32 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cards-mix__gen-32 > * + * {
  margin-left: 0.5rem;
}

.cards-mix__gen-33 {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: 9999px;
}

.cards-mix__gen-34 {
  width: 1rem;
  height: 1rem;
}

.cards-mix__gen-35 {
  flex: 1;
  text-align: center;
}

.cards-mix__gen-36 {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.05em;
}

.cards-mix__gen-37 {
  color: var(--muted-foreground);
  font-size: 0.7rem;
  text-transform: uppercase;
}

.cards-mix__gen-38 {
  height: 60px;
  margin-block: 0.75rem;
}

.cards-mix__gen-39 {
  display: grid;
  align-items: flex-start;
  gap: 1rem;
  grid-template-columns: minmax(0, 1fr) 110px;
}

.cards-mix__gen-39 > * + * {
  margin-top: 0;
}

.cards-mix__gen-40 > * + * {
  margin-top: 0.25rem;
}

.cards-mix__gen-41 {
  display: flex;
  align-items: center;
  border-radius: var(--radius);
  background: var(--secondary);
  color: var(--secondary-foreground);
}

.cards-mix__gen-41 > * + * {
  margin-left: 0.25rem;
}

.cards-mix__gen-42 {
  box-shadow: none;
  padding-inline: 0.75rem;
}

.cards-mix__gen-43 {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.cards-mix__gen-44 {
  height: 1.25rem;
}

.cards-mix__gen-45 {
  box-shadow: none;
  padding-inline: 0.5rem;
}

.cards-mix__gen-46 {
  width: 1rem;
  height: 1rem;
  color: var(--secondary-foreground);
}

.cards-mix__gen-47 {
  width: 200px;
}

.cards-mix__gen-48 {
  display: flex;
  color: var(--muted-foreground);
  font-size: 0.875rem;
}

.cards-mix__gen-48 > * + * {
  margin-left: 1rem;
}

.cards-mix__gen-49 {
  display: flex;
  align-items: center;
}

.cards-mix__gen-50 {
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.25rem;
  color: #38bdf8;
  fill: #38bdf8;
}

.cards-mix__gen-51 {
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.25rem;
}

.cards-mix__gen-52 {
  font-size: 1.5rem;
}

.cards-mix__gen-53 {
  display: grid;
  gap: 1rem;
}

.cards-mix__gen-54 {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.cards-mix__gen-55 {
  position: relative;
}

.cards-mix__gen-56 {
  position: absolute;
  display: flex;
  align-items: center;
  inset: 0;
}

.cards-mix__gen-57 {
  width: 100%;
  border-top: 1px solid var(--border);
}

.cards-mix__gen-58 {
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.cards-mix__gen-59 {
  background: var(--background);
  color: var(--muted-foreground);
  padding-inline: 0.5rem;
}

.cards-mix__gen-60 {
  padding-bottom: 0.75rem;
}

.cards-mix__gen-61 {
  display: grid;
  gap: 0.25rem;
}

.cards-mix__gen-62 {
  display: flex;
  padding: 0.5rem;
  border-radius: var(--radius);
  margin-inline: -0.5rem;
  transition: all 0.15s ease;
}

.cards-mix__gen-62 > * + * {
  margin-left: 1rem;
}

.cards-mix__gen-62:hover {
  background: var(--secondary);
  color: var(--secondary-foreground);
}

.cards-mix__gen-63 {
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 1px;
}

.cards-mix__gen-64 {
  display: flex;
  padding: 0.5rem;
  border-radius: var(--radius);
  background: var(--secondary);
  color: var(--secondary-foreground);
  margin-inline: -0.5rem;
  transition: all 0.15s ease;
}

.cards-mix__gen-64 > * + * {
  margin-left: 1rem;
}

.cards-mix__gen-65 {
  height: 200px;
}

.cards-mix__gen-66 {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  color: var(--muted-foreground);
}

.cards-mix__gen-67 {
  padding: 0;
}

.cards-mix__gen-68 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-block: 0.5rem;
  padding-inline: 1rem;
}

.cards-mix__gen-68 > * + * {
  margin-top: 0.25rem;
}
</style>
