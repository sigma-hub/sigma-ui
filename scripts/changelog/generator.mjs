// Changesets changelog generator. It replaces @changesets/changelog-github, which prefixes every
// change with its pull request and commit and thanks the author, including the maintainer.
// Maintainers get a plain bullet. Everyone else is credited in "Other contributions"
// (see format.mjs, which moves those bullets to the bottom of the release notes).
import process from 'node:process';
import { OTHER_CONTRIBUTION_MARKER } from './format.mjs';

/**
 * Finds who wrote a commit and the pull request it came from.
 * @param {string} repo `owner/name`
 * @param {string} commit
 * @returns {Promise<{ login?: string, pullRequestUrl?: string } | undefined>}
 */
export async function lookupGitHubCommit(repo, commit) {
  const token = process.env.GITHUB_TOKEN;
  const headers = {
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const base = `https://api.github.com/repos/${repo}/commits/${commit}`;
    const [commitResponse, pullsResponse] = await Promise.all([
      fetch(base, { headers }),
      fetch(`${base}/pulls`, { headers }),
    ]);

    if (!commitResponse.ok) {
      return undefined;
    }

    const commitData = await commitResponse.json();
    const pulls = pullsResponse.ok ? await pullsResponse.json() : [];

    return { login: commitData.author?.login, pullRequestUrl: pulls[0]?.html_url };
  } catch {
    return undefined;
  }
}

function indentContinuation(summary) {
  const [firstLine, ...rest] = summary.replace(/\r\n/g, '\n').trim().split('\n');

  return [firstLine, ...rest.map(line => (line.trim() ? `  ${line}` : ''))].join('\n');
}

/** @param {{ lookup?: typeof lookupGitHubCommit }} [dependencies] */
export function createGenerator({ lookup = lookupGitHubCommit } = {}) {
  return {
    async getReleaseLine(changeset, _type, options) {
      if (!options?.repo) {
        throw new Error('The changelog options need a "repo" (owner/name), for example { "repo": "sigma-hub/sigma-ui" }.');
      }

      const maintainers = (options.maintainers ?? []).map(name => name.toLowerCase());
      const text = indentContinuation(changeset.summary);
      const author = changeset.commit ? await lookup(options.repo, changeset.commit) : undefined;

      // Without a known author nobody is credited. Crediting a maintainer as a contributor is the worse mistake.
      if (!author?.login || maintainers.includes(author.login.toLowerCase())) {
        return `\n- ${text}`;
      }

      const [firstLine, ...rest] = text.split('\n');
      const link = author.pullRequestUrl ? ` in ${author.pullRequestUrl}` : '';

      return `\n- ${[`${firstLine} by @${author.login}${link} ${OTHER_CONTRIBUTION_MARKER}`, ...rest].join('\n')}`;
    },

    async getDependencyReleaseLine(changesets, dependenciesUpdated) {
      if (dependenciesUpdated.length === 0) {
        return '';
      }

      const updated = dependenciesUpdated.map(dependency => `${dependency.name}@${dependency.newVersion}`);

      return `- Updated dependencies: ${updated.join(', ')}`;
    },
  };
}

export default createGenerator();
