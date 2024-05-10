import { readFile, writeFile } from 'fs';
import { homedir } from 'os';
import { prompt } from 'enquirer';

import runDiff from '../utils';

// NOTE: can modularise this whole function for single file dotfiles?
const setupVimrc = (): void => {
    // NOTE: make below relative so can be run anywhere?= const find = require('find-package-json');?
    // or use git rev-parse --show-toplevel = gives top level of git repo?
    const repoVimrcPath = './src/vimrc/.vimrc';
    const userVimrcPath = `${homedir()}/.vimrc`;
    let skipFileWrite = false;

    readFile(userVimrcPath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') throw err;
        if (data === undefined) return;

        console.log('Warning: A ".vimrc" file has been found');
        runDiff(repoVimrcPath, userVimrcPath, (output) => {
            if (!output) {
                console.log('No difference detected between "/vimrc"s, exiting');
                skipFileWrite = true;
            } else { // NOTE: diff goes wrong when the files are actually different
                console.log('diff output:');
                console.log(output);

                prompt({
                    type: 'confirm',
                    name: 'question',
                    message: 'Do you wish to continue?'
                })
                    .then(answer => {
                        if (!(answer as { question: boolean }).question) skipFileWrite = true;
                    })
                    .catch(err => {
                        throw err;
                    });
            }
        });
    });

    if (skipFileWrite) return;

    readFile(repoVimrcPath, 'utf8', (err, data) => {
        if (err) throw err;

        writeFile(userVimrcPath, data, err => {
            if (err) throw err;
            console.log('File written successfully');
        });
    });

    runDiff(repoVimrcPath, userVimrcPath, (output) => {
        if (output) throw new Error('Post file write check unsuccessful');
        console.log('Post file write check successful');
    });
};

export default setupVimrc;
