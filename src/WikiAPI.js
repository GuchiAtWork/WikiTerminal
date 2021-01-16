class WAfuncs {
  sendRequest(query) {
    console.log(query);
  }
}

class WikiAPI {
  constructor() {
    if (!WikiAPI.instance) {
      WikiAPI.instance = new WAfuncs();
    }
  }

  getInstance() {
    return WikiAPI.instance;
  }
}

module.exports = WikiAPI;
