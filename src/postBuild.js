const fs = require("fs");
const address = `${__dirname}/../package.json`;
const package = require(address);
let versions = package.version.split(".").map((v) => parseInt(v, 10));
versions[2] += 1;
package.version = versions.join(".");

fs.writeFile(address, JSON.stringify(package, undefined, 4), () => {
  console.log(`updated package.json! Current Version: ${versions.join('.')}`);
  doLater();
});

function doLater() {
  fs.readFile(`${__dirname}/index.ts`, function (err, data) {
    fs.writeFile(`${__dirname}/../dist/index.ts`, data, function (err) {
      if (err) {
        console.log("there was an error");
        console.log(err);
      } else {
        console.log("copied index.ts!");
      }
    });
  });

  fs.readFile(`${__dirname}/../package.json`, function (err, data) {
    fs.writeFile(`${__dirname}/../dist/package.json`, data, function (err) {
      if (err) {
        console.log("there was an error");
        console.log(err);
      } else {
        console.log("copied package.json");
      }
    });
  });
}
