// import { setupSingleFileConfig } from "../index";
import { createTestDotfiles, removeTestDotfiles } from "./utils";

describe('setupSingleFileConfig', () => {
    beforeEach(async () => {
        await createTestDotfiles();
    });
    afterEach(async () => {
        await removeTestDotfiles();
    });

    describe('Happy paths', () => {
        it.only('should create a new dotfile if the user\'s dotfile is not found', async () => {
            // await setupSingleFileConfig('sampleDotfile');
        });

        it('should create a new dotfile if the user\'s dotfile is present and user chooses to overwrite it', async () => {
            // NOTE: how do user input?
        });

        it('should not create a new dotfile if the user\'s dotfile is present and user chooses not to overwrite it', async () => {
            // NOTE: how do user input?
        });

        it('should not create a new dotfile if the user\'s dotfile is present and the same as the repo\'s dotfile', async () => {
            // await setupSingleFileConfig('sampleDotfile');
        });
    });

    describe('Unhappy paths', () => {
        it('should throw the correct error if the post write file check fails', async () => {
            try {
                // await setupSingleFileConfig('sampleDotfile');
            } catch (err) {
                expect(err).toBeInstanceOf(Error);
                expect(err.message).toBe('Post write file check unsuccessful');
            }
        });
    });
});
