import { exec } from 'child_process';

const diff = (file1: string, file2: string): Promise<string> => new Promise(
    (resolve, reject) => {
        exec(`diff ${file1} ${file2}`, (err, stdout) => {
            if (err?.code === 2) reject(err);
            resolve(stdout);
        });
    },
);

export default diff;
