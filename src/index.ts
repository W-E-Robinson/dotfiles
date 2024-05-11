import { prompt } from 'enquirer';
import setupSingleFileConfig from './utils';

import type { Dotfile } from './types.d.ts';

const dotfiles: Dotfile[] = ['vimrc'];

const dotfilesPrompt = prompt({
    type: 'multiselect',
    name: 'dotfiles',
    message: 'Select the dotfiles you wish to create',
    choices: dotfiles,
});

dotfilesPrompt
    .then(async (values) => {
        const answers = (values as { dotfiles: Dotfile[] }).dotfiles;
        if (!answers.length) {
            throw new Error('No dotfiles selected');
        }

        for (const dotfile of answers) {
            await setupSingleFileConfig(dotfile)
        }
    })
    .catch((err) => console.error(err));
