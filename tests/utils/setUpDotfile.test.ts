import { promisify } from 'util';
import { readFile, mkdir, writeFile, rm } from 'fs';
import { join } from 'path';
import { prompt } from 'enquirer';

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
jest.mock('enquirer', () => ({
    prompt: jest.fn()
}));

describe('setUpDotfile', () => {
    const mockPrompt = prompt as jest.Mock;
    const consoleLogSpy = jest.spyOn(console, 'log')

    beforeEach(async () => {
        await createTempFixtures();
    });
    afterEach(async () => {
        await removeTempFixtures();
        jest.clearAllMocks();
    });
    afterAll(async () => {
        jest.restoreAllMocks();
    });

    it('should create a new dotfile if the user\'s dotfile is not found', async () => {
        await setUpDotfile('.vimrc');
        expect(consoleLogSpy).toHaveBeenCalledWith('\'.vimrc\' successfully written.');

        const filesDiff = await diff('./src/assets/dotfiles/.vimrc', './tests/utils/tempFixtures/.vimrc');
        expect(filesDiff).toBeFalsy();
    });

    it('should not create a new dotfile if the user\'s dotfile is present and the same as the repo\'s dotfile', async () => {
        const currentVimrcData = await readFileAsync('./src/assets/dotfiles/.vimrc', 'utf8');
        await writeFileAsync('./tests/utils/tempFixtures/.vimrc', currentVimrcData);

        await setUpDotfile('.vimrc');
        expect(consoleLogSpy).toHaveBeenCalledWith('No difference detected between the \'.vimrc\'s, skipping.');
    });

    it('should create a new dotfile if the user\'s dotfile is present and user chooses to overwrite it', async () => {
        mockPrompt.mockResolvedValueOnce({ question: true });
        await writeFileAsync('./tests/utils/tempFixtures/.vimrc', 'test');

        await setUpDotfile('.vimrc');

        const filesDiff = await diff('./src/assets/dotfiles/.vimrc', './tests/utils/tempFixtures/.vimrc');
        expect(filesDiff).toBeFalsy();
        expect(consoleLogSpy).toHaveBeenCalledWith('\'.vimrc\' successfully written.');
    });

    it('should not create a new dotfile if the user\'s dotfile is present and user chooses not to overwrite it', async () => {
        mockPrompt.mockResolvedValueOnce({ question: false });
        await writeFileAsync('./tests/utils/tempFixtures/.vimrc', 'test');

        await setUpDotfile('.vimrc');

        expect(consoleLogSpy).not.toHaveBeenCalledWith('\'.vimrc\' successfully written.');
    });
});
