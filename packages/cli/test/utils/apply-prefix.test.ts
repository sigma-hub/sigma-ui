import { describe, expect, it } from 'vitest';

import { applyPrefix } from '../../src/utils/transformers/transform-tw-prefix';

describe('apply tailwind prefix', () => {
  it.each([
    {
      input: 'bg-zinc-800 text-gray-500',
      output: 'tw-bg-zinc-800 tw-text-gray-500',
    },
    {
      input: 'hover:dark:bg-background dark:text-foreground',
      output: 'hover:dark:tw-bg-background dark:tw-text-foreground',
    },
    {
      input:
        'rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50',
      output:
        'tw-rounded-lg tw-border tw-border-zinc-200 tw-bg-white tw-text-zinc-950 tw-shadow-sm dark:tw-border-zinc-800 dark:tw-bg-zinc-950 dark:tw-text-zinc-50',
    },
    {
      input:
        'text-red-500 border-red-500/50 dark:border-red-500 [&>svg]:text-red-500 text-red-500 dark:text-red-900 dark:border-red-900/50 dark:dark:border-red-900 dark:[&>svg]:text-red-900 dark:text-red-900',
      output:
        'tw-text-red-500 tw-border-red-500/50 dark:tw-border-red-500 [&>svg]:tw-text-red-500 tw-text-red-500 dark:tw-text-red-900 dark:tw-border-red-900/50 dark:dark:tw-border-red-900 dark:[&>svg]:tw-text-red-900 dark:tw-text-red-900',
    },
    {
      input:
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
      output:
        'tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted',
    },
    {
      input:
        'absolute right-4 top-4 bg-primary rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary',
      output:
        'tw-absolute tw-right-4 tw-top-4 tw-bg-primary tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-hidden focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-secondary',
    },
  ])(`applyTwPrefix($input) -> $output`, ({ input, output }) => {
    expect(applyPrefix(input, 'tw-')).toBe(output);
  });
});
