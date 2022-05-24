const app = require("express")();
const morgan = require("morgan");
const routers = require("./router");
const express = require("express");
const { Server } = require("http");
const allowCrossOrigin = require("./middlewares/allowCrossOrigin");
const db = require("./db");

module.exports = async () => {
  await db();
  const app = express();
  app.use(allowCrossOrigin);
  app.use(morgan("dev"));
  routers(app);
  return Server(app);
};
