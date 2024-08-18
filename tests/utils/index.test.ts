import * as os from 'os';
import { promisify } from 'util';
import { readFile, mkdir, writeFile, rmdir } from 'fs';
import { join } from 'path';

import setUpDotfile from '../../src/utils/index';

const readFileAsync = promisify(readFile);
const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(writeFile);
const rmdirAsync = promisify(rmdir);

const createTestFixtures = async (): Promise<void> => {
    const sampleRepoDotfile = await readFileAsync(
        join(__dirname, 'fixtures', 'sampleRepoDotfile'), 'utf8',
    );
    const sampleUserDotfileNoDifferences = await readFileAsync(
        join(__dirname, 'fixtures', 'sampleUserDotfileNoDifferences'), 'utf8',
    );
    const sampleUserDotfileWithDifferences = await readFileAsync(
        join(__dirname, 'fixtures', 'sampleUserDotfileWithDifferences'), 'utf8',
    );

    await mkdirAsync(join(__dirname, 'tempFixtures'));
    await writeFileAsync(
        join(__dirname, 'tempFixtures', 'sampleRepoDotfile'), sampleRepoDotfile
    );
    await writeFileAsync(
        join(__dirname, 'tempFixtures', 'sampleUserDotfileNoDifferences'), sampleUserDotfileNoDifferences
    );
    await writeFileAsync(
        join(__dirname, 'tempFixtures', 'sampleUserDotfileWithDifferences'), sampleUserDotfileWithDifferences
    );
};

const removeTestFixtures = async (): Promise<void> => {
    await rmdirAsync(join(__dirname, 'tempFixtures'), { recursive: true });
};

describe('setUpDotfile', () => {
    const spy = jest.spyOn(os, 'homedir');

    beforeEach(async () => {
        await createTestFixtures();
    });
    afterEach(async () => {
        await removeTestFixtures();
        spy.mockRestore();
    });

    describe('Happy paths', () => {
        it.only('should create a new dotfile if the user\'s dotfile is not found', async () => {
            spy.mockReturnValueOnce('./fixtures');

            const test = os.homedir();
            const test2 = os.homedir();
            expect(test).toBe('/fixtures');
            expect(test2).toBe('/hello');
            // await setUpDotfile('sampleDotfile');
        });

        it('should create a new dotfile if the user\'s dotfile is present and user chooses to overwrite it', async () => {
            // NOTE: how do user input?
        });

        it('should not create a new dotfile if the user\'s dotfile is present and user chooses not to overwrite it', async () => {
            // NOTE: how do user input?
        });

        it('should not create a new dotfile if the user\'s dotfile is present and the same as the repo\'s dotfile', async () => {
            // await setUpDotfile('sampleDotfile');
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
