const express = require("express");
const path = require("path");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");

const translateHandler = require("./translateHandler");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/build")));
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("[+] Morgan enabled.");
}

// API
app.post("/translate", translateHandler);

app.get("/better", (req, res) => {
  res.send("Hello Better Translator !!!");
});

// Serve React frontend.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`[+] Better Translator Application server listening on ${port}`);
});
