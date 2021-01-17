const WikiInput = require("./WikiInput");

/**
 * The core of the program; essentially what allows it to run
 */
class WSfuncs {
  constructor() {
    this.input = new WikiInput().getInstance();
  }

  start() {
    this.input.run();
  }
}

// Implemented singleton because there should not be multiple instances of WikiSystem class
class WikiSystem {
  constructor() {
    if (!WikiSystem.instance) {
      WikiSystem.instance = new WSfuncs();
    }
  }

  getInstance() {
    return WikiSystem.instance;
  }
}

module.exports = WikiSystem;
