alias v='vim'
alias v.='vim .'

alias n='nvim'
alias n.='nvim .'

function gps () {
    git fetch && git push
}

function gc () { # example call: gc "example commit message"
    git commit -m "$1"
}

function gcb () { # example call: gcb "exampleBranch"
    git checkout -b $1
}

function curr_branch () {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'
}

function up_w_main () {
    export mainbranch='main'
    export currbranch=$(curr_branch)
    git switch $mainbranch && git pull && git switch $currbranch && git merge $mainbranch
}

function up_w_develop () {
    export developbranch='develop'
    export currbranch=$(curr_branch)
    git switch $developbranch && git pull && git switch $currbranch && git merge $developbranch
}

function begin_bisect () { # example call: begin_bisect 6f35f8c
    clear && git bisect start && git bisect bad && git bisect good $1
}

function grep_log () { # example call: grep_log "node"
    clear && git log --all -i --no-merges --pretty=medium --source --name-only --grep="$1"
}

function glog_full () {
    clear && git log --oneline --graph
}

function glog_dev () {
    export developbranch='develop'
    export currbranch=$(curr_branch)
    clear && git fetch && git log --oneline $developbranch...$curr_branch
}

function glog_main () {
    export mainbranch='main'
    export currbranch=$(curr_branch)
    clear && git fetch && git log --oneline $mainbranch...$curr_branch
}

function output_reflog () {
    git reflog * > ./output_reflog.txt
}

. "$HOME/.cargo/env"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
