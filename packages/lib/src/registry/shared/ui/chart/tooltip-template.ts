import type { BulletLegendItemInterface } from '@unovis/ts';
import { omit } from '@unovis/ts';
import { type Component, createApp } from 'vue';

export interface ChartSingleTooltipState {
  index: string;
  items?: BulletLegendItemInterface[];
  valueFormatter?: (tick: number, index?: number, ticks?: number[]) => string;
  customTooltip?: Component;
}

export interface ChartCrosshairState {
  colors: string[];
  index: string;
  items: BulletLegendItemInterface[];
  customTooltip?: Component;
}

export function createChartSingleTooltipTemplate(state: ChartSingleTooltipState, chartTooltip: Component) {
  const rendered = new WeakMap<object, string>();

  return function template(datum: any, elementIndex: number, elements: Array<HTMLElement | SVGElement>) {
    if (typeof document === 'undefined') {
      return '';
    }

    if (state.index in datum) {
      if (rendered.has(datum)) {
        return rendered.get(datum);
      }

      const formatValue = state.valueFormatter ?? ((tick: number) => `${tick}`);
      const rows = Object.entries(omit(datum, [state.index])).map(([key, value]) => {
        const legendReference = state.items?.find(item => item.name === key);

        return { ...legendReference, value: formatValue(value) };
      });
      const tooltipComponent = state.customTooltip ?? chartTooltip;
      const host = document.createElement('div');

      createApp(tooltipComponent, { title: datum[state.index], data: rows }).mount(host);
      rendered.set(datum, host.innerHTML);

      return host.innerHTML;
    }

    const point = datum.data;

    if (rendered.has(point)) {
      return rendered.get(point);
    }

    const formatValue = state.valueFormatter ?? ((tick: number) => `${tick}`);
    const style = getComputedStyle(elements[elementIndex]);
    const rows = [{
      name: point.name,
      value: formatValue(point[state.index]),
      color: style.fill,
    }];
    const tooltipComponent = state.customTooltip ?? chartTooltip;
    const host = document.createElement('div');

    createApp(tooltipComponent, { title: datum[state.index], data: rows }).mount(host);
    rendered.set(datum, host.innerHTML);

    return host.innerHTML;
  };
}

export function createChartCrosshairBindings(state: ChartCrosshairState, chartTooltip: Component) {
  const rendered = new WeakMap<object, string>();

  function template(datum: any) {
    if (typeof document === 'undefined') {
      return '';
    }

    if (rendered.has(datum)) {
      return rendered.get(datum);
    }

    const rows = Object.entries(omit(datum, [state.index])).map(([key, value]) => {
      const legendReference = state.items.find(item => item.name === key);

      return { ...legendReference, value };
    });
    const tooltipComponent = state.customTooltip ?? chartTooltip;
    const host = document.createElement('div');

    createApp(tooltipComponent, { title: datum[state.index].toString(), data: rows }).mount(host);
    rendered.set(datum, host.innerHTML);

    return host.innerHTML;
  }

  function color(_datum: unknown, seriesIndex: number) {
    return state.colors[seriesIndex] ?? 'transparent';
  }

  return { template, color };
}
