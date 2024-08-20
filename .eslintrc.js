module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        'jest/globals': true,
    },
    plugins: ['jest', 'import', '@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    extends: ['airbnb-base', 'airbnb-typescript/base'],
    ignorePatterns: ['dist/*', '.eslintrc.js'],
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/comma-dangle': [2, 'always-multiline'],
        'import/extensions': [0, 'always'],
        'no-restricted-syntax': [0, { selector: 'ForOfStatement' }],
        'no-await-in-loop': [0],
        'no-process-env': [2],
        '@typescript-eslint/indent': [2, 4],
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
