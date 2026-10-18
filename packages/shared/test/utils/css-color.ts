// A small evaluator for the CSS color syntax the CodeBlock palette uses:
// oklch(), var(), color-mix(in oklch, …), and transparent.

export interface Oklch {
  l: number;
  c: number;
  h: number | null;
  alpha: number;
}

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export type Variables = Record<string, string>;

function splitArguments(value: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';

  for (const character of value) {
    if (character === '(') {
      depth++;
    } else if (character === ')') {
      depth--;
    }

    if (character === ',' && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += character;
    }
  }

  parts.push(current.trim());
  return parts;
}

function unwrap(value: string, name: string): string | null {
  const trimmed = value.trim();
  return trimmed.startsWith(`${name}(`) && trimmed.endsWith(')') ? trimmed.slice(name.length + 1, -1) : null;
}

export function evaluateColor(value: string, variables: Variables, depth = 0): Oklch {
  if (depth > 32) {
    throw new Error(`Variable cycle while evaluating "${value}"`);
  }

  const trimmed = value.trim();

  if (trimmed === 'transparent') {
    return { l: 0, c: 0, h: null, alpha: 0 };
  }

  const variable = unwrap(trimmed, 'var');

  if (variable !== null) {
    const [name, fallback] = splitArguments(variable);
    const resolved = variables[name] ?? fallback;

    if (resolved === undefined) {
      throw new Error(`Unknown variable ${name}`);
    }

    return evaluateColor(resolved, variables, depth + 1);
  }

  const oklch = unwrap(trimmed, 'oklch');

  if (oklch !== null) {
    const [channels, alpha] = oklch.split('/').map(part => part.trim());
    const [lightness, chroma, hue] = channels.split(/\s+/);
    const l = lightness.endsWith('%') ? Number(lightness.slice(0, -1)) / 100 : Number(lightness);
    const c = Number(chroma);
    const h = Number(hue.replace(/deg$/, ''));
    return { l, c, h: c === 0 ? null : h, alpha: alpha === undefined ? 1 : Number(alpha.replace('%', '')) / (alpha.endsWith('%') ? 100 : 1) };
  }

  const mix = unwrap(trimmed, 'color-mix');

  if (mix !== null) {
    const [space, first, second] = splitArguments(mix);

    if (space !== 'in oklch') {
      throw new Error(`Unsupported color space "${space}"`);
    }

    const parse = (part: string) => {
      const match = part.match(/^(.*?)(?:\s+(\d+(?:\.\d+)?)%)?$/);
      return { color: evaluateColor(match![1], variables, depth + 1), weight: match![2] === undefined ? undefined : Number(match![2]) / 100 };
    };

    const a = parse(first);
    const b = parse(second);
    const weightA = a.weight ?? (b.weight === undefined ? 0.5 : 1 - b.weight);
    const weightB = b.weight ?? 1 - weightA;
    return mixOklch(a.color, b.color, weightA / (weightA + weightB));
  }

  throw new Error(`Unsupported color "${value}"`);
}

function mixOklch(a: Oklch, b: Oklch, weightA: number): Oklch {
  const weightB = 1 - weightA;
  const alpha = a.alpha * weightA + b.alpha * weightB;

  if (alpha === 0) {
    return { l: 0, c: 0, h: null, alpha: 0 };
  }

  // Premultiplied interpolation, as CSS Color 5 specifies for color-mix().
  const l = (a.l * a.alpha * weightA + b.l * b.alpha * weightB) / alpha;
  const c = (a.c * a.alpha * weightA + b.c * b.alpha * weightB) / alpha;
  let h: number | null;

  if (a.h === null) {
    h = b.h;
  } else if (b.h === null) {
    h = a.h;
  } else {
    let delta = b.h - a.h;

    if (delta > 180) {
      delta -= 360;
    } else if (delta < -180) {
      delta += 360;
    }

    h = (a.h + delta * weightB + 360) % 360;
  }

  return { l, c, h, alpha };
}

function toLinearSrgb({ l, c, h }: Oklch) {
  const hue = ((h ?? 0) * Math.PI) / 180;
  const a = c * Math.cos(hue);
  const b = c * Math.sin(hue);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;

  return {
    r: 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    g: -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    b: -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  };
}

function encode(channel: number) {
  const clamped = Math.min(1, Math.max(0, channel));
  return clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * clamped ** (1 / 2.4) - 0.055;
}

export function toSrgb(color: Oklch): Rgb {
  const linear = toLinearSrgb(color);
  return { r: encode(linear.r), g: encode(linear.g), b: encode(linear.b) };
}

/** Paints a possibly translucent color over an opaque backdrop, in sRGB like browsers do. */
export function composite(color: Oklch, backdrop: Rgb): Rgb {
  const top = toSrgb(color);
  return {
    r: top.r * color.alpha + backdrop.r * (1 - color.alpha),
    g: top.g * color.alpha + backdrop.g * (1 - color.alpha),
    b: top.b * color.alpha + backdrop.b * (1 - color.alpha),
  };
}

function luminance({ r, g, b }: Rgb) {
  const linear = (channel: number) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

export function contrastRatio(first: Rgb, second: Rgb) {
  const [lighter, darker] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Reads `--name: value;` declarations from the first rule whose selector matches exactly. */
export function readDeclarations(css: string, selector: string): Variables {
  const start = css.indexOf(`${selector} {`);

  if (start === -1) {
    throw new Error(`Missing rule "${selector}"`);
  }

  const body = css.slice(css.indexOf('{', start) + 1, css.indexOf('}', start));
  return Object.fromEntries([...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(match => [match[1], match[2].trim()]));
}
