const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const MONGO_URL =
  "mongodb+srv://menteehubb:q3Q142AeBzH3r2eu@pedometer-db.j1khp.mongodb.net/?retryWrites=true&w=majority&appName=pedometer-db";

const SECRET_KEY = "4322f881aceb9230d36d703f5cc2d953";
const express = require("express");
const cors = require("cors");

const middleware = (app) => {
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // 프론트엔드 URL http://localhost:5173 허용
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));

  // 세션스토어 일단 추가해둠
  app.use(
    session({
      secret: SECRET_KEY, // 보안을 위한 키
      resave: false, // 변경이 없을 때 세션을 다시 저장할지 여부
      saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
      store: MongoStore.create({
        mongoUrl: MONGO_URL, // MongoDB URL
        collectionName: "sessions", // 세션이 저장될 컬렉션 이름
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1일 동안 유지
      },
    })
  );

  app.use((req, res, next) => {
    next();
  });
};

module.exports = middleware;
