import { readFile } from 'node:fs/promises';
import { isUrl, REGISTRY_URL_ENV, type RegistryLocation } from './location';
import { fetchThroughProxy, getProxyUrl, redactProxyUrl, shouldBypassProxy } from './proxy';

const REQUEST_TIMEOUT_MS = 20_000;
const responseCache = new Map<string, Promise<unknown>>();

export class RegistryFetchError extends Error {
  constructor(message: string, public readonly location: RegistryLocation, public readonly status?: number) {
    super(message);
    this.name = 'RegistryFetchError';
  }
}

async function fetchRemoteJson(location: RegistryLocation) {
  const proxyUrl = getProxyUrl();
  const throughProxy = Boolean(proxyUrl) && !shouldBypassProxy(location.source);
  let response: Response;

  try {
    const init = {
      headers: { Accept: 'application/json', ...location.headers },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    };
    response = throughProxy && proxyUrl
      ? await fetchThroughProxy(location.source, proxyUrl, init)
      : await fetch(location.source, init);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    const via = throughProxy && proxyUrl ? ` through ${redactProxyUrl(proxyUrl)}` : '';
    throw new RegistryFetchError(
      `Could not reach the registry at ${location.source}${via} (${reason}). Check your connection, HTTP(S)_PROXY, or set ${REGISTRY_URL_ENV} to another registry.`,
      location,
    );
  }

  if (response.status === 404) {
    throw new RegistryFetchError(`"${location.specifier}" was not found in the registry (${location.source}).`, location, 404);
  }

  if (response.status === 401 || response.status === 403) {
    throw new RegistryFetchError(`Access to ${location.source} was denied (HTTP ${response.status}). Check the registry headers in sigma-ui.config.json.`, location, response.status);
  }

  if (!response.ok) {
    throw new RegistryFetchError(`Failed to fetch ${location.source} (HTTP ${response.status}).`, location, response.status);
  }

  return response.json();
}

async function readLocalJson(location: RegistryLocation) {
  const filePath = location.source.replace(/^file:\/\//, '');

  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new RegistryFetchError(`"${location.specifier}" was not found in the registry (${filePath}).`, location, 404);
    }

    throw new RegistryFetchError(`Failed to read ${filePath}: ${(error as Error).message}`, location);
  }
}

export function fetchRegistryJson(location: RegistryLocation): Promise<unknown> {
  const cacheKey = `${location.source}\n${JSON.stringify(location.headers)}`;
  const cached = responseCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const request = isUrl(location.source) ? fetchRemoteJson(location) : readLocalJson(location);
  responseCache.set(cacheKey, request);
  request.catch(() => responseCache.delete(cacheKey));

  return request;
}
