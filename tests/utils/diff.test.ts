import diff from '../../src/utils/diff';

// diff1 and diff2 are the same, diff3 is different
describe('diff', () => {
    it('should return an empty string... a new dotfile if the user\'s dotfile is not found', async () => {
        // Relative from top level of repo where npm scripts are run from by default.
        const filesDiff = await diff('./tests/utils/fixtures/diff1', './tests/utils/fixtures/diff2');

        expect(filesDiff).toBe('');
    });

    it('should create a new dotfile if the user\'s dotfile is not found', async () => {
        const filesDiff = await diff('./tests/utils/fixtures/diff1', './tests/utils/fixtures/diff3');

        expect(filesDiff).toEqual(`2c2
< syntax on
---
> syntax off
`);
    });
});
