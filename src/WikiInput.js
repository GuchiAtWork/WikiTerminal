const WikiAPI = require("./WikiAPI");
const Article = require("./Article");
const inquirer = require("inquirer");
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
          case "q":
          case "stop":
            return;
          case "s":
          case "show":
            this.displayArticles();
            this.run();
            break;
          case "w":
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
          case "a":
          case "access":
            const numberIndex = input.indexOf(" ") + 1;
            const index = parseInt(input.slice(numberIndex).trim());
            if (isNaN(index) || index + 1 > this.articles.length) {
              console.log("Insert only a reachable number after access please");
              this.run();
            } else {
              this.articles[index].presentArticle(true);
            }
            break;
          case "p":
          case "prev":
            if (this.articles.length >= 1) {
              this.articles[this.articles.length - 1].presentArticle(true);
            } else {
              console.log("Search a article first before using this feature!");
              this.run();
            }
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
    console.log("\nstop/q - quit program");
    console.log("show/s - shows history of searched articles");
    console.log(
      "access/a (index of article) - access previously searched article"
    );
    console.log("prev/p - access last article searched");
    console.log(
      "wiki/w (title of search) - attempts to find wikipedia article\n"
    );
  }

  displayArticles() {
    if (this.articles.length === 0) {
      console.log("No articles in history. Try searching!");
      return;
    }

    console.log("\n");
    for (let i = 0; i < this.articles.length; i++) {
      console.log(`${i}: ${this.articles[i].title}`);
    }
    console.log("\n");
  }

  async createArticle(res) {
    const wikiArticle = await res;

    if (wikiArticle !== undefined) {
      const name = wikiArticle.lead.displaytitle;

      this.articles.push(new Article(name, wikiArticle, this));
    }
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
