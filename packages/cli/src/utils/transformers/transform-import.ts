import type { Transformer } from '@/src/utils/transformers';

export const transformImport: Transformer = async ({ sourceFile, config }) => {
  const importDeclarations = sourceFile.getImportDeclarations();

  for (const importDeclaration of importDeclarations) {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue();

    // Replace @/lib/registry/[style] with the components alias.
    if (moduleSpecifier.startsWith('@ui/registry/')) {
      if (config.aliases.components) {
        importDeclaration.setModuleSpecifier(
          moduleSpecifier.replace(/^@ui\/registry\/[^/]+\/ui/, config.aliases.components),
        );
      } else {
        importDeclaration.setModuleSpecifier(
          moduleSpecifier.replace(
            /^@ui\/registry\/[^/]+/,
            config.aliases.components,
          ),
        );
      }
    }

    // Replace `import { cn } from "@/lib/utils"`
    if (moduleSpecifier === '@ui/utils') {
      const namedImports = importDeclaration.getNamedImports();
      const cnImport = namedImports.find(i => i.getName() === 'cn');

      if (cnImport) {
        importDeclaration.setModuleSpecifier(
          moduleSpecifier.replace(/^@ui\/utils/, config.aliases.utils),
        );
      }
    }
  }

  return sourceFile;
};
