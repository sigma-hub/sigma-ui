import { isDeepStrictEqual } from 'node:util';
import type { ApiTableKind, ComponentApi, ComponentPartApi } from '../../.vitepress/theme/types/api';

const COMPARED_KINDS: ApiTableKind[] = ['props', 'events', 'slots', 'methods'];

function describeKindDifference(kind: ApiTableKind, reference: ComponentPartApi, candidate: ComponentPartApi) {
  const referenceItems = new Map(reference[kind].map(item => [item.name, item]));
  const candidateItems = new Map(candidate[kind].map(item => [item.name, item]));
  const itemNames = new Set([...referenceItems.keys(), ...candidateItems.keys()]);

  return [...itemNames]
    .filter(itemName => !isDeepStrictEqual(referenceItems.get(itemName), candidateItems.get(itemName)))
    .map((itemName) => {
      if (!candidateItems.has(itemName)) {
        return `${kind}.${itemName} is missing`;
      }

      if (!referenceItems.has(itemName)) {
        return `${kind}.${itemName} is extra`;
      }

      return `${kind}.${itemName} differs: ${JSON.stringify(referenceItems.get(itemName))} vs ${JSON.stringify(candidateItems.get(itemName))}`;
    });
}

export function findApiDifferences(reference: ComponentApi, candidate: ComponentApi | undefined) {
  if (!candidate) {
    return [`${reference.component}: component is missing`];
  }

  const candidateParts = new Map(candidate.parts.map(part => [part.name, part]));
  const differences: string[] = [];

  for (const part of reference.parts) {
    const candidatePart = candidateParts.get(part.name);

    if (!candidatePart) {
      differences.push(`${reference.component}/${part.name}: part is missing`);
      continue;
    }

    for (const kind of COMPARED_KINDS) {
      for (const difference of describeKindDifference(kind, part, candidatePart)) {
        differences.push(`${reference.component}/${part.name}: ${difference}`);
      }
    }

    candidateParts.delete(part.name);
  }

  for (const extraPartName of candidateParts.keys()) {
    differences.push(`${reference.component}/${extraPartName}: part is extra`);
  }

  return differences;
}
