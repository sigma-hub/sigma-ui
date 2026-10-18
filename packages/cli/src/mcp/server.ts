import readline from 'node:readline';
import { getPackageInfo } from '@/src/utils/get-package-info';
import { dispatchToolCall, TOOL_DEFINITIONS } from './tools';

/** Protocol revisions this server speaks, newest first. */
export const SUPPORTED_PROTOCOL_VERSIONS = ['2025-11-25', '2025-06-18', '2025-03-26', '2024-11-05'];
const LATEST_PROTOCOL_VERSION = SUPPORTED_PROTOCOL_VERSIONS[0];
const PARSE_ERROR = -32700;
const INVALID_REQUEST = -32600;
const METHOD_NOT_FOUND = -32601;
const INTERNAL_ERROR = -32603;

const MCP_METHODS = ['initialize', 'ping', 'tools/list', 'tools/call'] as const;

type McpMethod = (typeof MCP_METHODS)[number];

export interface McpResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: unknown;
  error?: { code: number; message: string };
}

export async function handleMcpMessage(message: unknown, cwd: string): Promise<McpResponse | null> {
  if (!message || typeof message !== 'object' || Array.isArray(message)) {
    return errorResponse(null, PARSE_ERROR, 'Parse error');
  }

  const id = readId(message);

  if (id === undefined) {
    return null;
  }

  if (!('method' in message) || typeof message.method !== 'string') {
    return errorResponse(id, INVALID_REQUEST, 'Invalid request');
  }

  if (!isMcpMethod(message.method)) {
    return errorResponse(id, METHOD_NOT_FOUND, `Method not found: ${message.method}`);
  }

  const params = 'params' in message ? message.params : undefined;

  switch (message.method) {
    case 'initialize':
      return { jsonrpc: '2.0', id, result: initializeResult(params) };
    case 'ping':
      return { jsonrpc: '2.0', id, result: {} };
    case 'tools/list':
      return { jsonrpc: '2.0', id, result: { tools: TOOL_DEFINITIONS } };
    case 'tools/call':
      return { jsonrpc: '2.0', id, result: await dispatchToolCall(params, cwd) };

    default: {
      const unexpected: never = message.method;
      return errorResponse(id, METHOD_NOT_FOUND, `Method not found: ${unexpected}`);
    }
  }
}

export async function serveMcp(options: {
  cwd: string;
  input: NodeJS.ReadableStream;
  output: NodeJS.WritableStream;
}) {
  const lines = readline.createInterface({ input: options.input, crlfDelay: Infinity });

  try {
    for await (const line of lines) {
      const trimmed = line.trim();

      if (!trimmed) {
        continue;
      }

      let response: McpResponse | null;

      try {
        response = await handleMcpMessage(JSON.parse(trimmed) as unknown, options.cwd);
      } catch (error) {
        const code = error instanceof SyntaxError ? PARSE_ERROR : INTERNAL_ERROR;
        const message = error instanceof SyntaxError ? 'Parse error' : errorMessage(error);
        response = errorResponse(null, code, message);
      }

      if (response) {
        options.output.write(`${JSON.stringify(response)}\n`);
      }
    }
  } finally {
    lines.close();
  }
}

function initializeResult(params: unknown) {
  const packageInfo = getPackageInfo();

  return {
    protocolVersion: readProtocolVersion(params),
    capabilities: { tools: { listChanged: false } },
    serverInfo: { name: 'sigma-ui', title: 'Sigma UI', version: packageInfo.version || '0.0.0' },
    instructions: 'Browse, search, and view sigma-ui registry items (components, blocks, examples) and get the `npx sigma-ui add` command that installs them. Registries come from sigma-ui.config.json in the project.',
  };
}

/** Answers with the client's revision when this server speaks it, and with the newest one otherwise. */
function readProtocolVersion(params: unknown) {
  const requested = params && typeof params === 'object' && 'protocolVersion' in params ? params.protocolVersion : undefined;

  return typeof requested === 'string' && SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
    ? requested
    : LATEST_PROTOCOL_VERSION;
}

function readId(message: object): string | number | null | undefined {
  if (!('id' in message)) {
    return undefined;
  }

  const id = message.id;

  if (typeof id === 'string' || typeof id === 'number' || id === null) {
    return id;
  }

  return null;
}

function isMcpMethod(value: string): value is McpMethod {
  return (MCP_METHODS as readonly string[]).includes(value);
}

function errorResponse(id: string | number | null, code: number, message: string): McpResponse {
  return { jsonrpc: '2.0', id, error: { code, message } };
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}
