# dotfiles

This repo contains my dotfiles for configuring Git, Bash, Neovim and Vim.

## Configurations
- (TO_DO) **.gitconfig**: The .gitconfig file contains configurations for Git.

- (TO_DO) **.bashrc**: The .bashrc file contains settings and configurations for the Bash shell.

- (TO_DO) **.config/nvim**: This directory contains configurations for Neovim, an improved version of Vim. Its configuration files reside in the .config/nvim directory.

- **.vimrc**: Configuration file for Vim editor settings.

Each configuration comes with a dedicated directory at the top level of the repository. Inside each directory, you'll find the respective dotfile alongside a README.md file providing additional information.

## Installation
To set up these configurations on your system, follow either of the following two methods:

### Use locally installed Node:
1. Install dependencies:

    ```sh
    npm i
    ```

2. Run npm configuration script:

    ```sh
    npm run configure
    ```

### Use Docker: (TO_DO)
1. Build the docker image:

    ```sh
    docker build -t dotfiles .
    ```

2. Run the container:

    ```sh
    docker run dotfiles
    ```

The installation will prompt you for any necessary actions and configurations.