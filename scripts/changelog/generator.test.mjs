import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { formatChangelog } from './format.mjs';
import { createGenerator } from './generator.mjs';

const OPTIONS = { repo: 'sigma-hub/sigma-ui', maintainers: ['aleksey-hoffman'] };

function changeset(summary, commit = 'abc1234') {
  return { summary, commit, releases: [], id: 'x' };
}

describe('getReleaseLine', () => {
  it('writes a plain bullet for a maintainer: no thanks, pull request, commit or handle', async () => {
    const generator = createGenerator({ lookup: async () => ({ login: 'Aleksey-Hoffman', pullRequestUrl: 'https://github.com/sigma-hub/sigma-ui/pull/5' }) });
    const line = await generator.getReleaseLine(changeset('Require Node.js 22 or newer.'), 'major', OPTIONS);

    assert.equal(line, '\n- Require Node.js 22 or newer.');
  });

  it('credits an outside contributor with their handle and pull request', async () => {
    const generator = createGenerator({ lookup: async () => ({ login: 'helper', pullRequestUrl: 'https://github.com/sigma-hub/sigma-ui/pull/9' }) });
    const line = await generator.getReleaseLine(changeset('Fix the Button focus ring.'), 'patch', OPTIONS);

    assert.equal(line, '\n- Fix the Button focus ring. by @helper in https://github.com/sigma-hub/sigma-ui/pull/9 <!-- other-contribution -->');
  });

  it('credits the handle alone when the pull request is unknown', async () => {
    const generator = createGenerator({ lookup: async () => ({ login: 'helper' }) });
    const line = await generator.getReleaseLine(changeset('Fix it.'), 'patch', OPTIONS);

    assert.equal(line, '\n- Fix it. by @helper <!-- other-contribution -->');
  });

  it('credits nobody when the author cannot be found', async () => {
    const generator = createGenerator({ lookup: async () => undefined });

    assert.equal(await generator.getReleaseLine(changeset('Fix it.'), 'patch', OPTIONS), '\n- Fix it.');
  });

  it('does not look anything up for a changeset without a commit', async () => {
    const generator = createGenerator({
      lookup: async () => {
        throw new Error('should not be called');
      },
    });

    assert.equal(await generator.getReleaseLine(changeset('Fix it.', null), 'patch', OPTIONS), '\n- Fix it.');
  });

  it('keeps multi line summaries inside their bullet', async () => {
    const generator = createGenerator({ lookup: async () => undefined });
    const line = await generator.getReleaseLine(changeset('Title.\n\n- First\n- Second'), 'minor', OPTIONS);

    assert.equal(line, '\n- Title.\n\n  - First\n  - Second');
  });

  it('puts the credit on the first line of a multi line summary', async () => {
    const generator = createGenerator({ lookup: async () => ({ login: 'helper', pullRequestUrl: 'https://example.com/pull/1' }) });
    const line = await generator.getReleaseLine(changeset('Title.\n\n- First'), 'minor', OPTIONS);

    assert.equal(line, '\n- Title. by @helper in https://example.com/pull/1 <!-- other-contribution -->\n\n  - First');
  });

  it('requires the repo option', async () => {
    const generator = createGenerator({ lookup: async () => undefined });

    await assert.rejects(generator.getReleaseLine(changeset('Fix it.'), 'patch', {}), /repo/);
  });

  it('produces release notes in the final layout once formatted', async () => {
    const lookup = async (_repo, commit) => (commit === 'outside' ? { login: 'helper', pullRequestUrl: 'https://example.com/pull/9' } : { login: 'aleksey-hoffman' });
    const generator = createGenerator({ lookup });
    const lines = [
      await generator.getReleaseLine(changeset('Mine.', 'inside'), 'patch', OPTIONS),
      await generator.getReleaseLine(changeset('Theirs.', 'outside'), 'patch', OPTIONS),
    ];
    const changelog = `# pkg\n\n## 1.0.1\n\n### Patch Changes\n\n${lines.join('\n')}\n`;

    assert.equal(
      formatChangelog(changelog, { maintainers: OPTIONS.maintainers }),
      '# pkg\n\n## 1.0.1\n\n### Improvements and fixes\n\n- Mine.\n\n### Other contributions\n\n- Theirs. by @helper in https://example.com/pull/9\n',
    );
  });
});

describe('getDependencyReleaseLine', () => {
  it('lists the updated dependencies without commit links', async () => {
    const generator = createGenerator();
    const line = await generator.getDependencyReleaseLine([], [{ name: 'sigma-ui', newVersion: '2.1.1' }], OPTIONS);

    assert.equal(line, '- Updated dependencies: sigma-ui@2.1.1');
  });

  it('writes nothing when nothing was updated', async () => {
    assert.equal(await createGenerator().getDependencyReleaseLine([], [], OPTIONS), '');
  });
});
