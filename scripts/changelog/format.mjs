// Turns the changelog that `changeset version` writes into the release notes layout:
// grouped sections, plain bullets, and outside contributors credited at the bottom.
// GitHub release bodies are cut from these files by the changesets action, so the format lives here.

export const OTHER_CONTRIBUTION_MARKER = '<!-- other-contribution -->';

export const SECTION_TITLES = {
  'Major Changes': 'Breaking changes',
  'Minor Changes': 'New features',
  'Patch Changes': 'Improvements and fixes',
};

const BREAKING_TITLE = 'Breaking changes';
const NEW_FEATURES_TITLE = 'New features';
const SECTION_ORDER = [BREAKING_TITLE, NEW_FEATURES_TITLE, 'Improvements and fixes'];
const OTHER_CONTRIBUTIONS_TITLE = 'Other contributions';

// "- [#5](pr) [`abc1234`](commit) Thanks [@name](profile)! - Text" from @changesets/changelog-github.
const LEGACY_PREFIX = /^- (?:\[#(\d+)\]\(([^)]*)\)\s+)?(?:\[`[0-9a-f]{7,40}`\]\([^)]*\)\s+)?(?:Thanks \[@([\w-]+)\]\([^)]*\)!\s+)?-\s+/;

/** @param {string} line @param {string[]} maintainers */
function normalizeLegacyFirstLine(line, maintainers) {
  const match = LEGACY_PREFIX.exec(line);

  if (!match || !(match[1] || match[3])) {
    return line;
  }

  const [prefix, , prUrl, handle] = match;
  const text = line.slice(prefix.length);
  const isMaintainer = !handle || maintainers.some(name => name.toLowerCase() === handle.toLowerCase());

  if (isMaintainer) {
    return `- ${text}`;
  }

  const credit = prUrl ? ` by @${handle} in ${prUrl}` : ` by @${handle}`;

  return `- ${text}${credit} ${OTHER_CONTRIBUTION_MARKER}`;
}

/** Splits lines at `### ` headings, ignoring fenced code. */
function splitGroups(lines) {
  const preamble = [];
  const groups = [];
  let insideFence = false;

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      insideFence = !insideFence;
    }

    const heading = insideFence ? null : /^### (.+?)\s*$/.exec(line);

    if (heading) {
      groups.push({ title: heading[1], lines: [] });
    } else if (groups.length > 0) {
      groups.at(-1).lines.push(line);
    } else {
      preamble.push(line);
    }
  }

  return { preamble, groups };
}

/** Splits the lines of a group into list items. A top level `- ` starts an item. */
function splitItems(lines) {
  const items = [];
  let insideFence = false;

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      insideFence = !insideFence;
    }

    if (!insideFence && line.startsWith('- ')) {
      items.push([line]);
    } else if (items.length > 0) {
      items.at(-1).push(line);
    }
  }

  return items.map((item) => {
    const trimmed = item.map(line => line.trimEnd());

    while (trimmed.at(-1) === '') {
      trimmed.pop();
    }

    return trimmed;
  });
}

function renderItems(items) {
  const isLoose = items.some(item => item.includes(''));

  return items.map(item => item.join('\n')).join(isLoose ? '\n\n' : '\n');
}

// The first release of a package (1.0.0 or 0.x, the oldest entry) has nothing to break.
function isFirstRelease(version, isOldest) {
  return isOldest && /^(0\.|1\.0\.0$)/.test(version);
}

function formatVersionBody(bodyLines, maintainers, firstRelease) {
  const { preamble, groups } = splitGroups(bodyLines);
  const sections = new Map();
  const otherContributions = [];

  for (const group of groups) {
    const mappedTitle = SECTION_TITLES[group.title] ?? group.title;
    const title = firstRelease && mappedTitle === BREAKING_TITLE ? NEW_FEATURES_TITLE : mappedTitle;

    for (const item of splitItems(group.lines)) {
      item[0] = normalizeLegacyFirstLine(item[0], maintainers);

      if (item[0].includes(OTHER_CONTRIBUTION_MARKER)) {
        item[0] = item[0].replace(` ${OTHER_CONTRIBUTION_MARKER}`, '').replace(OTHER_CONTRIBUTION_MARKER, '').trimEnd();
        otherContributions.push(item);
      } else {
        sections.set(title, [...(sections.get(title) ?? []), item]);
      }
    }
  }

  const orderedTitles = [
    ...SECTION_ORDER.filter(title => sections.has(title)),
    ...[...sections.keys()].filter(title => !SECTION_ORDER.includes(title)),
  ];
  const blocks = orderedTitles.map(title => `### ${title}\n\n${renderItems(sections.get(title))}`);

  if (otherContributions.length > 0) {
    blocks.push(`### ${OTHER_CONTRIBUTIONS_TITLE}\n\n${renderItems(otherContributions)}`);
  }

  const intro = preamble.join('\n').trim();

  return [intro, ...blocks].filter(Boolean).join('\n\n');
}

/**
 * @param {string} markdown Contents of a CHANGELOG.md.
 * @param {{ maintainers?: string[] }} [options] Maintainers are never credited.
 */
export function formatChangelog(markdown, options = {}) {
  const maintainers = options.maintainers ?? [];
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const output = [];
  const lastVersionIndex = lines.findLastIndex(line => /^## /.test(line));
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!/^## /.test(line)) {
      output.push(line);
      index += 1;
      continue;
    }

    const bodyLines = [];
    const version = line.slice(3).trim();
    const firstRelease = isFirstRelease(version, index === lastVersionIndex);

    index += 1;

    while (index < lines.length && !/^## /.test(lines[index])) {
      bodyLines.push(lines[index]);
      index += 1;
    }

    output.push(line, '', formatVersionBody(bodyLines, maintainers, firstRelease), '');
  }

  return `${output.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd()}\n`;
}

/** The body of one version, the way the changesets action cuts it for the GitHub release. */
export function extractVersionSection(markdown, version) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const start = lines.findIndex(line => line.trim() === `## ${version}`);

  if (start === -1) {
    return undefined;
  }

  const rest = lines.slice(start + 1);
  const end = rest.findIndex(line => /^## /.test(line));

  return rest.slice(0, end === -1 ? undefined : end).join('\n').trim();
}
