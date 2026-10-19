// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest';
import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { CalendarDate, Time } from '@internationalized/date';
import type { SegmentPart } from 'reka-ui';
import * as cssDateField from '@ui/registry/css/ui/date-field';
import * as cssTimeField from '@ui/registry/css/ui/time-field';
import * as cssTimeRangeField from '@ui/registry/css/ui/time-range-field';
import * as tailwindDateField from '@ui/registry/tailwind/ui/date-field';
import * as tailwindTimeField from '@ui/registry/tailwind/ui/time-field';
import * as tailwindTimeRangeField from '@ui/registry/tailwind/ui/time-range-field';

const styles = [
  ['css', { ...cssDateField, ...cssTimeField, ...cssTimeRangeField }],
  ['tailwind', { ...tailwindDateField, ...tailwindTimeField, ...tailwindTimeRangeField }],
] as const;

afterEach(() => {
  document.body.innerHTML = '';
});

function segmentText(element: Element, slot: string) {
  return [...element.querySelectorAll(`[data-slot="${slot}"]`)].map(segment => segment.textContent?.trim()).join('');
}

describe.each(styles)('%s date and time fields', (_style, ui) => {
  const { DateField, TimeField, TimeRangeField, TimeRangeFieldInput } = ui;

  it('renders the date segments without a slot', () => {
    const wrapper = mount(DateField, { props: { modelValue: new CalendarDate(2026, 10, 18), locale: 'en-US' } });

    expect(wrapper.attributes('data-slot')).toBe('date-field');
    expect(segmentText(wrapper.element, 'date-field-input')).toBe('10/18/2026');
    expect(wrapper.find('[data-part="literal"]').text()).toBe('/');
  });

  it('marks a date outside min and max as invalid', () => {
    const wrapper = mount(DateField, {
      props: { modelValue: new CalendarDate(2025, 12, 31), minValue: new CalendarDate(2026, 1, 1), locale: 'en-US' },
    });

    expect(wrapper.attributes('data-invalid')).toBe('');
  });

  it('disables every segment', () => {
    const wrapper = mount(DateField, { props: { modelValue: new CalendarDate(2026, 10, 18), disabled: true, locale: 'en-US' } });

    expect(wrapper.attributes('data-disabled')).toBe('');
    expect(wrapper.findAll('[data-slot="date-field-input"]').every(segment => segment.attributes('contenteditable') === 'false')).toBe(true);
  });

  it('points a label at the field through its id', () => {
    const wrapper = mount(DateField, { props: { id: 'birthday', locale: 'en-US' } });

    expect(wrapper.find('input#birthday').exists()).toBe(true);
  });

  it('renders the time segments in the chosen hour cycle', () => {
    const twelve = mount(TimeField, { props: { modelValue: new Time(14, 30), locale: 'en-US' } });
    const twentyFour = mount(TimeField, { props: { modelValue: new Time(14, 30), hourCycle: 24, locale: 'en-US' } });

    expect(twelve.attributes('data-slot')).toBe('time-field');
    expect(segmentText(twelve.element, 'time-field-input')).toBe('2:30PM');
    expect(segmentText(twentyFour.element, 'time-field-input')).toBe('14:30');
  });

  it('steps the focused time segment with the arrow keys', async () => {
    const wrapper = mount(TimeField, { props: { modelValue: new Time(9, 0), hourCycle: 24, locale: 'en-US' }, attachTo: document.body });
    const hour = wrapper.get('[data-part="hour"]');

    await hour.trigger('keydown', { key: 'ArrowUp' });
    await nextTick();

    const emitted = wrapper.emitted('update:modelValue')?.at(-1)?.[0] as Time;
    expect(emitted.hour).toBe(10);
  });

  it('renders both times of a range with a separator', () => {
    const wrapper = mount(TimeRangeField, {
      props: { modelValue: { start: new Time(9), end: new Time(17) }, hourCycle: 24, locale: 'en-US' },
    });

    expect(segmentText(wrapper.element, 'time-range-field-input')).toBe('09:0017:00');
    expect(wrapper.get('[data-slot="time-range-field-separator"]').text()).toBe('–');
  });

  it('lets the slot replace the default range segments', () => {
    const wrapper = mount(TimeRangeField, {
      props: { modelValue: { start: new Time(9), end: new Time(17) }, hourCycle: 24, locale: 'en-US' },
      slots: {
        default: ({ segments }: { segments: { start: { part: SegmentPart; value: string }[] } }) => segments.start
          .map((item, index) => h(TimeRangeFieldInput, { key: index, part: item.part, type: 'start' }, () => item.value)),
      },
    });

    expect(segmentText(wrapper.element, 'time-range-field-input')).toBe('09:00');
    expect(wrapper.find('[data-slot="time-range-field-separator"]').exists()).toBe(false);
  });
});
