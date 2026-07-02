
require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || "development";
const APP_NAME = process.env.APP_NAME || "Todo Jenkins Lab";

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/config", (req, res) => {
  res.json({
    appEnv: APP_ENV,
    appName: APP_NAME,
    port: PORT,
  });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`[${APP_ENV}] ${APP_NAME} lancé sur http://localhost:${PORT}`);
});
