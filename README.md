<div align="center">

# 🛠️ dotfiles

**My personal dotfiles, plus a small interactive installer that writes them to your home directory.**

![Vim](https://img.shields.io/badge/Vim-019733?style=for-the-badge&logo=vim&logoColor=white)
![Bash](https://img.shields.io/badge/Bash-4EAA25?style=for-the-badge&logo=gnubash&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Homebrew](https://img.shields.io/badge/Homebrew-FBB040?style=for-the-badge&logo=homebrew&logoColor=black)

</div>

## 📦 What's included

All configs live in [`src/assets/dotfiles/`](src/assets/dotfiles):

| File         | Purpose                                  |
| ------------ | ---------------------------------------- |
| `.vimrc`     | Vim editor settings                      |
| `.bashrc`    | Bash aliases, functions and shell setup  |
| `.gitconfig` | Git configuration and aliases            |
| `Brewfile`   | Homebrew packages (`brew bundle`)        |

## ⚙️ How the installer works

1. You pick which dotfiles to install from a multi-select prompt (space to toggle, enter to confirm).
2. For each one, if a file already exists in `$HOME`, the installer shows a `diff` against the repo version and asks before overwriting. Identical files are skipped.
3. Missing files are written straight to `$HOME`.

Nothing is overwritten without your confirmation.

## 🚀 Installation

> **Requirements:** a POSIX system (macOS or Linux) with `diff` available. The `Brewfile` assumes [Homebrew](https://brew.sh); without it you'll need to install those packages another way.

### Option 1: Node

Requires Node.js 22+ (see [`.nvmrc`](.nvmrc); run `nvm use` if you use nvm).

```sh
npm ci
npm run configure
```

### Option 2: Docker

No local Node needed. Your home directory is mounted into the container so the files land in the right place.

```sh
docker build --pull --no-cache -t dotfiles .
docker run --rm -it --name dotfiles -v "$HOME":/host-home -e HOME=/host-home dotfiles
```

### After installing

**macOS:** login shells read `~/.bash_profile` rather than `~/.bashrc`, so source it from there:

```sh
if [ -f "$HOME/.bashrc" ]; then
    source "$HOME/.bashrc"
fi
```

**Homebrew packages:** if you installed the `Brewfile`, run:

```sh
brew bundle --file ~/Brewfile
```

## 🧑‍💻 Development

```sh
npm ci            # install dependencies
npm test          # run the Jest test suite
npm run lint      # lint with ESLint (npm run lint:fix to auto-fix)
npm run tsc       # compile to dist/
```

Project layout:

```
src/
├── index.ts               # entry point: dotfile selection prompt
├── utils/
│   ├── diff.ts            # wraps the system `diff` command
│   └── setUpDotfile.ts    # diff, confirm and write a single dotfile
└── assets/dotfiles/       # the dotfiles themselves
tests/                     # Jest tests and fixtures
```

To add a new dotfile, drop it in `src/assets/dotfiles/` and add its name to the `Dotfile` type and `dotfiles` list in [`src/index.ts`](src/index.ts).
