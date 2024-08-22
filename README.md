# dotfiles

This repo contains my dotfiles and scripting to write them on to a system.

## Configurations
- **.vimrc**: Configuration file for Vim editor settings.

## Installation (only works for POSIX currenty)
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
2. Build image:
```sh
docker build --pull --no-cache -t dotfiles .
```

3. Run container:
```sh
docker run --rm -it --name dotfiles -v $HOME:/host-home -e HOME=/host-home dotfiles
```

The installation process will prompt you for any necessary actions.
