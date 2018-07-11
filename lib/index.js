const fs = require('fs');
const GREEN = 'green';
const BLUE = 'blue';
const RED = 'red';

function findTextContent(fileInput, format, outputFile) {
  if (validateParams(fileInput, format)) {
    fs.readFile(fileInput, 'utf8', function(err, data) {
      if (err) throw err;
      printLine(`Searching file: ${fileInput} for strings`, BLUE);
      const { numberOfStringsFound, result } = searchForStrings(data);
      const formattedResult = formatResult(result, format);
      if (result !== null) {
        if (
          outputFile &&
          outputFile.split('.').pop() === 'json' &&
          format === 'json'
        ) {
          appendToFile(numberOfStringsFound, outputFile, formattedResult);
        } else {
          printLine(formattedResult);
        }
      } else {
        printLine('No matches found :(', RED);
      }
    });
  }
}

function validateParams(fileInput, format) {
  if (!fileInput || fileInput.split('.').pop() !== 'js') {
    printLine('Please select a js file to search through!', RED);
    return false;
  }
  if (format !== 'js' && format !== 'json') {
    printLine('Please select a valid output format option [js, json]', RED);
    return false;
  }
  return true;
}

function searchForStrings(file) {
  var jsonStringValue = {};
  let searchString = file.replace(/(\r\n\t|\n|\r\t)/gm, '');
  //searchString = searchString.replace(/\s/g, '');
  var matches = searchString.match(/>\w(.*?)<\//g);
  if (matches !== null) {
    for (var i = 0; i < matches.length; i++) {
      var stringValue = matches[i]
        .substring(1, matches[i].length - 2)
        .replace(/(\r\n\t|\n|\r\t|  )/gm, '');

      var key = toCamelCase(stringValue);
      jsonStringValue[key] = stringValue;
    }
    return {
      numberOfStringsFound: Object.keys(jsonStringValue).length,
      result: jsonStringValue
    };
  }
  return {
    numberOfStringsFound: 0,
    result: null
  };
}

function appendToFile(numberOfStringsFound, outputFile, result) {
  fs.appendFile(outputFile, result, function(err) {
    if (err) throw err;
    printLine(
      `${numberOfStringsFound} string(s) saved to file -> ${outputFile}`,
      GREEN
    );
  });
}

function formatResult(result, format) {
  if (format === 'js') {
    return result;
  }
  return JSON.stringify(result, null, 4);
}

function toCamelCase(str) {
  return str
    .split(' ')
    .slice(0, 4)
    .map(function(word, index) {
      // If it is the first word make sure to lowercase all the chars.
      if (index == 0) {
        return word.toLowerCase();
      }
      // If it is not the first word only upper case the first char and lowercase the rest.
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

function printLine(message, color) {
  switch (color) {
    case GREEN: {
      console.log('\x1b[1m', '\x1b[32m', message, '\x1b[0m');
      break;
    }
    case BLUE: {
      console.log('\x1b[1m', '\x1b[36m', message, '\x1b[0m');
      break;
    }
    case RED: {
      console.log('\x1b[1m', '\x1b[31m', message, '\x1b[0m');
      break;
    }
    default:
      console.log('\x1b[1m', '\x1b[40m', message, '\x1b[0m');
      break;
  }
}

exports.findTextContent = findTextContent;
