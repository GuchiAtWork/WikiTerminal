const axios = require("axios");

class WAfuncs {
  sendRequest(query) {
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
