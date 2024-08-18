import { promisify } from 'util';
import { exec } from 'child_process';
import { homedir } from 'os';
import { readFile, writeFile } from 'fs';
import { prompt } from 'enquirer';
import { join } from 'path';

import type { Dotfile } from '../index';

const diff = (file1: string, file2: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(`diff ${file1} ${file2}`, (err, stdout, _stderr) => {
            if (err?.code === 2) reject(err);
            resolve(stdout);
        });
    });
};

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

const setUpDotfile = async (dotfile: Dotfile): Promise<void> => {
    const userDotfilePath = `${homedir()}/${dotfile}`;
    const repoDotfilePath = join(__dirname, '..', 'assets', dotfile);

    let userDotfileExists = true;
    readFileAsync(userDotfilePath)
        .catch(err => {
            if (err.code !== 'ENOENT') throw err;
            userDotfileExists = false;
        });

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
