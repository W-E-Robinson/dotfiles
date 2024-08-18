import { promisify } from 'util';
import { readFile, mkdir, writeFile, rm } from 'fs';
import { join } from 'path';

import setUpDotfile from '../../src/utils/setUpDotfile';
import diff from '../../src/utils/diff';

const readFileAsync = promisify(readFile);
const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(writeFile);
const rmAsync = promisify(rm);

const createTempFixtures = async (): Promise<void> => {
    await mkdirAsync(join(__dirname, 'tempFixtures'));
};

const removeTempFixtures = async (): Promise<void> => {
    await rmAsync(join(__dirname, 'tempFixtures'), { recursive: true });
};

jest.mock('os', () => ({
    ...jest.requireActual('os'),
    // Relative from top level of repo where npm scripts are run from by default.
    homedir: jest.fn().mockReturnValue('./tests/utils/tempFixtures'),
}));

describe('setUpDotfile', () => {
    const consoleLogSpy = jest.spyOn(console, 'log')

    beforeEach(async () => {
        await createTempFixtures();
    });
    afterEach(async () => {
        await removeTempFixtures();
    });

    it('should create a new dotfile if the user\'s dotfile is not found', async () => {
        // await setUpDotfile('sampleDotfile');
    });

    it('should create a new dotfile if the user\'s dotfile is present and user chooses to overwrite it', async () => {
        // NOTE: how do user input?
    });

    it('should not create a new dotfile if the user\'s dotfile is present and user chooses not to overwrite it', async () => {
        // NOTE: how do user input?
    });

    it.only('should not create a new dotfile if the user\'s dotfile is present and the same as the repo\'s dotfile', async () => {
        await setUpDotfile('.vimrc');
        expect(consoleLogSpy).toHaveBeenCalledWith('\'.vimrc\' successfully written.');

        const filesDiff = await diff('./src/assets/dotfiles/.vimrc', './tests/utils/tempFixtures/.vimrc');
        expect(filesDiff).toBeFalsy();
    });
});
