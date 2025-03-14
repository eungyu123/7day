const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const MONGO_URL =
  "mongodb+srv://gudwns1423:gudwns10113@pedometer-db.hjqd5.mongodb.net/pedometer?retryWrites=true&w=majority&appName=pedometer-DB";

const SECRET_KEY = "4322f881aceb9230d36d703f5cc2d953";
const express = require("express");
const cors = require("cors");

const middleware = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // 프론트엔드 URL http://localhost:5173 허용
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
  app.use((req, res, next) => {
    next();
  });
};

module.exports = middleware;
