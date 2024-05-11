import { prompt } from 'enquirer';

import setupVimrc from './vimrc';

const dotfiles = [
    { display: '~/.vimrc', setupFunction: setupVimrc },
];

const dotfilesPrompt = prompt({
    type: 'multiselect',
    name: 'dotfiles',
    message: 'Select the dotfiles you wish to create',
    choices: dotfiles.map(dotfile => dotfile.display),
});

dotfilesPrompt
    .then(async (values) => {
        const answers = (values as { dotfiles: string[] }).dotfiles;
        if (!answers.length) {
            throw new Error('No dotfiles selected');
        }

        for (const dotfile of dotfiles.filter(dotf => answers.includes(dotf.display))) {
            await dotfile.setupFunction()
        }
    })
    .catch((err) => console.error(err));
