import fs from 'node:fs';
import path from 'node:path';
import { REPO_ROOT, componentExists, exampleExists } from '../.vitepress/theme/plugins/registry-source';
import { REQUIRED_SECTIONS } from './page-template';

const REQUIRED_FRONTMATTER = ['title', 'description'];
const OVERVIEW_PAGES = ['charts.md'];

const CONTENT_DIR = path.join(REPO_ROOT, 'apps/docs/src/content');
const COMPONENTS_DIR = path.join(CONTENT_DIR, 'components');
const META_DIR = path.join(CONTENT_DIR, 'meta');

const INCLUDE_PATTERN = /<!--\s*@include:\s*@\/content\/meta\/([\w-]+)\.md\s*-->/g;
const PREVIEW_NAME_PATTERN = /<ComponentPreview\s[^>]*?name="([^"]+)"/g;
const INSTALL_PATTERN = /<ComponentInstall\s+name="([\w-]+)"\s*\/>/;

interface Section {
  title: string;
  line: number;
  body: string;
}

interface Page {
  filePath: string;
  frontmatter: Record<string, string>;
  sections: Section[];
  content: string;
}

interface LintError {
  filePath: string;
  line: number;
  message: string;
}

function listMarkdownFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    return entry.isDirectory() ? listMarkdownFiles(entryPath) : entry.name.endsWith('.md') ? [entryPath] : [];
  });
}

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  const frontmatter: Record<string, string> = {};

  for (const line of match?.[1].split('\n') ?? []) {
    const separatorIndex = line.indexOf(':');

    if (separatorIndex > 0) {
      frontmatter[line.slice(0, separatorIndex).trim()] = line.slice(separatorIndex + 1).trim();
    }
  }

  return frontmatter;
}

function parseSections(content: string) {
  const sections: Section[] = [];
  let isInFence = false;

  content.split('\n').forEach((line, index) => {
    if (/^\s*(```|~~~)/.test(line)) {
      isInFence = !isInFence;
    }

    if (!isInFence && line.startsWith('## ')) {
      sections.push({ title: line.slice(3), line: index + 1, body: '' });
    } else if (sections.length) {
      sections[sections.length - 1].body += `${line}\n`;
    }
  });

  return sections;
}

function readPage(filePath: string): Page {
  const content = fs.readFileSync(filePath, 'utf-8');
  return { filePath, content, frontmatter: parseFrontmatter(content), sections: parseSections(content) };
}

function getExpectedSource(filePath: string) {
  const slug = path.basename(filePath, '.md');
  const candidates = path.dirname(filePath).endsWith('charts') ? [`chart-${slug}`] : [slug];
  return candidates.find(componentExists);
}

function lintPage(page: Page): LintError[] {
  const errors: LintError[] = [];
  const report = (message: string, line = 1) => errors.push({ filePath: page.filePath, line, message });
  const { frontmatter, sections } = page;

  for (const key of REQUIRED_FRONTMATTER) {
    if (!frontmatter[key]) {
      report(`Missing the "${key}" frontmatter field.`);
    }
  }

  const expectedSource = getExpectedSource(page.filePath);

  if (frontmatter.source && !componentExists(frontmatter.source)) {
    report(`The "source" frontmatter field must be a folder name from packages/lib/src/registry/<style>/ui, got "${frontmatter.source}".`);
  } else if (expectedSource && frontmatter.source !== expectedSource) {
    report(`Set the "source" frontmatter field to "${expectedSource}".`);
  }

  const sectionTitles = sections.map(section => section.title);

  if (sectionTitles.join('|') !== REQUIRED_SECTIONS.join('|')) {
    report(`The H2 sections must be exactly: ${REQUIRED_SECTIONS.join(', ')}. Found: ${sectionTitles.join(', ') || 'none'}. Put any other content under an H3 inside one of them.`);
  }

  for (const section of sections) {
    if (!section.body.trim()) {
      report(`The "${section.title}" section is empty.`, section.line);
    }
  }

  const installationSection = sections.find(section => section.title === 'Installation');
  const installedComponent = installationSection?.body.match(INSTALL_PATTERN)?.[1];

  if (frontmatter.source && installationSection && installedComponent !== frontmatter.source) {
    report(`The Installation section must contain <ComponentInstall name="${frontmatter.source}" />.`, installationSection.line);
  }

  const apiSection = sections.find(section => section.title === 'API Reference');
  const includedMeta = [...(apiSection?.body.matchAll(INCLUDE_PATTERN) ?? [])].map(match => match[1]);

  if (frontmatter.source && apiSection && !includedMeta.includes(frontmatter.source)) {
    report(`The API Reference section must include <!-- @include: @/content/meta/${frontmatter.source}.md -->.`, apiSection.line);
  }

  page.content.split('\n').forEach((line, index) => {
    if (/^#{1,6} .*\s$/.test(line)) {
      report('Remove the trailing whitespace from the heading.', index + 1);
    }

    for (const [, exampleName] of line.matchAll(PREVIEW_NAME_PATTERN)) {
      if (!exampleExists(exampleName)) {
        report(`<ComponentPreview name="${exampleName}" /> has no example file in every style system.`, index + 1);
      }
    }

    for (const [, metaName] of line.matchAll(INCLUDE_PATTERN)) {
      if (!fs.existsSync(path.join(META_DIR, `${metaName}.md`))) {
        report(`The included file content/meta/${metaName}.md does not exist. Run \`pnpm docs:gen\`.`, index + 1);
      }
    }
  });

  return errors;
}

function lintMetaCoverage(pages: Page[]): LintError[] {
  const includedMeta = new Set(pages.flatMap(page => [...page.content.matchAll(INCLUDE_PATTERN)].map(match => match[1])));

  return fs.readdirSync(META_DIR)
    .filter(file => file.endsWith('.md') && !includedMeta.has(path.basename(file, '.md')))
    .map(file => ({
      filePath: path.join(META_DIR, file),
      line: 1,
      message: 'No component page includes this API reference. Document the component or remove it.',
    }));
}

function main() {
  const pages = listMarkdownFiles(COMPONENTS_DIR).map(readPage);
  const templatePages = pages.filter(page => !OVERVIEW_PAGES.includes(path.relative(COMPONENTS_DIR, page.filePath)));
  const errors = [...templatePages.flatMap(lintPage), ...lintMetaCoverage(pages)];

  for (const error of errors) {
    console.error(`${path.relative(REPO_ROOT, error.filePath)}:${error.line}  ${error.message}`);
  }

  if (errors.length) {
    console.error(`\n${errors.length} problem(s) in the component pages. The page template is described in CONTRIBUTING.md.`);
    process.exit(1);
  }

  console.log(`All ${templatePages.length} component pages follow the page template.`);
}

main();
