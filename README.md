# dotfiles

This repo contains my dotfiles and scripting to write them on to a system.

## Configurations
- **.vimrc**: Configuration file for Vim editor settings.
- **.bashrc**: Configuration file for Bash commands.
- **.gitconfig**: Configuration file for Git.

## Installation
To set up these configurations on your system, follow the following method:

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
