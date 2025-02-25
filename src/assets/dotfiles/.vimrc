colo slate                     " Set the color scheme to 'slate'
syntax on                      " Enable syntax highlighting
set number relativenumber      " Display line numbers and relative line numbers
set tabstop=4                  " Set tab size to 4 spaces
set softtabstop=4              " Set soft tab size to 4 spaces
set shiftwidth=4               " Set indentation size to 4 spaces
set expandtab                  " Use spaces for tabs
set smartindent                " Enable smart indentation
set hidden                     " Allow buffers to be hidden instead of closing them
set noerrorbells               " Disable error bells
set incsearch                  " Enable incremental search
set scrolloff=8                " Keep 8 lines visible above and below the cursor when scrolling
set signcolumn=yes             " Always show the sign column
set colorcolumn=80             " Highlight the 80th column
" Saves and closes all windows from normal mode
nnoremap <C-c> :wqa<CR>
" Saves and closes all windows from insert mode
inoremap <C-c> <Esc>:wqa<CR>
