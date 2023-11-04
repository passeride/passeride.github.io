---
layout: post
title:  Syncing arch packages
date:   2023-11-04 09:05:15 +0100
---

I have multiple machines, and don't keep track of what i download on them, I'm not concious while troubleshooting, just throwing everyting at the wall and seeing what sticks.

But I don't want to do that again on my laptop or server, so i created a short script to hopefully help me sync between devices.
Beware, i did brick my machine during the testing of this, cause i uninstalled linux and was having a hard time booting after that ;) Enjoy.


# Save Repos
``` bash
#! /bin/bash

update_package_list() {
    local filename=$1
    local scriptpath=$(
        cd -- "$(dirname "$0")" >/dev/null 2>&1
        pwd -P
    )
    local tmp_file="/tmp/$filename"
    local tmp_prev_file="/tmp/$filename.bak"
    local dest_file="$scriptpath/$filename"
    local get_list_command=$2

    # Ensure we don't overwrite files unexpectedly
    set -o noclobber

    # Ensure $dest_file exists
    touch "$dest_file"

    # Back up the current list
    cp "$dest_file" "$tmp_prev_file" 2>/dev/null || {
        echo "Could not backup the destination file."
        return 1
    }

    # Generate the new list
    eval "$get_list_command" >|"$tmp_file" 2>/dev/null || {
        echo "Could not generate the package list."
        return 1
    }

    # diff_pkg="$(comm -13 <(sort "$tmp_file") <(sort "$dest_file"))"
    # echo $diff_pkg
    diff_pkg="$(comm -13 <(sort "$dest_file") <(sort "$tmp_file"))"

    # If there are new packages to be installed
    if [ -n "$diff_pkg" ]; then
        echo "The following packages will be added to the list:"
        echo "$diff_pkg"
        read -p "Do you want to proceed? (yes/no) " yn

        case $yn in
            yes)
                echo "Proceeding..."
                ;;
            no)
                echo "Exiting..."
                # Clean up
                rm -f "$tmp_file" "$tmp_prev_file"
                return
                ;;
            *)
                echo "Invalid response"
                return 1
                ;;
        esac
    fi

    # Combine old and new lists, sort them, and remove duplicates
    sort "$tmp_prev_file" "$tmp_file" | uniq >|"$dest_file" 2>/dev/null || {
        echo "Could not update the destination file."
        return 1
    }

    if [ -n "$diff_pkg" ]; then
        echo "Package list updated successfully. > $filename"
    else
        echo "No changes detected."
    fi
    # Clean up
    rm -f "$tmp_file" "$tmp_prev_file"

}

echo "Updating package lists..."
echo "Updating Arch package list..."
update_package_list "ArchRepos.txt" "pacman -Qqen"
echo "Updating AUR package list..."
update_package_list "AurRepos.txt" "yay -Qqem"
```

# Load Repos
``` bash 
 #! /bin/bash


RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color
check_and_execute() {
    # Function to check the differences between a local file and a temp file
    # and execute a custom command if differences are found

    local filename=$1
    local custom_command=$2
    local install_command=$3
    # local pacman_
    local scriptpath=$(
        cd -- "$(dirname "$0")" >/dev/null 2>&1
        pwd -P
    )
    local tmp_file="/tmp/$filename"
    local tmp_prev_file="/tmp/$filename.bak"
    local dest_file="$scriptpath/$filename"

    # Assuming the command to generate the file content is passed as second argument
    eval "$custom_command" >"$tmp_file"

    # Check differences for packages that should be installed
    diff_pkg="$(comm -13 <(sort "$tmp_file") <(sort "$dest_file"))"

    # Check differences for packages that should be uninstalled
    uninstall_pkg="$(comm -13 <(sort "$dest_file") <(sort "$tmp_file"))"

    # If there are new packages to be installed
    if [ -n "$diff_pkg" ] || [ -n "$uninstall_pkg" ]; then

        if [ -n "$diff_pkg" ]; then
            echo "✔The following packages will be added: \n\n"
            printf "${GREEN}$diff_pkg${NC}\n"
        fi

        if [ -n "$uninstall_pkg" ]; then
            echo "❌ The following packages will be Removed: \n\n"
            printf "${RED}$uninstall_pkg${NC}\n"
        fi
        read -p "Do you want to proceed with installation and uninstallation? (yes/no/only_add) " yn

        case $yn in
            yes)
                echo "Proceeding with install and remove..."
                case $pacman_or_yay in
                  p)
                    sudo pacman -Rsu $(comm -23 <(pacman -Qqen | sort) <(sort $scriptpath/$filename))
                    ;;
                  y)
                    sudo yay -Rsu $(comm -23 <(yay -Qqem | sort) <(sort $scriptpath/$filename))
                    ;;
                esac
                ;;

            only_add)
                echo "Proceeding with install only..."
                eval "$install_command" <"$scriptpath/$filename"
                ;;
            no)
                echo "Exiting..."
                # Clean up
                rm -f "$tmp_file" "$tmp_prev_file"
                return
                ;;
            *)
                echo "Invalid response"
                return 1
                ;;
        esac
    fi

    # If there were changes, execute the custom command
    if [ -n "$diff_pkg" ] || [ -n "$uninstall_pkg" ]; then
        echo "Syncing Installing"
        eval "$install_command" <"$scriptpath/$filename" 2>/dev/null
    else
        echo "No changes detected."
    fi

    # Clean up
    rm -f "$tmp_file" "$tmp_prev_file"
}

echo "Checking Ach Repos"
check_and_execute "ArchRepos.txt" "pacman -Qqen" "sudo pacman -S --needed -" "p"
echo "Checking Aur Repos"
check_and_execute "AurRepos.txt" "yay -Qqem" "yay -S --noconfirm --needed -" "y"
```

# Possible fixing for future
I found out that giving Pacman everything, ment that it sometimes did not download in the right order, and one single typo would stop the whole operation, as well as automaticly removing stuff is dangerous.

This line seems to help with not stopping on typos
```bash
cat ArchRepos.txt | xargs -I % sudo pacman -S --noconfirm %
```

And for doing dangerous things, i think a better aproach is to generate a script and mabye force the user to copy paste it into the terminal, giving them time to discover if it does something very wierd.
