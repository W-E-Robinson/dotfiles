const { rules: airbnbTypescriptRules } = require('eslint-config-airbnb-typescript/lib/shared');

// typescript-eslint v8 removed its formatting rules (moved to @stylistic) and
// renamed no-throw-literal, but airbnb-typescript still references them.
// Remap them here with the same options airbnb-typescript sets.
const renamedRules = { 'no-throw-literal': 'only-throw-error' };
const removedTypescriptRules = [
    'brace-style', 'comma-dangle', 'comma-spacing', 'func-call-spacing', 'indent',
    'keyword-spacing', 'lines-between-class-members', 'no-extra-semi', 'no-throw-literal',
    'object-curly-spacing', 'quotes', 'semi', 'space-before-blocks',
    'space-before-function-paren', 'space-infix-ops',
];
const migratedRules = Object.fromEntries(removedTypescriptRules.flatMap((rule) => [
    [`@typescript-eslint/${rule}`, 'off'],
    [
        renamedRules[rule] ? `@typescript-eslint/${renamedRules[rule]}` : `@stylistic/${rule}`,
        airbnbTypescriptRules[`@typescript-eslint/${rule}`],
    ],
]));

module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        'jest/globals': true,
    },
    plugins: ['jest', 'import', '@typescript-eslint', '@stylistic'],
    parser: '@typescript-eslint/parser',
    extends: ['airbnb-base', 'airbnb-typescript/base'],
    ignorePatterns: ['dist/*', '.eslintrc.js'],
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    rules: {
        ...migratedRules,
        '@stylistic/comma-dangle': [2, 'always-multiline'],
        'import/extensions': [0, 'always'],
        'no-restricted-syntax': [0, { selector: 'ForOfStatement' }],
        'no-await-in-loop': [0],
        'no-process-env': [2],
        '@stylistic/indent': [2, 4],
    },
    overrides: [
        {
            files: 'tests/**/*.test.ts',
            env: { jest: true },
            rules: {
                'import/first': [0],
                'no-process-env': [0],
            },
        },
    ],
};
