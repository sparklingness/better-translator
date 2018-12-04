// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate");

const handler = (req, res) => {
  const projectId = "new-better-trans-1543908842418";
  const translate = new Translate({
    projectId: projectId
  });

  const text = req.body.text;
  const target = req.body.target;

  translate
    .translate(text, target)
    .then(results => {
      const translation = results[0];

      // console.log(`Text: ${text}`);
      // console.log(`Translation: ${translation}`);

      res.end(translation);
    })
    .catch(err => {
      console.log(new Error(err));
    });
};

module.exports = handler;
