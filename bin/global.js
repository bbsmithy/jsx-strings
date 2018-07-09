#!/usr/bin/env node

// Delete the 0 and 1 argument (node and script.js)
var args = process.argv.splice(process.execArgv.length + 2);

// Retrieve the first argument
var fileInput = args[0];
var fileOutput = args[1];

var jsxStrings = require("../lib/index.js");

jsxStrings.testFunc(fileInput);
