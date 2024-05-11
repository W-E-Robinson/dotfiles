import { prompt } from 'enquirer';

import setupVimrc from './vimrc';

// const setupBashrc = () => { console.log('setupbashrc') };
// const setupGitconfig = () => { console.log('setupgitconfig') };
// const setupNvim = () => { console.log('setupnvim') };

const dotfiles = [
    // { display: '~/.bashrc', setupFunction: setupBashrc },
    // { display: '~/.gitconfig', setupFunction: setupGitconfig },
    // { display: '~/.config/nvim/', setupFunction: setupNvim },
    { display: '~/.vimrc', setupFunction: setupVimrc },
];

const dotfilesPrompt = prompt({
    type: 'multiselect',
    name: 'dotfiles',
    message: 'Select the dotfiles you wish to create',
    choices: dotfiles.map(dotfile => dotfile.display),
});

dotfilesPrompt
    .then(values => {
        const answers = (values as { dotfiles: string[] }).dotfiles;
        if (!answers.length) {
            throw new Error('Error: No dotfiles selected');
        }

        for (const dotfile of dotfiles.filter(dotf => answers.includes(dotf.display))) {
            dotfile.setupFunction();
        }
    })
    .catch((err) => console.error(err));
