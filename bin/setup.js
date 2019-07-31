const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const merge = require("deepmerge");
const shellExec = require("child_process").exec;
const Spinner = require("cli-spinner").Spinner;
const spinnerInstance = new Spinner("Installing dependencies...");
const questions = require("./questions");
const chalk = require("chalk");

const paths = {
  outputPath: process.cwd(),
  templates: path.join(__dirname, "../templates")
};

const copyAssetsContent = async tool => {
  const templates = path.join(__dirname, "../templates", tool);

  try {
    console.log("Copying library assets...");
    await fs.copy(templates, paths.outputPath);
  } catch (err) {
    console.error(err);
  }
};

const updatePackage = async (projectPackage, toolPackage) => {
  try {
    const mergedPackage = await merge.all([projectPackage, toolPackage]);

    await fs.writeFileSync(
      path.join(paths.outputPath, "package.json"),
      JSON.stringify(mergedPackage, null, 2)
    );
  } catch (err) {
    console.error(err);
  }
};

inquirer.prompt(questions).then(answers => {
  const { tool, packageAlready } = answers;

  const selectedTool = tool.toLowerCase();

  copyAssetsContent(selectedTool);

  if (packageAlready) {
    try {
      fs.readFileSync(path.join(paths.outputPath, "package.json"));
    } catch (err) {
      console.log(
        chalk.red(
          "Could not read package.json in project folder! Check if file exists"
        )
      );
      return;
    }
  }

  const projectPackage = packageAlready
    ? JSON.parse(fs.readFileSync(path.join(paths.outputPath, "package.json")))
    : { dependencies: {} };

  try {
    fs.readFileSync(
      path.join(paths.templates, `${selectedTool}/package-template.json`)
    );
  } catch (err) {
    console.log(
      chalk.red(
        "Could not read package-template.json file in the ${tool} folder!"
      )
    );
    return;
  }

  const toolPackage = JSON.parse(
    fs.readFileSync(
      path.join(paths.templates, `${selectedTool}/package-template.json`)
    )
  );

  updatePackage(projectPackage, toolPackage);

  spinnerInstance.start();
  shellExec("npm install", (err, stdout) => {
    console.log(stdout);

    fs.unlink(path.join(paths.outputPath, "package-template.json"));
    console.log(chalk.green("Setup finished!"));
  });

  spinnerInstance.stop();
});
