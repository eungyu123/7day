const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const MONGO_URL =
  "mongodb+srv://gudwns1423:gudwns10113@pedometer-db.hjqd5.mongodb.net/pedometer?retryWrites=true&w=majority&appName=pedometer-DB";

const SECRET_KEY = "4322f881aceb9230d36d703f5cc2d953";
const express = require("express");

const middleware = (app) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // 프론트엔드 URL http://localhost:5173 허용
};

module.exports = middleware;
