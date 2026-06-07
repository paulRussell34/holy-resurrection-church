#!/bin/bash
# Run this script to commit and push all site changes to GitHub.
# GitHub Pages will automatically deploy from the main branch.
#
# Usage: bash deploy.sh
# Or make it executable once with: chmod +x deploy.sh
#          then run with:           ./deploy.sh

set -e

echo ""
echo "  Holy Resurrection - Deploy"
echo "  =========================="
echo ""

# Check for uncommitted changes
if git diff --quiet && git diff --cached --quiet; then
  echo "  No changes to deploy."
  exit 0
fi

# Show what's changing
git status --short

echo ""
read -p "  Commit message (or press Enter for auto): " msg

if [ -z "$msg" ]; then
  msg="Update site - $(date '+%Y-%m-%d %H:%M')"
fi

git add .
git commit -m "$msg"
git push origin main

echo ""
echo "  Done. Site will be live at your GitHub Pages URL in about 30 seconds."
echo ""
