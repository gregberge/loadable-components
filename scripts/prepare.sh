#!/usr/bin/env bash

set -xe

echo "building example"
(cd "$( dirname "${BASH_SOURCE[0]}" )/../examples/server-side-rendering" && yarn && yarn build)

echo "generating fixtures"
(cd "$( dirname "${BASH_SOURCE[0]}" )" && node ./copy-stats-fixture.js)

echo "done"