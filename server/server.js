const express = require("express");

//Express 앱 생성
const port = 3000;
const app = express();

const connectDB = require("./db/connectDB");
connectDB();

const middleware = require("./middleware/middleware");
middleware(app);

const mainRouter = require("./router/mainRouter");
app.use("/api/main", mainRouter);

// 서버 실행
app.listen(port, () => {
  console.log("🚀 서버 실행 중! http://localhost:3000");
});
