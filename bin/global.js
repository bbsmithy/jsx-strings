#!/usr/bin/env node

// Delete the 0 and 1 argument (node and script.js)
var args = process.argv.splice(process.execArgv.length + 2);

// Retrieve the first argument
var fileInput = args[0];
var outputFormat = args[1];
var fileOutput = args[2];

var jsxStrings = require('../lib/index.js');

jsxStrings.findTextContent(fileInput, outputFormat, fileOutput);
