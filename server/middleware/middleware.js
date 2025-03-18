const cookieParser = require("cookie-parser");

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
