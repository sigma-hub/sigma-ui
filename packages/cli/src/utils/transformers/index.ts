import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'pathe';
import { Project, ScriptKind, type SourceFile } from 'ts-morph';
import type * as z from 'zod';
import type { Config } from '@/src/schemas';
import type { registryBaseColorSchema } from '@/src/schemas';
import { transformImport } from '@/src/utils/transformers/transform-import';

export interface TransformOpts {
  filename: string;
  raw: string;
  config: Config;
  baseColor?: z.infer<typeof registryBaseColorSchema>;
}

export type Transformer<Output = SourceFile> = (
  opts: TransformOpts & {
    sourceFile: SourceFile;
  }
) => Promise<Output>;

const transformers: Transformer[] = [
  transformImport,
  // transformTwPrefixes,
];

const project = new Project({
  compilerOptions: {},
});

async function createTempSourceFile(filename: string) {
  const dir = await fs.mkdtemp(path.join(tmpdir(), 'sigma-ui-'));
  return path.join(dir, filename);
}

export async function transform(opts: TransformOpts) {
  const tempFile = await createTempSourceFile(opts.filename);
  const sourceFile = project.createSourceFile(tempFile, opts.raw, {
    scriptKind: ScriptKind.Unknown,
  });

  for (const transformer of transformers) {
    transformer({ sourceFile, ...opts });
  }

  return sourceFile?.getFullText();
}
