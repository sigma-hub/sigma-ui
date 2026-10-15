export { default as FixtureButton } from './FixtureButton.vue';
export { default as FixtureButtonGroup } from './FixtureButtonGroup.vue';

export const fixtureButtonVariants = {
  base: 'fixture-button',
};

export type FixtureButtonVariants = keyof typeof fixtureButtonVariants;

export interface FixtureButtonProps {
  variant?: FixtureButtonVariants;
}
