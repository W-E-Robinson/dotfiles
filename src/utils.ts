import { exec } from 'child_process';

const runDiff = (file1: string, file2: string, callback: ((stdout: string) => void)) => {
    exec(`diff ${file1} ${file2}`, (error, stdout, stderr) => {
        if (error) throw new Error(`Error executing diff command: ${error}`);
        if (stderr) throw new Error(`diff command encountered an error: ${stderr}`);
        callback(stdout);
    });
}

export default runDiff;
