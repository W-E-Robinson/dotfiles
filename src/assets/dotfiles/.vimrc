colo slate                     " Set the color scheme to 'slate'
syntax on                      " Enable syntax highlighting
set number relativenumber      " Display line numbers and relative line numbers
set tabstop=2                  " Set tab size to 2 spaces
set softtabstop=2              " Set soft tab size to 2 spaces
set shiftwidth=2               " Set indentation size to 2 spaces
set expandtab                  " Use spaces for tabs
set smartindent                " Enable smart indentation
set hidden                     " Allow buffers to be hidden instead of closing them
set noerrorbells               " Disable error bells
set incsearch                  " Enable incremental search
set scrolloff=8                " Keep 8 lines visible above and below the cursor when scrolling
set signcolumn=yes             " Always show the sign column
set colorcolumn=80             " Highlight the 80th column
nnoremap <C-c> :wqa<CR>
inoremap <C-c> <Esc>:wqa<CR>
