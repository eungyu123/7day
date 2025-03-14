const express = require("express");
const cors = require("cors");
const fs = require("fs"); 
const https = require("https");
// 67c7ab335f743adc8dc272a3
//Express 앱 생성
const port = 3000;
const app = express();
const path = require("path");

const connectDB = require("./db/connectDB");

connectDB();

const middleware = require("./middleware/middleware");
middleware(app);

app.use("/image", express.static("image"));

const seedTrail = require("./db/seed/seedTrail");
const seedAll = require("./db/seed/seedAll");
// seedTrail.createSampleData1();
// seedAll.seedAll();

const mainRouter = require("./router/mainRouter");
app.use("/", mainRouter);

const authRouter = require("./router/authRouter");
app.use("/auth", authRouter);

const userRouter = require("./router/userRouter");
app.use("/user", userRouter);

const inventoryRouter = require("./router/inventoryRouter");
app.use("/inventory", inventoryRouter);

const logRouter = require("./router/logRouter");
app.use("/log", logRouter);

const missionRouter = require("./router/missionRouter");
app.use("/mission", missionRouter);

const storeRouter = require("./router/storeRouter");
app.use("/store", storeRouter);

const walkdataRouter = require("./router/walkdataRouter");
app.use("/walkdatas", walkdataRouter);

const trailRouter = require("./router/trailRouter");
app.use("/trail", trailRouter);

const eggRouter = require("./router/eggRouter");
app.use("/egg", eggRouter);

// 인증서 파일 경로 쿠키설정을 위해서 cors 설정 때문에 해야함
const privateKey = fs.readFileSync("./ssl/localhost+2-key.pem", "utf8");
const certificate = fs.readFileSync("./ssl/localhost+2.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

// HTTPS 서버 설정
https.createServer(credentials, app).listen(port, () => {
  console.log(`🚀 HTTPS 서버가 실행 중: https://localhost:${port}`);
});
