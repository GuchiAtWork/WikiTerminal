const HTMLParser = require("node-html-parser");
const Section = require("./Section");
const inquirer = require("inquirer");
const WikiInput = require("./WikiInput");

class Article {
  #name;
  #sections = [];

  // which section to display when in Article section in terminal
  #sectionIndex = 0;

  // storing WikiInput instance so can return to main menu by invoking its method
  #mainmenu;
  constructor(name, wikires, mainmenu) {
    this.#name = name;
    this.createSections(wikires);
    this.#mainmenu = mainmenu;
  }

  get title() {
    return this.#name;
  }

  createSections(wikires) {
    // Part responsible for parsing wikipedia HTML content

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
        case "b":
        case "back":
          this.#sectionIndex = 0;
          this.#mainmenu.run();
          break;
        case "n":
        case "next":
          if (this.#sectionIndex + 1 >= this.#sections.length) {
            console.log("Can't go to next section!");
            this.presentArticle(false);
          } else {
            this.#sectionIndex++;
            this.presentArticle(true);
          }
          break;
        case "p":
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
  }

  showHelp() {
    console.log("\nback/b - go back to main menu");
    console.log("next/n - go to next section");
    console.log("prev/p - go to previous section\n");
  }
}

module.exports = Article;
