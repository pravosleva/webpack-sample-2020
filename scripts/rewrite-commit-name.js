#!/usr/bin/env node
// See also https://tyapk.ru/blog/post/git-add-branch-name-to-commit-message
const fs = require('fs');
const child_process = require('child_process');
const { promisify } = require('util');
const { EOL } = require('os');

const exec = promisify(child_process.exec);
const appendFile = promisify(fs.appendFile);
const timeToWrite = 5000;
const commitEditmsgFile = process.env.HUSKY_GIT_PARAMS || process.argv[2]; // file '.git/COMMIT_EDITMSG'

cleanup();
main();

async function getCurrentBranch() {
  const branchOutput = await exec('git symbolic-ref --short HEAD');
  if (branchOutput.stderr) {
    throw new Error(stderr);
  }
  return branchOutput.stdout;
}

function existBranchNameInFile(file, branchName) {
  const message = fs.readFileSync(file, 'utf8');

  return message.includes(branchName);
}

function writeBranchNameToTitleInFile(branchName, file) {
  const message = fs.readFileSync(file, 'utf8');
  const lines = message.split(EOL);
  lines[0] = branchName + '. ' + lines[0];
  const newLines = lines.join(EOL);
  fs.writeFileSync(file, newLines, 'utf8');
}

function cleanup() {
  setTimeout(() => {
    console.log('Таймаут commit-msg hook ', timeToWrite);
    process.exit(1);
  }, timeToWrite);
}

async function main() {
  // let task = '';
  let branchName = '';

  try {
    branchName = await getCurrentBranch();
    if (existBranchNameInFile(commitEditmsgFile, branchName)) {
      console.log('В commit сообщении уже есть branchName');
      process.exit(0);
    }
  } catch (error) {
    console.log('Не удалось получить текущее значение branchName');
    console.error(error);
    process.exit(0);
  }
  try {
    writeBranchNameToTitleInFile(branchName, commitEditmsgFile);
  } catch(err) {
    console.log('Не удалось записать имя ветки', branchName, 'в commit-msg файл', commitEditmsgFile);
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
}
