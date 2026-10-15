import type { Config } from '@/src/schemas';
import { getDerivedAliases } from '@/src/utils/get-config';
import { transformLocalVueImports } from './transform-component-naming';

const MODULE_SPECIFIER_PATTERN = /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(['"])([^'"\n]+)\2/g;

interface AliasRule {
  pattern: RegExp;
  target: string;
  keepRest: boolean;
}

function createAliasRules(config: Pick<Config, 'aliases'>): AliasRule[] {
  const derivedAliases = getDerivedAliases(config);
  const rules: AliasRule[] = [
    { pattern: /^(?:@\/components\/ui|@ui\/registry\/[^/]+\/ui|@\/registry\/[^/]+\/ui)(\/.*)?$/, target: config.aliases.components, keepRest: true },
    { pattern: /^(?:@\/components\/blocks|@ui\/registry\/[^/]+\/blocks)(\/.*)?$/, target: derivedAliases.blocks, keepRest: true },
    { pattern: /^(?:@\/composables|@\/registry\/[^/]+\/composables)(\/.*)?$/, target: derivedAliases.composables, keepRest: true },
  ];

  if (config.aliases.utils) {
    rules.push({ pattern: /^(?:@\/lib\/utils|@ui\/utils|@\/registry\/[^/]+\/lib\/utils)$/, target: config.aliases.utils, keepRest: false });
  }

  rules.push({ pattern: /^(?:@\/lib|@\/registry\/[^/]+\/lib)(\/.*)$/, target: derivedAliases.lib, keepRest: true });

  return rules;
}

export function transformImports(content: string, config: Pick<Config, 'aliases'>) {
  const rules = createAliasRules(config);

  return content.replace(MODULE_SPECIFIER_PATTERN, (match, prefix: string, quote: string, specifier: string) => {
    for (const rule of rules) {
      const ruleMatch = specifier.match(rule.pattern);

      if (ruleMatch) {
        const rest = rule.keepRest ? ruleMatch[1] ?? '' : '';
        return `${prefix}${quote}${rule.target}${rest}${quote}`;
      }
    }

    return match;
  });
}

export function transformFileContent(content: string, config: Pick<Config, 'aliases' | 'componentNaming'>) {
  return transformLocalVueImports(transformImports(content, config), config.componentNaming);
}
