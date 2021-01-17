const axios = require("axios");

/**
 * Class responsible for sending queries to Wikipedia API and returning results
 */
class WAfuncs {
  sendRequest(query) {
    // in case if multiple words are detected
    const noSpaceQuery = query.replace(" ", "_");

    const title =
      "https://en.wikipedia.org/api/rest_v1/page/mobile-sections/" +
      noSpaceQuery;
    return axios
      .get(title)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(`No search results for ${query}. Try again!`);
        return;
      });
  }
}

// Implemented singleton because multiple instances of this class is not useful
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
