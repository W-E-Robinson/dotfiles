# dotfiles

This repo contains my dotfiles and scripting to write them on to a system.

## Configurations (located at: src/assets/dotfiles/)
- **.vimrc**: Configuration file for Vim editor settings.
- **.bashrc**: Configuration file for Bash commands.
- **.gitconfig**: Configuration file for Git.

## Installation (only works for POSIX currenty)
Note, if using macOS you will need to source `.bashrc` in to `.bash_profile`, to do this populate `.bash_profile` with:
```sh
if [ -f $HOME/.bashrc ]; then
    source $HOME/.bashrc
fi
```

To set up these configurations on your system, follow one of the following methods:

### Use locally installed Node:
1. Install dependencies:
```sh
npm i
```

2. Run npm configuration script:
```sh
npm run configure
```

### Use Docker:
1. Build image:
```sh
docker build --pull --no-cache -t dotfiles .
```

2. Run container:
```sh
docker run --rm -it --name dotfiles -v $HOME:/host-home -e HOME=/host-home dotfiles
```

The installation process will prompt you for any necessary actions.
