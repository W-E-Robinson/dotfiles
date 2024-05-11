import { exec } from 'child_process';

export const diff = (file1: string, file2: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(`diff ${file1} ${file2}`, (err, stdout, _stderr) => {
            if (err?.code === 2) reject(err);
            resolve(stdout);
        });
    });
};

export const topRepoLevel = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec('git rev-parse --show-toplevel', (err, stdout, stderr) => {
            if (err || stderr) reject(err ?? stderr);
            resolve(stdout.trim());
        });
    });
};
