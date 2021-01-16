const WikiAPI = require("./WikiAPI");
const Article = require("./Article");
const inquirer = require("inquirer");

class WIfuncs {
  constructor() {
    this.articles = [];
    this.requester = new WikiAPI().getInstance();
  }

  run() {
    inquirer
      .prompt([
        {
          name: "input",
          type: "input",
          message: "Enter command (type help for command list)",
        },
      ])
      .then((answers) => {
        const input = answers.input;
        const command = input.split(" ")[0];

        switch (command) {
          case "stop":
            return;
          case "show":
            this.displayArticles();
            this.run();
            break;
          case "wiki":
            this.requester.sendRequest(input.split(" ")[1]);
            break;
          case "help":
            this.displayHelp();
            break;
          default:
            this.run();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  displayHelp() {
    console.log("stop - quit program");
    console.log("show - shows history of searched articles");
    console.log("wiki (title of search) - attempts to find wikipedia article");
  }

  displayArticles() {
    if (this.articles.length === 0) {
      console.log("No articles in history. Try searching!");
      return;
    }

    for (let i = 0; i < this.articles.length; i++) {
      console.log(`${i}: ${this.articles[i].name()}`);
    }
  }

  createArticle() {}
}

class WikiInput {
  constructor() {
    if (!WikiInput.instance) {
      WikiInput.instance = new WIfuncs();
    }
  }

  getInstance() {
    return WikiInput.instance;
  }
}

module.exports = WikiInput;
