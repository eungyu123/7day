const express = require("express");
const fs = require("fs");
const https = require("https");
const path = require("path");

const port = 3000;
// const port_production = 443;

const app = express();

const connectDB = require("./db/connectDB");
connectDB();

const seed = require("./db/seed");
seed.seedDummyWalks();

const middleware = require("./middleware/middleware");
middleware(app);

const mainRouter = require("./router/mainRouter");
const authRouter = require("./router/authRouter");
app.use("/api/main", mainRouter);
app.use("/api/auth", authRouter);

// app.use(express.static(path.join(__dirname, "dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

// 인증서 파일 경로 쿠키설정을 위해서 cors 설정 때문에 해야함
const privateKey = fs.readFileSync("./ssl-certs/serverkey.pem", "utf8");
const certificate = fs.readFileSync("./ssl-certs/servercert.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

// HTTPS 서버 설정
https.createServer(credentials, app).listen(port, () => {
  console.log(`🚀 HTTPS 서버가 실행 중: https://localhost:${port}`);
});
