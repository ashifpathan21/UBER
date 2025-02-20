# Step 1: Stage all changes
git add .

# Step 2: Commit the changes
git commit -m "Update .gitignore and other fixes"

# Step 3: Set the remote if not already set (only needed once)
git remote add origin https://github.com/ashifpathan21/UBER.git

# Step 4: Push changes to the branch (replace 'main' with the correct branch name if needed)
git push -u origin main

# If you encounter errors such as push rejects due to remote changes, try:
git pull --rebase origin main
# Resolve any merge conflicts, then push again:
git push
