const express = require("express");

//Express 앱 생성
const port = 3000;
const app = express();

const connectDB = require("./db/connectDB");
connectDB();

const middleware = require("./middleware/middleware");
middleware(app);

const nameRouter = require("./router/nameRouter");
app.use("/api", nameRouter);

const mainRouter = require("./router/mainRouter");
const authRouter = require("./router/authRouter");
app.use("/api/main", mainRouter);
app.use("/api/auth", authRouter);

// 서버 실행
app.listen(port, () => {
  console.log("🚀 서버 실행 중! http://localhost:3000");
});
