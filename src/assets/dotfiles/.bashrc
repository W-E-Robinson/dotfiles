alias c='clear'
alias ls='ls -l'

alias v='vim'
alias v.='vim .'

alias n='nvim'
alias n.='nvim .'

function gc () { # example call: gc "example commit message"
    last_commit_message=$(git log -1 --pretty=%B)

    if [[ "$last_commit_message" =~ WIP ]]; then
        echo "Last commit message contains 'WIP'. Aborting commit."
        return 1
    fi

    git commit -m "$1"
}

function gcb () { # example call: gcb "exampleBranch"
    git checkout -b $1
}

function curr_branch () {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'
}

function gca () {
    last_commit_message=$(git log -1 --pretty=%B)
    echo "Last commit message:"
    echo
    echo "$last_commit_message"
    echo

    while true; do
      read -p "Still want to amend?" yn
      if [ "$yn" = "" ]; then
        yn='Y'
      fi
      case $yn in
          [Yy] ) echo "Continuing amend."; break;;
          [Nn] ) echo "Aborting amend."; return 0;;
          * ) echo "Answer (y)es or (n)o.";;
      esac
    done

    git commit --amend
}

function merge_up_main () {
    export mainbranch='main'
    export currbranch=$(curr_branch)
    git switch $mainbranch && git pull && git switch $currbranch && git merge $mainbranch
}

function merge_up_develop () {
    export developbranch='develop'
    export currbranch=$(curr_branch)
    git switch $developbranch && git pull && git switch $currbranch && git merge $developbranch
}

function rebase_up_main () {
    export developbranch='main'
    export currbranch=$(curr_branch)
    git switch $developbranch && git pull && git switch $currbranch && git rebase $developbranch
}

function rebase_up_develop () {
    export developbranch='develop'
    export currbranch=$(curr_branch)
    git switch $developbranch && git pull && git switch $currbranch && git rebase $developbranch
}

function clean_branches () { # will delete branches that once existed remotely
    git remote prune origin && (git checkout main || git checkout master || exit 1) && git fetch --prune -q && git branch -vv | awk '/: gone]/{print $1}' | xargs -r git branch -D
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
export PATH="$HOME/.cargo/bin:$PATH"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export PATH="$PATH:$HOME/.local/bin"

# eval "$(luarocks path)"
export LUA_PATH="/usr/local/Cellar/luarocks/3.11.1/share/lua/5.4/?.lua;/usr/local/share/lua/5.4/?.lua;/usr/local/share/lua/5.4/?/init.lua;/usr/local/lib/lua/5.4/?.lua;/usr/local/lib/lua/5.4/?/init.lua;./?.lua;./?/init.lua;/Users/williamrobinson/.luarocks/share/lua/5.4/?.lua;/Users/williamrobinson/.luarocks/share/lua/5.4/?/init.lua;/usr/local/share/lua/5.4/?.lua"
export LUA_CPATH="/usr/local/lib/lua/5.4/?.so;/usr/local/lib/lua/5.4/loadall.so;./?.so;/Users/williamrobinson/.luarocks/lib/lua/5.4/?.so"
