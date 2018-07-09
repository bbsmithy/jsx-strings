function testFunc(fileInput) {
  // Read the file and print its contents.
  var fs = require("fs");
  fs.readFile(fileInput, "utf8", function(err, data) {
    if (err) throw err;
    console.log("OK: " + fileInput);
    console.log(data);
  });
}

exports.testFunc = testFunc;
