import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { extractVersionSection, formatChangelog } from './format.mjs';

const MAINTAINERS = ['aleksey-hoffman'];

const LEGACY = `# sigma-ui

## 2.1.0

Intro paragraph.

### Major Changes

- [#5](https://github.com/sigma-hub/sigma-ui/pull/5) [\`a050f97\`](https://github.com/sigma-hub/sigma-ui/commit/a050f9790d5df989ecc359fdcbb0028b81d12eaf) Thanks [@aleksey-hoffman](https://github.com/aleksey-hoffman)! - Require Node.js 22 or newer.

- [#5](https://github.com/sigma-hub/sigma-ui/pull/5) [\`87bb5ab\`](https://github.com/sigma-hub/sigma-ui/commit/87bb5ab8d09e9cdb91f71e4fbcc62189b4156ce9) Thanks [@aleksey-hoffman](https://github.com/aleksey-hoffman)! - SIGMA-UI 2.0 notes.
  
  - Registry-driven CLI.
  - New commands: \`view\`.

### Patch Changes

- [#7](https://github.com/sigma-hub/sigma-ui/pull/7) [\`ab38d74\`](https://github.com/sigma-hub/sigma-ui/commit/ab38d74286e52ad9999551b8667cb4aacc2059f4) Thanks [@someone-else](https://github.com/someone-else)! - Fix the Button focus ring.

- [#5](https://github.com/sigma-hub/sigma-ui/pull/5) [\`3167794\`](https://github.com/sigma-hub/sigma-ui/commit/3167794970b52ffc8a8b9dfb8fd8d59835ec17c4) Thanks [@Aleksey-Hoffman](https://github.com/aleksey-hoffman)! - Data table uses TanStack 9.

## 2.0.0

### Minor Changes

- Plain entry.
`;

describe('formatChangelog', () => {
  const formatted = formatChangelog(LEGACY, { maintainers: MAINTAINERS });

  it('removes pull request links, commit hashes and thanks for maintainers', () => {
    assert.doesNotMatch(formatted, /Thanks/);
    assert.doesNotMatch(formatted, /a050f97|87bb5ab|3167794|ab38d74/);
    assert.doesNotMatch(formatted, /\(https:\/\/github\.com\/sigma-hub\/sigma-ui\/commit/);
    assert.match(formatted, /^- Require Node\.js 22 or newer\.$/m);
    assert.match(formatted, /^- Data table uses TanStack 9\.$/m);
  });

  it('names the sections after what they hold', () => {
    assert.match(formatted, /^### Breaking changes$/m);
    assert.match(formatted, /^### Improvements and fixes$/m);
    assert.match(formatted, /^### New features$/m);
    assert.doesNotMatch(formatted, /Major Changes|Patch Changes|Minor Changes/);
  });

  it('puts outside contributors in a last section with their handle and pull request', () => {
    const section = extractVersionSection(formatted, '2.1.0');

    assert.ok(section);
    assert.match(section, /### Other contributions\n\n- Fix the Button focus ring\. by @someone-else in https:\/\/github\.com\/sigma-hub\/sigma-ui\/pull\/7$/);
    assert.ok(section.lastIndexOf('### Other contributions') > section.lastIndexOf('### Improvements and fixes'));
    assert.doesNotMatch(section.split('### Other contributions')[0], /someone-else/);
  });

  it('never credits maintainers, whatever the capitalisation', () => {
    assert.doesNotMatch(formatted, /@aleksey-hoffman|@Aleksey-Hoffman/i);
  });

  it('keeps the intro and nested lists, and separates multi paragraph bullets', () => {
    const section = extractVersionSection(formatted, '2.1.0');

    assert.ok(section?.startsWith('Intro paragraph.'));
    assert.match(section, /- SIGMA-UI 2\.0 notes\.\n\n {2}- Registry-driven CLI\.\n {2}- New commands: `view`\./);
    assert.match(section, /- Require Node\.js 22 or newer\.\n\n- SIGMA-UI 2\.0 notes\./);
  });

  it('keeps bullets without blank lines when none of them has nested content', () => {
    const output = formatChangelog('## 1.0.0\n\n### Minor Changes\n\n- One.\n\n- Two.\n', { maintainers: MAINTAINERS });

    assert.match(output, /### New features\n\n- One\.\n- Two\.\n$/);
  });

  it('leaves the title and other versions in place', () => {
    assert.ok(formatted.startsWith('# sigma-ui\n\n## 2.1.0\n'));
    assert.match(formatted, /## 2\.0\.0\n\n### New features\n\n- Plain entry\.\n$/);
  });

  it('is idempotent', () => {
    assert.equal(formatChangelog(formatted, { maintainers: MAINTAINERS }), formatted);
  });

  it('moves bullets marked by the generator and strips the marker', () => {
    const output = formatChangelog(
      '## 1.1.0\n\n### Patch Changes\n\n- Mine.\n- Theirs by @helper in https://example.com/pull/9 <!-- other-contribution -->\n',
      { maintainers: MAINTAINERS },
    );

    assert.equal(output, '## 1.1.0\n\n### Improvements and fixes\n\n- Mine.\n\n### Other contributions\n\n- Theirs by @helper in https://example.com/pull/9\n');
  });

  it('keeps fenced code that looks like headings or bullets inside its bullet', () => {
    const output = formatChangelog('## 1.0.0\n\n### Patch Changes\n\n- Docs.\n\n  ```md\n  ### Not a heading\n- not a bullet\n  ```\n', { maintainers: MAINTAINERS });

    assert.match(output, /### Not a heading\n- not a bullet\n/);
    assert.doesNotMatch(output, /### Not a heading[\s\S]*### Improvements/);
  });

  it('drops the dependency bullet group only when it is empty', () => {
    const output = formatChangelog('## 1.0.1\n\n### Patch Changes\n\n- Updated dependencies: sigma-ui@2.1.0\n', { maintainers: MAINTAINERS });

    assert.match(output, /- Updated dependencies: sigma-ui@2\.1\.0/);
  });
});

describe('extractVersionSection', () => {
  it('returns the body between two version headings', () => {
    assert.equal(extractVersionSection('# x\n\n## 1.1.0\n\nA\n\n## 1.0.0\n\nB\n', '1.1.0'), 'A');
    assert.equal(extractVersionSection('# x\n\n## 1.1.0\n\nA\n\n## 1.0.0\n\nB\n', '1.0.0'), 'B');
  });

  it('returns undefined for an unknown version', () => {
    assert.equal(extractVersionSection('# x\n\n## 1.0.0\n\nB\n', '2.0.0'), undefined);
  });
});
