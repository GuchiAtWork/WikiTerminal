const WikiSystem = require("./src/WikiSystem");

// Creating single prompt object - will not create multiple prompt object
const inquirer = require("inquirer");
global.prompt = inquirer.createPromptModule();

const system = new WikiSystem().getInstance();

system.start();
