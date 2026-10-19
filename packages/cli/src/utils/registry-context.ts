import path from 'pathe';
import { DEFAULT_STYLE } from '@sigma-ui/shared/consts';
import { styleSystemSchema } from '@/src/schemas';
import { getRawConfig } from '@/src/utils/get-config';
import type { RegistryContext } from '@/src/utils/registry';

export async function getRegistryContext(cwd: string, styleOverride?: string): Promise<RegistryContext> {
  const resolvedCwd = path.resolve(cwd);
  const config = await getRawConfig(resolvedCwd);
  const styleSystem = styleSystemSchema.parse(styleOverride ?? config?.styleSystem ?? DEFAULT_STYLE);

  return { cwd: resolvedCwd, styleSystem, registries: config?.registries };
}
