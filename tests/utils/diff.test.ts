import diff from '../../src/utils/diff';

// diff1 and diff2 are the same, diff3 is different
describe('diff', () => {
    it('should return an empty string if there is no difference between the files', async () => {
        // Relative from top level of repo where npm scripts are run from by default.
        const filesDiff = await diff('./tests/utils/fixtures/diff1', './tests/utils/fixtures/diff2');

        expect(filesDiff).toBe('');
    });

    it('should return a string of the differences of the two files', async () => {
        const filesDiff = await diff('./tests/utils/fixtures/diff1', './tests/utils/fixtures/diff3');

        expect(filesDiff).toEqual(`2c2
< syntax on
---
> syntax off
`);
    });

    it('should throw an error when the exec diff errors with a 2 code', async () => {
        try {
            await diff('./tests/utils/fixtures/diff1', './tests/utils/fixtures/non-existent-diff');
        } catch (error) {
            // @ts-ignore - interface ExecException is not exported from node
            expect(error.code).toBe(2);
        }
    });
});
