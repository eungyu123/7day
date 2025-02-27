const cookieParser = require("cookie-parser");
const express = require("express");

const middleware = (app) => {
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use((req, res, next) => {
    next();
  });
};

module.exports = middleware;
