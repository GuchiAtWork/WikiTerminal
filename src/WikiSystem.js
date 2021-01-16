const WikiInput = require("./WikiInput");

class WSfuncs {
  constructor() {
    this.input = new WikiInput().getInstance();
  }

  start() {
    this.input.run();
  }
}

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
