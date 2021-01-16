const axios = require("axios");
const HTMLParser = require("node-html-parser");

// WAY TO GET TEXT FROM HTML
// axios
//   .get("https://en.wikipedia.org/api/rest_v1/page/mobile-sections/pet_door")
//   .then((res) => {
//     // needed to get summary
//     console.log(res.data.lead.sections[0]);

//     const test = res.data.remaining.sections[0];
//     const test1 = HTMLParser.parse(test.text);
//     const test2 = test1.querySelectorAll("p");
//     let text = "";
//     for (let childNode of test2[0].childNodes) {
//       if (childNode.rawText) {
//         text += childNode.rawText;
//       }
//     }
//     console.log(text);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const WikiSystem = require("./src/WikiSystem");

const system = new WikiSystem().getInstance();

system.start();
