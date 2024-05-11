import { promisify } from 'util';
import { readFile, writeFile } from 'fs';
import { homedir } from 'os';
import { prompt } from 'enquirer';

import { diff, topRepoLevel } from '../utils';

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

// NOTE: can modularise this whole function for single file dotfiles?
const setupVimrc = async (): Promise<void> => {
    const userVimrcPath = `${homedir()}/.vimrc`;

    let skipFileWrite = false;
    let repoVimrcPath = await topRepoLevel();
    repoVimrcPath += '/src/vimrc/.vimrc';
    let filesDiff = await diff(repoVimrcPath, userVimrcPath);

    if (!filesDiff) {
        console.log('No difference detected between "/vimrc"s, skipping');
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

    const data = await readFileAsync(repoVimrcPath, 'utf8');
    await writeFileAsync(userVimrcPath, data);
    console.log('File written');

    filesDiff = await diff(repoVimrcPath, userVimrcPath);
    if (filesDiff) {
        throw new Error('Post write file check unsuccessful');
    }
    console.log('Post write file check successful');
};

export default setupVimrc;
