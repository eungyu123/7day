const express = require("express");
const cors = require("cors");

// 67d0459dfea19c60e68db2d7
const port = 3000;
const app = express();
const path = require("path");

app.use(
  cors({
    origin: "https://localhost:5173",
    credentials: true,
  })
);

const connectDB = require("./db/connectDB");

connectDB();
const seedDatas = require("./db/seed/seedDatas");
// seedDatas.deleteAll();
// seedDatas.seedAll();
// seedDatas.checkIndex();

const middleware = require("./middleware/middleware");
middleware(app);

app.use("/image", express.static("image"));

const seedTrail = require("./db/seed/seedTrail");
const seedAll = require("./db/seed/seedAll");
// seedTrail.createSampleData1();
seedAll.seedAll();

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

const trailRouter = require("./router/trailRouter");
app.use("/trail", trailRouter);

const eggRouter = require("./router/eggRouter");
app.use("/egg", eggRouter);

const walkdataRouter = require("./router/walkdataRouter");
app.use("/walkdata", walkdataRouter);

app.listen(port, () => {
  console.log(`✅ server running on port ${port}`);
});
