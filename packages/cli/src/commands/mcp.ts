import process from 'node:process';
import { Command } from 'commander';
import { z } from 'zod';
import { serveMcp } from '@/src/mcp/server';
import { handleError } from '@/src/utils/handle-error';

const mcpOptionsSchema = z.object({
  cwd: z.string(),
});

export const mcp = new Command()
  .name('mcp')
  .description('start the registry MCP server on stdio')
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .action(async (opts: Record<string, unknown>) => {
    try {
      const options = mcpOptionsSchema.parse(opts);
      await serveMcp({ cwd: options.cwd, input: process.stdin, output: process.stdout });
    } catch (error) {
      handleError(error);
    }
  });
