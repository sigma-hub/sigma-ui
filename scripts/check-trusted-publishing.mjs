// Fails the release job unless npm can publish with trusted publishing (OIDC).
// It needs npm 11.5.1 or later and Node.js 22.14.0 or later. pnpm 10 publishes by running npm,
// so this asks pnpm which npm it runs instead of checking the npm that comes first on PATH.
import { execFileSync } from 'node:child_process';
import process from 'node:process';

const MIN_NPM = [11, 5, 1];
const MIN_NODE = [22, 14, 0];

function parse(version) {
  return version.split('.').map(part => Number.parseInt(part, 10));
}

function atLeast(version, min) {
  for (let i = 0; i < min.length; i++) {
    if (version[i] !== min[i]) {
      return version[i] > min[i];
    }
  }

  return true;
}

// `pnpm version` with no arguments is passed through to `npm version`, which prints the npm version.
const output = execFileSync('pnpm', ['version', '--json'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
const npmVersion = JSON.parse(output).npm;
const nodeVersion = process.versions.node;

console.log(`Node.js ${nodeVersion}, npm ${npmVersion} (as run by pnpm)`);

const problems = [];
const npm = parse(npmVersion);

if (npm[0] !== MIN_NPM[0] || !atLeast(npm, MIN_NPM)) {
  problems.push(`Trusted publishing needs npm ${MIN_NPM.join('.')} or a later 11.x, but pnpm runs npm ${npmVersion}.`);
}

if (!atLeast(parse(nodeVersion), MIN_NODE)) {
  problems.push(`Trusted publishing needs Node.js ${MIN_NODE.join('.')} or later, but this is ${nodeVersion}.`);
}

for (const problem of problems) {
  console.error(`::error::${problem}`);
}

process.exitCode = problems.length > 0 ? 1 : 0;
