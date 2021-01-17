const WikiAPI = require("./WikiAPI");
const Article = require("./Article");
const inquirer = require("inquirer");
const readline = require("readline");
const { RSA_X931_PADDING } = require("constants");

class WIfuncs {
  constructor() {
    this.articles = [];
    this.requester = new WikiAPI().getInstance();
  }

  run() {
    prompt([
      {
        name: "input",
        type: "input",
        message: "Enter command (type help for command list) (Main Menu):",
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
            const searchIndex = input.indexOf(" ") + 1;
            const title = input.slice(searchIndex).trim();
            const response = this.requester.sendRequest(title);
            this.createArticle(response);
            break;
          case "help":
            this.displayHelp();
            this.run();
            break;
          default:
            this.run();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // rl.question(
    //   "Enter command (type help for command list) (Main Menu): ",
    //   (answer) => {
    //     rl.close();

    //     const command = answer.split(" ")[0];
    //     switch (command) {
    //       case "stop":
    //         return;
    //       case "show":
    //         this.displayArticles();
    //         this.run();
    //         break;
    //       case "wiki":
    //         const searchIndex = answer.indexOf(" ") + 1;
    //         const title = answer.slice(searchIndex).trim();
    //         const response = this.requester.sendRequest(title);
    //         this.createArticle(response);
    //         break;
    //       case "help":
    //         this.displayHelp();
    //         this.run();
    //         break;
    //       default:
    //         this.run();
    //     }
    //   }
    // );
  }

  displayHelp() {
    console.log("\nstop - quit program");
    console.log("show - shows history of searched articles");
    console.log(
      "wiki (title of search) - attempts to find wikipedia article\n"
    );
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

  async createArticle(res) {
    const wikiArticle = await res;

    if (wikiArticle !== undefined) {
      const name = wikiArticle.lead.displaytitle;

      this.articles.push(new Article(name, wikiArticle));
    }

    this.run();
  }
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
