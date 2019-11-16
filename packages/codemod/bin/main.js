#!/usr/bin/env node

/* eslint-disable no-console */
const yargs = require('yargs');
const execa = require('execa');
const path = require('path');
const fs = require('fs');
const CodemodError = require('./utils/CodemodError');

const jscodeshiftExecutable = require.resolve('.bin/jscodeshift');
const transformsDir = path.resolve(__dirname, '../transforms');

const { argv } = yargs;

try {
  const selectedCodemod = argv._[0];
  const directoryToApplyTo = argv._[1];

  if (!selectedCodemod || !directoryToApplyTo) {
    throw new CodemodError({
      type: 'Invalid params'
    });
  }

  const availableTransforms = fs.readdirSync(transformsDir);

  if (!availableTransforms.some(t => t === selectedCodemod)) {
    throw new CodemodError({
      type: 'Unrecognised transform',
      payload: selectedCodemod,
    });
  }
  /**
   * We need to run the following
   * 
   * jscodeshift --parser babylon -t ./packages/lite-codegen/codemod/upgrade-loadable-component/jscodeshift.js
   */ 

  const result = execa.sync(jscodeshiftExecutable, [
    '--parser babylon',
    `-t ${transformsDir}/${selectedCodemod}/index.js`,
  ], {
    stdio: 'inherit',
    stripEof: false
  });

  if (result.error) {
    throw result.error;
  }

} catch (err) {
  if (err.type === 'Invalid params') {
    console.error('Invalid params passed!');
    console.error('@loadable/codemod requires 2 params to be passed, the name of the codemod, and a directory to apply the codemod to.');
    console.error('Example: npx run @loadable/codemod react-loadable-to-loadable-component ./src/client');

    process.exit(1);
  } 

  if (err.type === 'Unrecognised transform') {
    console.error(`Unrecognised transform passed: '${err.payload}'`);

    process.exit(1);
  } 

  // For other errors, just re-throw it
  throw err;
}
