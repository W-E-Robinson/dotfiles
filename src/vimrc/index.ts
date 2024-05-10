import { readFile } from 'fs';
import { homedir } from 'os';
import { exec } from 'child_process';

const runDiff = (file1: string, file2: string, callback: ((stdout: string) => void)) => {
    exec(`diff ${file1} ${file2}`, (error, stdout, stderr) => {
        if (error) throw new Error(`Error executing diff command: ${error}`);
        if (stderr) throw new Error(`diff command encountered an error: ${stderr}`);
        callback(stdout);
    });
}

const setupVimrc = (): void => {
    console.log('.vimrc setup');

    const vimrcPath = `${homedir()}/.vimrc`;
    readFile(vimrcPath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') throw err;

        if (data !== undefined) {
            console.log('Warning: A ".vimrc" file has been found');
            runDiff('./.vimrc', vimrcPath, (output) => {
                console.log('diff output:');
                console.log(output);
            });
        }
    });
};

export default setupVimrc;
