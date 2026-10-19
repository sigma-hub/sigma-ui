const SCOPES = ['CLI', 'Docs', 'Lib', 'Blocks', 'Styles', 'Dev', 'CI', 'Nuxt', 'UI'];

/** @type {import('@commitlint/types').UserConfig} */
export default {
  parserPreset: {
    parserOpts: {
      headerPattern: /^([^:\s]+): (.*)$/,
      headerCorrespondence: ['scope', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        'scope-joined-enum': ({ scope }, _when, allowedScopes) => {
          if (!scope) {
            return [true];
          }

          const unknownScopes = scope.split('/').filter(part => !allowedScopes.includes(part));

          return [
            unknownScopes.length === 0,
            `scope must be one of ${allowedScopes.join(', ')}, joined with "/" for several, e.g. "CLI/Docs: description"`,
          ];
        },
      },
    },
  ],
  rules: {
    'header-max-length': [2, 'always', 100],
    'scope-empty': [2, 'never'],
    'scope-joined-enum': [2, 'always', SCOPES],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
  },
};
