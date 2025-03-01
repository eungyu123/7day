const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const MONGO_URL =
  "mongodb+srv://menteehubb:9jYyK3oSHNZEIYyk@pedometer-db.j1khp.mongodb.net/?retryWrites=true&w=majority&appName=pedometer-db";

const SSION_SECRET_KEY = "4322f881aceb9230d36d703f5cc2d953";
const TOKEN_TOKEN_SECRET_KEY =
  "h9UHuNsSUjYAHEAEFNrfZhqTFXTRUMyrArUZOfJCnqeTh1UqKXzRx5hpHAAgFBvUuZ/74cyVE2NnNxy+TJJ/Rw==";

const express = require("express");
const cors = require("cors");
const User = require("../db/models/User");
const jwt = require("jsonwebtoken");

const middleware = (app) => {
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // CORS
  // 이건 라이브러리
  // const corsOptions = {
  //   origin: 'http://localhost:5173',  // 클라이언트 도메인
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //   credentials: true,  // 쿠키를 포함하려면 true
  // };

  // app.use(cors(corsOptions));
  // 이건 수동 설정

  // 1️⃣ OPTIONS 요청에 대한 처리 (Preflight 요청)
  // app.options("*", (req, res) => {
  //   res.header("Access-Control-Allow-Origin", "https://localhost:5173");
  //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  //   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  //   res.header("Access-Control-Allow-Credentials", "true");
  //   return res.sendStatus(200); // OK 응답 후 종료
  // });

  // 2️⃣ 모든 요청에 대해 CORS 설정 추가
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

  // Cross-Origin-Opener-Policy (COOP)와 Cross-Origin-Embedder-Policy (COEP) 설정
  // app.use((req, res, next) => {
  //   res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  //   res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  //   next();
  // });

  // 세션스토어 일단 추가해둠
  app.use(
    session({
      secret: SSION_SECRET_KEY, // 보안을 위한 키
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

  app.use(async (req, res, next) => {
    // 헤더에서 쿠키로부터 'googleToken'을 가져옵니다.
    const token = req.cookies.googleToken;
    // '/api/auth'를 제외한 모든 경로는 로그인 필수
    const requiredLoginRegex = /^\/(?!api\/auth).*$/;

    // 로그인 필수 경로인데 토큰이 없는 경우
    if (requiredLoginRegex.test(req.url) && !token) {
      return res
        .status(401)
        .json({ type: "error", message: "로그인이 필요합니다." });
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, TOKEN_TOKEN_SECRET_KEY);
        const user = await User.findOne({ googleId: decoded.id });

        if (user) {
          req.user = user; // 사용자를 요청 객체에 추가
        } else {
          return res
            .clearCookie("googleToken")
            .status(404)
            .json({ type: "error", message: "사용자를 찾을 수 없습니다." });
        }
      } catch (error) {
        console.log("error", error);
        return res.clearCookie("googleToken").status(401).json({
          type: "error",
          message: "토큰이 유효하지 않습니다. 다시 로그인해주세요.",
        });
      }
    } else {
      // 토큰이 없는경우는 그냥 넘김
    }

    next();
  });
};

module.exports = middleware;
