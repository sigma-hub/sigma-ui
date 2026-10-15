import { CONFIG_SCHEMA_URL, frameworkSchema, rawConfigSchema, type Framework, type RawConfig } from '@sigma-ui/shared/schemas';

export interface ConfigMigration {
  config: RawConfig;
  changes: string[];
}

type LegacyConfig = Record<string, unknown> & {
  tailwind?: Record<string, unknown>;
  aliases?: Record<string, unknown>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeFramework(value: unknown, detectedFramework: Framework, changes: string[]): Framework {
  const parsed = frameworkSchema.safeParse(typeof value === 'string' ? value.toLowerCase() : value);

  if (parsed.success) {
    if (parsed.data !== value) {
      changes.push(`framework: "${String(value)}" -> "${parsed.data}"`);
    }

    return parsed.data;
  }

  changes.push(`framework: ${value === undefined ? 'missing' : `"${String(value)}"`} -> "${detectedFramework}" (detected)`);
  return detectedFramework;
}

function moveValue(
  target: Record<string, unknown>,
  targetKey: string,
  value: unknown,
  label: string,
  changes: string[],
) {
  if (value === undefined || target[targetKey] !== undefined) {
    return;
  }

  target[targetKey] = value;
  changes.push(`${label} -> ${targetKey}`);
}

export function migrateConfig(input: unknown, detectedFramework: Framework): ConfigMigration {
  if (!isRecord(input)) {
    throw new Error('The config file does not contain a JSON object.');
  }

  const legacy = input as LegacyConfig;
  const changes: string[] = [];
  const legacyTailwind = isRecord(legacy.tailwind) ? legacy.tailwind : {};
  const legacyAliases = isRecord(legacy.aliases) ? legacy.aliases : {};
  const { style, tailwind: _tailwind, aliases: _aliases, ...rest } = legacy;
  const next: Record<string, unknown> = { ...rest };

  if (next.$schema !== CONFIG_SCHEMA_URL) {
    next.$schema = CONFIG_SCHEMA_URL;
    changes.push(`$schema -> ${CONFIG_SCHEMA_URL}`);
  }

  moveValue(next, 'styleSystem', style, 'style', changes);
  moveValue(next, 'cssPath', legacyTailwind.css, 'tailwind.css', changes);
  moveValue(next, 'baseColor', legacyTailwind.baseColor, 'tailwind.baseColor', changes);
  next.framework = normalizeFramework(next.framework, detectedFramework, changes);

  next.tailwind = Object.fromEntries(Object.entries({
    config: legacyTailwind.config,
    prefix: legacyTailwind.prefix,
  }).filter(([, value]) => typeof value === 'string' && value !== ''));

  const { ui: legacyUiAlias, ...aliases } = legacyAliases;

  if (legacyUiAlias !== undefined) {
    changes.push('aliases.ui removed (components are installed into aliases.components)');
  }

  next.aliases = aliases;

  if (next.componentNaming === undefined) {
    next.componentNaming = 'pascal-case';
    changes.push('componentNaming -> "pascal-case" (the 1.x default)');
  }

  const result = rawConfigSchema.safeParse(next);

  if (!result.success) {
    const issues = result.error.issues.map(issue => `${issue.path.join('.') || 'config'}: ${issue.message}`).join('; ');
    throw new Error(`The config could not be migrated automatically: ${issues}`);
  }

  return { config: result.data, changes };
}
