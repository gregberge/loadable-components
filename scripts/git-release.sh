#!/usr/bin/env bash

set -e

BRANCH=$(git rev-parse --abbrev-ref HEAD)

yarn run lerna version --conventional-prerelease --preid from-git --no-git-tag-version --no-push --allow-branch $BRANCH --yes
git add .
git commit -m "Publish to git"

for DIR in $(yarn run -s lerna changed --parseable); do
  (
    VERSION=$(cat "${DIR}/package.json" | jq -r '.version')
    NAME=$(cat "${DIR}/package.json" | jq -r '.name')

    (
      cd "$DIR"
      yarn run prepublishOnly
    )
    yarn run npm-publish-git --dir "$DIR" --tag "${NAME}/${BRANCH}/${VERSION}"
  )
done
