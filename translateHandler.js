const axios = require("axios");
// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate");
const querystring = require("querystring");

require("dotenv").config();

const handler = (req, res) => {
  const { type, text, target } = req.body;

  if (type === "GOOGLE") {
    const projectId = "new-better-trans-1543908842418";
    const translate = new Translate({
      projectId: projectId
    });

    translate
      .translate(text, target)
      .then(results => {
        const translation = results[0];

        console.log(`Text: ${text}`);
        console.log(`Translation: ${translation}`);

        res.end(translation);
      })
      .catch(err => {
        console.log(new Error(err));
      });
  } else if (type === "PAPAGO") {
    console.log("[+] PAPAGO :", process.env.PAPAGO_CLIENT_ID);
    console.log("[+] PAPAGO :", process.env.PAPAGO_CLIENT_SECRET);

    axios({
      url: "https://openapi.naver.com/v1/papago/n2mt",
      method: "post",
      data: querystring.stringify({
        source: "en",
        target: target,
        text: text
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Naver-Client-Id": process.env.PAPAGO_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.PAPAGO_CLIENT_SECRET
      }
    })
      .then(results => {
        console.log(results.data);
        // res.end(results.data);
        res.end(JSON.stringify(results.data));
      })
      .catch(err => {
        console.log(new Error(err));
        res.status(400).send(err);
      });
  }
};

module.exports = handler;
