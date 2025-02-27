const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const MONGO_URI =
  "mongodb+srv://menteehubb:zPw5HzlAC3bSqKqR@cluster0.j1khp.mongodb.net/blog";
const SECRET_KEY = "4322f881aceb9230d36d703f5cc2d953";

const middleware = (app) => {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // 세션스토어
  app.use(
    session({
      secret: SECRET_KEY, // 보안을 위한 키
      resave: false, // 변경이 없을 때 세션을 다시 저장할지 여부
      saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
      store: MongoStore.create({
        mongoUrl: MONGO_URI, // MongoDB URL
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
