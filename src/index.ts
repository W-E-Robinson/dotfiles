/* eslint no-console: 0 */

import { prompt } from 'enquirer';

import setUpDotfile from './utils/setUpDotfile';

export type Dotfile = '.vimrc' | '.bashrc' | '.gitconfig';

const dotfiles: Dotfile[] = ['.vimrc', '.bashrc', '.gitconfig'];

const dotfilesPrompt = prompt({
    type: 'multiselect',
    name: 'dotfiles',
    message: 'Select the dotfiles you wish to create (use space bar)',
    choices: dotfiles,
});

dotfilesPrompt
    .then(async (values) => {
        const answers = (values as { dotfiles: Dotfile[] }).dotfiles;
        if (!answers.length) throw new Error('No dotfiles selected');

        for (const dotfile of answers) {
            await setUpDotfile(dotfile);
        }
    })
    .catch((err) => console.error(err.message));
