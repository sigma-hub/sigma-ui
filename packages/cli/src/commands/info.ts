import process from 'node:process';
import path from 'pathe';
import { Command } from 'commander';
import { consola } from 'consola';
import { z } from 'zod';
import { handleError } from '@/src/utils/handle-error';
import { getConfig, handleConfigIsMissing } from '@/src/utils/get-config';
import { getProjectInfo } from '@/src/utils/get-project-info';
import type { Config, RegistryConfigEntry } from '@/src/schemas';

const infoOptionsSchema = z.object({
  cwd: z.string(),
  json: z.boolean(),
});

export interface ProjectReport {
  styleSystem: Config['styleSystem'];
  framework: Config['framework'];
  baseColor: string;
  componentNaming: Config['componentNaming'];
  cssPath: string;
  tailwind: {
    config: string;
    prefix: string;
    installed: boolean;
    detectedConfig: 'css' | 'js' | 'none';
  };
  aliases: Config['aliases'];
  registries: Record<string, RegistryConfigEntry>;
  resolvedPaths: {
    components: string;
    utils: string;
    blocks: string;
    lib: string;
    composables: string;
    tailwindCss: string;
  };
}

export const info = new Command()
  .name('info')
  .description('print the sigma-ui configuration for this project')
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .option('--json', 'print the information as JSON', false)
  .action(async (opts: Record<string, unknown>) => {
    try {
      const options = infoOptionsSchema.parse(opts);
      const report = await describeProject(options.cwd);

      if (!report) {
        handleConfigIsMissing();
      }

      if (options.json) {
        process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
        return;
      }

      consola.log(formatProjectReport(report));
    } catch (error) {
      handleError(error);
    }
  });

export async function describeProject(cwd: string): Promise<ProjectReport | null> {
  const config = await getConfig(path.resolve(cwd));

  if (!config) {
    return null;
  }

  const project = await getProjectInfo(config.resolvedPaths.cwd);

  return {
    styleSystem: config.styleSystem,
    framework: config.framework,
    baseColor: config.baseColor,
    componentNaming: config.componentNaming,
    cssPath: config.cssPath,
    tailwind: {
      config: config.tailwind.config,
      prefix: config.tailwind.prefix ?? '',
      installed: project.hasTailwind,
      detectedConfig: project.tailwindConfigType,
    },
    aliases: config.aliases,
    registries: config.registries ?? {},
    resolvedPaths: {
      components: config.resolvedPaths.components,
      utils: config.resolvedPaths.utils,
      blocks: config.resolvedPaths.blocks,
      lib: config.resolvedPaths.lib,
      composables: config.resolvedPaths.composables,
      tailwindCss: config.resolvedPaths.tailwindCss,
    },
  };
}

export function formatProjectReport(report: ProjectReport) {
  const rows: Array<[string, string]> = [
    ['Style system', report.styleSystem],
    ['Framework', report.framework],
    ['Base color', report.baseColor],
    ['Component naming', report.componentNaming],
    ['CSS file', report.cssPath],
    ['Tailwind', report.tailwind.installed ? `installed (${report.tailwind.detectedConfig} config)` : 'not installed'],
    ['Components', report.resolvedPaths.components],
    ['Utils', report.resolvedPaths.utils || '(none)'],
    ['Blocks', report.resolvedPaths.blocks],
    ['Lib', report.resolvedPaths.lib],
    ['Composables', report.resolvedPaths.composables],
  ];

  if (report.tailwind.prefix) {
    rows.push(['Tailwind prefix', report.tailwind.prefix]);
  }

  const registryLines = Object.entries(report.registries).map(([namespace, entry]) => {
    const url = typeof entry === 'string' ? entry : entry.url;
    return `${namespace}  ${url}`;
  });
  rows.push(['Registries', registryLines.length ? registryLines.join('\n') : '(none)']);

  const labelWidth = Math.max(...rows.map(([label]) => label.length));
  return rows.map(([label, value]) => {
    const [first, ...rest] = value.split('\n');
    const padding = ' '.repeat(labelWidth + 2);
    return [`${label.padEnd(labelWidth)}  ${first}`, ...rest.map(line => `${padding}${line}`)].join('\n');
  }).join('\n');
}
