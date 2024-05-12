import { promisify } from 'util';
import { exec } from 'child_process';
import { homedir } from 'os';
import { readFile, writeFile } from 'fs';
import { prompt } from 'enquirer';

import type { Dotfile } from '../types.d.ts';

const diff = (file1: string, file2: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(`diff ${file1} ${file2}`, (err, stdout, _stderr) => {
            if (err?.code === 2) reject(err);
            resolve(stdout);
        });
    });
};

const repoDotfileLocation = (dotf: Dotfile): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec('git rev-parse --show-toplevel', (err, stdout, stderr) => {
            if (err || stderr) reject(err ?? stderr);
            resolve(`${stdout.trim()}/src/dotfiles/${dotf}/.${dotf}`);
        });
    });
};

const setupSingleFileConfig = async (dotf: Dotfile): Promise<void> => {
    const readFileAsync = promisify(readFile);
    const writeFileAsync = promisify(writeFile);

    let skipFileWrite = false;

    const userDotfilePath = `${homedir()}/.${dotf}`;
    let repoDotfilePath = await repoDotfileLocation(dotf);
    let filesDiff = await diff(repoDotfilePath, userDotfilePath);
    // NOTE: what if they userDotfilePath doesn't exist and merely writing a new file?

    if (!filesDiff) {
        console.log(`No difference detected between "/${dotf}"s, skipping`);
        skipFileWrite = true;
    }
    else {
        console.log('diff output:');
        console.log(filesDiff);

        const answer = await prompt({
            type: 'confirm',
            name: 'question',
            message: 'Do you wish to continue?'
        })
        if (!(answer as { question: boolean }).question) skipFileWrite = true;
    }

    if (skipFileWrite) return;

    const data = await readFileAsync(repoDotfilePath, 'utf8');
    await writeFileAsync(userDotfilePath, data);
    console.log('File written');

    filesDiff = await diff(repoDotfilePath, userDotfilePath);
    if (filesDiff) {
        throw new Error('Post write file check unsuccessful');
    }
    console.log('Post write file check successful');
};

export default setupSingleFileConfig;
