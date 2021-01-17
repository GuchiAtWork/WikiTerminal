const HTMLParser = require("node-html-parser");
const Section = require("./Section");
const inquirer = require("inquirer");
const readline = require("readline");

class Article {
  #name;
  #sections = [];
  #sectionIndex = 0;
  constructor(name, wikires) {
    this.#name = name;
    this.createSections(wikires);
  }

  get title() {
    return this.#name;
  }

  createSections(wikires) {
    const summaryHTML = wikires.lead.sections[0].text;
    const summaryParser = HTMLParser.parse(summaryHTML);
    const summaryElements = summaryParser.querySelectorAll("p, li");

    let summaryText = "";

    for (const node of summaryElements) {
      if (node.rawTagName === "li") {
        summaryText += "\n -";
      }
      for (const childNode of node.childNodes) {
        if (childNode.rawText) {
          summaryText += childNode.rawText;
        }
      }
    }

    this.#sections.push(new Section("Summary", summaryText));

    const allSections = wikires.remaining.sections;

    for (const section of allSections) {
      if (section.line === "References") {
        continue;
      }

      const sectionHTML = section.text;
      const sectionParser = HTMLParser.parse(sectionHTML);
      const sectionElements = sectionParser.querySelectorAll("p, li");

      let sectionTitle = section.line;
      let sectionText = "";

      for (const node of sectionElements) {
        if (node.rawTagName === "li") {
          sectionText += "\n -";
        }
        for (const childNode of node.childNodes) {
          if (childNode.rawText) {
            sectionText += childNode.rawText;
          }
        }
      }

      if (sectionText === "") {
        continue;
      }

      this.#sections.push(new Section(sectionTitle, sectionText));
    }

    this.presentArticle(true);
  }

  showSection(index) {
    const section = this.#sections[index];
    const title = "\n---" + section.title + "---";
    console.log(title);
    console.log("\n");
    console.log(section.data);
    console.log("\n");
  }

  presentArticle(showSectionBool) {
    if (showSectionBool) {
      this.showSection(this.#sectionIndex);
    }

    prompt([
      {
        name: "uinput",
        type: "input",
        message: "Enter command (type help if needed) (Article):",
      },
    ]).then((answers) => {
      const command = answers.uinput;

      switch (command) {
        case "help":
          this.showHelp();
          this.presentArticle(false);
          break;
        case "back":
          this.#sectionIndex = 0;
          break;
        case "next":
          if (this.#sectionIndex + 1 > this.#sections.length) {
            console.log("Can't go to next section!");
            this.presentArticle(false);
          } else {
            this.#sectionIndex++;
            this.presentArticle(true);
          }
          break;
        case "prev":
          if (this.#sectionIndex - 1 < 0) {
            console.log("Can't go back!");
            this.presentArticle(false);
          } else {
            this.#sectionIndex--;
            this.presentArticle(true);
          }
          break;
        default:
          this.presentArticle(false);
      }
    });

    // rl.question("Enter command (type help if needed) (Article): ", (answer) => {
    //   rl.close();

    //   const command = answer;

    //   switch (command) {
    //     case "help":
    //       this.showHelp();
    //       this.presentArticle(false);
    //       break;
    //     case "back":
    //       this.#sectionIndex = 0;
    //       break;
    //     case "next":
    //       if (this.#sectionIndex + 1 > this.#sections.length) {
    //         console.log("Can't go to next section!");
    //         this.presentArticle(false);
    //       } else {
    //         this.#sectionIndex++;
    //         this.presentArticle(true);
    //       }
    //       break;
    //     case "prev":
    //       if (this.#sectionIndex - 1 < 0) {
    //         console.log("Can't go back!");
    //         this.presentArticle(false);
    //       } else {
    //         this.#sectionIndex--;
    //         this.presentArticle(true);
    //       }
    //       break;
    //     default:
    //       this.presentArticle(false);
    //   }
    // });
  }

  showHelp() {
    console.log("Test");
  }
}

module.exports = Article;
