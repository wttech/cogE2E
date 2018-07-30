#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const merge = require('deepmerge')
const shellExec = require('child_process').exec;

const Spinner = require('cli-spinner').Spinner;
const spinnerInstance = new Spinner('Installing dependencies...');

const paths = {
  outputPath: process.cwd(),
  templates: path.join(__dirname, "../templates")
};

const questions = [
  {
    type: 'list',
    name: 'tool',
    message: 'What tool do you need?',
    choices: ['Puppeteer', 'Protractor']
  },
  {
    type: 'confirm',
    name: 'packageAlready',
    message: `Do you have package.json file already?`
  }, {
    type: 'confirm',
    name: 'update',
    message: `Update package.json file with tool dependencies?`,
    when: (answers) => answers.packageAlready
  },
  {
    type: 'input',
    name: 'destinationPath',
    message: 'Where should tool files be copied to? (Default is current location)'
  }
];

const copyAssetsContent = async (tool, destinationPath) => {
  const templates = path.join(__dirname, "../templates", tool);
  const copyPath = destinationPath.length ? path.join(paths.outputPath, `${destinationPath}/`) : paths.outputPath;

  try {
    console.log('Copying library assets...');
    await fs.copy(templates, copyPath);
  } catch (err) {
    console.error(err);
  }
};

const updatePackage = async (projectPackage, toolPackage) => {
  try {
    const mergedPackage = await merge.all([projectPackage, toolPackage]);

    await fs.writeFileSync(path.join(paths.outputPath, 'package.json'),JSON.stringify(mergedPackage, null, 2));
  } catch (err) {
    console.error(err);
  }
}

inquirer.prompt(questions).then(answers => {
  const {tool, packageAlready, update, destinationPath} = answers;

  copyAssetsContent(tool, destinationPath);

  if (update) {
    const projectPackage = packageAlready ?
      JSON.parse(fs.readFileSync(path.join(paths.outputPath, 'package.json'))) :
      { "dependencies": {} };

    if (!projectPackage && packageAlready) {
      console.error('Could not read package.json in project folder! Check if file exists');
      return;
    }

    const toolPackage = JSON.parse(fs.readFileSync(path.join(paths.templates, `${tool}/packageTemplate.json`)))

    if (!toolPackage) {
      console.error(`Could not read package.json in ${tool} folder!`);
      return;
    }
    updatePackage(projectPackage, toolPackage);
  }

  spinnerInstance.start();
  shellExec("npm install", (err, stdout) => console.log(stdout) || fs.unlink(path.join(paths.outputPath, 'packageTemplate.json')));

  spinnerInstance.stop();
});