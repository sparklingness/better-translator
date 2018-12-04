const express = require("express");
const path = require("path");
const app = express();

// Unsplash authentication
app.get("/better", (req, res) => {
  res.send("Hello Better Translator !!!");
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`[+] My Unsplash Application server listening on ${port}`);
});
