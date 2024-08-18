import { promisify } from 'util';
import { homedir } from 'os';
import { readFile, writeFile } from 'fs';
import { prompt } from 'enquirer';
import { join } from 'path';

import diff from './diff';
import type { Dotfile } from '../index';

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

const setUpDotfile = async (dotfile: Dotfile): Promise<void> => {
    const userDotfilePath = `${homedir()}/${dotfile}`;
    const repoDotfilePath = join(__dirname, '..', 'assets', 'dotfiles', dotfile);

    let userDotfileExists = true;

    try {
        await readFileAsync(userDotfilePath);
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
            userDotfileExists = false;
        } else {
            throw err;
        }
    }

    if (userDotfileExists) {
        const filesDiff = await diff(repoDotfilePath, userDotfilePath);

        if (!filesDiff) {
            console.log(`No difference detected between the '${dotfile}'s, skipping.`);
            return;
        } else {
            console.log('diff output:');
            console.log(filesDiff);

            const answer = await prompt({
                type: 'confirm',
                name: 'question',
                message: 'Do you wish to continue?'
            })
            if (!(answer as { question: boolean }).question) return;
        }
    }

    const data = await readFileAsync(repoDotfilePath, 'utf8');
    await writeFileAsync(userDotfilePath, data);
    console.log(`'${dotfile}' successfully written.`);
};

export default setUpDotfile;
