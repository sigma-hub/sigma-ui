import { describe, expect, it } from 'vitest';
import { CSS_LAYER_ORDER, CSS_STYLES_WITH_VARS_TEMPLATE, withCssLayerOrder } from '../src/templates/css-styles';
import { PREFLIGHT_CSS_TEMPLATE } from '../src/templates/preflight';

describe('CSS style cascade layers', () => {
  it('declares base before components', () => {
    expect(CSS_LAYER_ORDER).toBe('@layer base, components;');
  });

  it('puts the order first and imports the preflight into the base layer', () => {
    expect(withCssLayerOrder('@import "./preflight.css";\n\n@layer base {}')).toBe('@layer base, components;\n\n@import "./preflight.css" layer(base);\n\n@layer base {}');
    expect(withCssLayerOrder('@layer base {}')).toBe('@layer base, components;\n\n@layer base {}');
  });

  it('is idempotent', () => {
    const once = withCssLayerOrder('@import \'./preflight.css\';\n:root {}');

    expect(withCssLayerOrder(once)).toBe(once);
  });

  it('keeps the theme styles in the base layer and the preflight free of layers', () => {
    expect(CSS_STYLES_WITH_VARS_TEMPLATE.trimStart().startsWith('@layer base {')).toBe(true);
    expect(PREFLIGHT_CSS_TEMPLATE).not.toContain('@layer');
  });
});
