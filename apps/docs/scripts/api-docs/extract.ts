import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { type ComponentMeta, type PropertyMeta, createChecker } from 'vue-component-meta';
import type { ApiEvent, ApiMethod, ApiProp, ApiSlot, ComponentApi, ComponentPartApi } from '../../.vitepress/theme/types/api';

const EXPORTED_SFC_PATTERN = /export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*['"]\.\/([\w-]+\.vue)['"]/g;

export interface ComponentPartSource {
  name: string;
  filePath: string;
}

export function getExportedParts(componentDir: string): ComponentPartSource[] {
  const indexPath = path.join(componentDir, 'index.ts');

  if (!fs.existsSync(indexPath)) {
    return [];
  }

  const indexSource = fs.readFileSync(indexPath, 'utf-8');

  return [...indexSource.matchAll(EXPORTED_SFC_PATTERN)].map(([, name, fileName]) => ({
    name,
    filePath: path.join(componentDir, fileName),
  }));
}

function cleanType(type: string) {
  return type
    .replace(/\s*\|\s*undefined\b/g, '')
    .replace(/^undefined\s*\|\s*/, '')
    .trim();
}

function getTagText(tags: PropertyMeta['tags'], tagName: string) {
  return tags.find(tag => tag.name === tagName)?.text?.trim();
}

function getEmitDocumentation(program: ts.Program, filePath: string) {
  const documentation = new Map<string, string>();
  const sourceFile = program.getSourceFile(filePath);

  if (!sourceFile) {
    return documentation;
  }

  const typeChecker = program.getTypeChecker();

  function visit(node: ts.Node) {
    const isDefineEmitsCall = ts.isCallExpression(node)
      && ts.isIdentifier(node.expression)
      && node.expression.text === 'defineEmits'
      && node.typeArguments?.length;

    if (isDefineEmitsCall) {
      const emitsType = typeChecker.getTypeFromTypeNode(node.typeArguments![0]);

      for (const property of emitsType.getProperties()) {
        const description = ts.displayPartsToString(property.getDocumentationComment(typeChecker));

        if (description) {
          documentation.set(property.name, description);
        }
      }

      return;
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return documentation;
}

function toProps(meta: ComponentMeta): ApiProp[] {
  return meta.props
    .filter(prop => !prop.global)
    .map((prop) => {
      const defaultValue = prop.default ?? getTagText(prop.tags, 'defaultValue') ?? getTagText(prop.tags, 'default');

      return {
        name: prop.name,
        type: cleanType(prop.type),
        ...(defaultValue && defaultValue !== 'undefined' ? { default: defaultValue } : {}),
        required: prop.required,
        description: prop.description,
      };
    });
}

function toEvents(meta: ComponentMeta, emitDocumentation: Map<string, string>): ApiEvent[] {
  return meta.events.map(event => ({
    name: event.name,
    payload: cleanType(event.type),
    description: event.description || emitDocumentation.get(event.name) || '',
  }));
}

function toSlots(meta: ComponentMeta): ApiSlot[] {
  return meta.slots.map(slot => ({
    name: slot.name,
    scope: slot.type === '{}' ? '' : cleanType(slot.type),
    description: slot.description,
  }));
}

function toMethods(meta: ComponentMeta): ApiMethod[] {
  return meta.exposed
    .filter(exposed => !exposed.name.startsWith('$'))
    .map(exposed => ({
      name: exposed.name,
      type: cleanType(exposed.type),
      description: exposed.description,
    }));
}

export function createApiExtractor(tsconfigPath: string) {
  const checker = createChecker(tsconfigPath, {
    forceUseTs: true,
    printer: { newLine: ts.NewLineKind.LineFeed },
  });

  function extractPart(part: ComponentPartSource): ComponentPartApi {
    const meta = checker.getComponentMeta(part.filePath);
    const program = checker.getProgram();
    const emitDocumentation = program ? getEmitDocumentation(program, part.filePath) : new Map<string, string>();

    return {
      name: part.name,
      props: toProps(meta),
      events: toEvents(meta, emitDocumentation),
      slots: toSlots(meta),
      methods: toMethods(meta),
    };
  }

  function extractComponent(componentDir: string): ComponentApi {
    return {
      component: path.basename(componentDir),
      parts: getExportedParts(componentDir).map(extractPart),
    };
  }

  return { extractComponent };
}
