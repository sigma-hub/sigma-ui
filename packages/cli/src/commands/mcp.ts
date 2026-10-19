import process from 'node:process';
import { Command } from 'commander';
import { consola } from 'consola';
import { colors } from 'consola/utils';
import prompts from 'prompts';
import { z } from 'zod';
import { getMcpClient, MCP_CLIENT_NAMES, MCP_CLIENTS, writeMcpClientConfig } from '@/src/mcp/clients';
import { serveMcp } from '@/src/mcp/server';
import { loadEnvFiles } from '@/src/utils/env-files';
import { handleError } from '@/src/utils/handle-error';

const mcpOptionsSchema = z.object({
  cwd: z.string(),
});

const mcpInitOptionsSchema = z.object({
  cwd: z.string(),
  client: z.string().optional(),
});

export const mcp = new Command()
  .name('mcp')
  .description('start the registry MCP server on stdio')
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .action(async (opts: Record<string, unknown>) => {
    try {
      const options = mcpOptionsSchema.parse(opts);
      loadEnvFiles(options.cwd);
      await serveMcp({ cwd: options.cwd, input: process.stdin, output: process.stdout });
    } catch (error) {
      handleError(error);
    }
  });

mcp
  .command('init')
  .description('add the sigma-ui MCP server to an MCP client\'s project config')
  .option(`--client <client>`, `the MCP client (${MCP_CLIENT_NAMES.join(', ')})`)
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .action(async (opts: Record<string, unknown>) => {
    try {
      const options = mcpInitOptionsSchema.parse(opts);
      const clientName = options.client ?? await promptClient();

      if (!clientName) {
        process.exitCode = 1;
        return;
      }

      const client = getMcpClient(clientName);
      const result = await writeMcpClientConfig(options.cwd, client);

      if (result.status === 'manual') {
        consola.info(result.reason);
        consola.log(`Add this to ${colors.cyan(result.configPath)}:\n\n${result.snippet}\n`);
        consola.log(`Then restart ${client.label}.`);
        return;
      }

      consola.success(`${result.created ? 'Created' : 'Updated'} ${colors.cyan(result.configPath)}.`);
      consola.log(`Restart ${client.label} and enable the ${colors.cyan('sigma-ui')} server if it asks.`);
    } catch (error) {
      handleError(error);
    }
  });

async function promptClient() {
  const { client } = await prompts({
    type: 'select',
    name: 'client',
    message: 'Which MCP client are you using?',
    choices: MCP_CLIENTS.map(candidate => ({ title: candidate.label, value: candidate.name })),
  });

  return client as string | undefined;
}
