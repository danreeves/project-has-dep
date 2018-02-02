#!/usr/bin/env node

const getNearestPkg = require("read-pkg-up");
const chalk = require("chalk");

const args = process.argv.slice(2);
const { pkg } = getNearestPkg.sync();

const inDeps = args.every(packageName => {
  try {
    return Object.keys(pkg.dependencies).includes(packageName);
  } catch (error) {
    return false;
  }
});
const inDevDeps = args.every(packageName => {
  try {
    return Object.keys(pkg.devDependencies).includes(packageName);
  } catch (error) {
    return false;
  }
});
const inPeerDeps = args.every(packageName => {
  try {
    return Object.keys(pkg.peerDependencies).includes(packageName);
  } catch (error) {
    return false;
  }
});

if (inDeps || inDevDeps || inPeerDeps) {
  console.log(chalk.green("✔︎"));
  process.exit(0);
} else {
  console.log(chalk.red("✘"));
  process.exit(1);
}
