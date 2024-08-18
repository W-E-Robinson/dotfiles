import { promisify } from 'util';
import { readFile, mkdir, writeFile, rmdir } from 'fs';
import { join } from 'path';

import setUpDotfile from '../../src/utils/index';

const readFileAsync = promisify(readFile);
const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(writeFile);
const rmdirAsync = promisify(rmdir);

const createTestFixtures = async (): Promise<void> => {
    // const testVimrc = await readFileAsync(join(__dirname, 'fixtures', '.vimrc'), 'utf8',);

    await mkdirAsync(join(__dirname, 'tempFixtures'));
    // await writeFileAsync(join(__dirname, 'tempFixtures', '.vimrc'), testVimrc);
};

const removeTestFixtures = async (): Promise<void> => {
    await rmdirAsync(join(__dirname, 'tempFixtures'), { recursive: true });
};

jest.mock('os', () => ({
    ...jest.requireActual('os'),
    // All paths are relative from 'src/utils/index.ts' due to use of '__dirname'. = correct?
    // Needs to be relative from top level of repo where npm scripts are run from default.
    homedir: jest.fn().mockReturnValue('./tests/utils/tempFixtures'),
}));

describe('setUpDotfile', () => {
    beforeEach(async () => {
        await createTestFixtures(); // NOTE: may have to do indivudually for each test case certain things created or not
    });
    afterEach(async () => {
        await removeTestFixtures();
    });

    describe('Happy paths', () => {
        it('should create a new dotfile if the user\'s dotfile is not found', async () => {
            // @ts-expect-error - sampleDotfile is not a valid dotfile that can be configured, used only for testing.
            await setUpDotfile('sampleDotfile');
        });

        it('should create a new dotfile if the user\'s dotfile is present and user chooses to overwrite it', async () => {
            // NOTE: how do user input?
        });

        it('should not create a new dotfile if the user\'s dotfile is present and user chooses not to overwrite it', async () => {
            // NOTE: how do user input?
        });

        it.only('should not create a new dotfile if the user\'s dotfile is present and the same as the repo\'s dotfile', async () => {
            await setUpDotfile('.vimrc');
            // NOTE: how compare, import diff and look at?
            // NOTE: still vim-test, may need to make on fly in each test and just make tempFixtures + teardwon on befoer after etc
        });
    });

    describe('Unhappy paths', () => {
        it('should throw the correct error if the post write file check fails', async () => {
            try {
                // await setUpDotfile('sampleDotfile');
            } catch (err) {
                expect(err).toBeInstanceOf(Error);
                expect((err as Error).message).toBe('Post write file check unsuccessful');
            }
        });
    });
});
