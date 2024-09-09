#!/bin/bash

# Configuration
PROJECT_DIR="."  # Update with your project path
NUM_COMMITS=20  # Number of commits you want to create
FILE_NAME="file.txt"  # Example file to modify for each commit

# Navigate to project directory
cd "$PROJECT_DIR" || { echo "Directory not found: $PROJECT_DIR"; exit 1; }

# Initialize Git repository if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "Initialized a new Git repository"
fi

# Create or modify the file for commits
if [ ! -f "$FILE_NAME" ]; then 
    touch "$FILE_NAME"
fi

# Create multiple commits
for (( i=1; i<=NUM_COMMITS; i++ )); do
    # Create or modify files to ensure there is something to commit
    echo "Commit number $i" >> "$FILE_NAME"

    # Stage changes
    git add "$FILE_NAME"

    # Commit changes
    git commit -m "feat:$$FILE_NAME "

    echo "Committed: Commit number $i"
done
git add .
git commit -m "upadates & bug fixes"
# Optional: Push to remote repository
# Uncomment and update with your remote repository URL
git remote add origin  git@github.com:glennin-codes/comradesbiz-apps.git
 git push -u origin master

echo "All $NUM_COMMITS commits completed!"
