const express = require("express");
const cors = require("cors");

// 67c7ab335f743adc8dc272a3
//Express 앱 생성
const port = 3000;
const app = express();
const path = require("path");

const connectDB = require("./db/connectDB");

connectDB();

// const seed = require("./db/seed/seed");
// seed.deleteDummyData();
//  seed.insertDummyData();
//  seed.deleteAllUserMissions();

const seedTrail = require("./db/seed/seedTrail");
// seedTrail.seedReward();

const middleware = require("./middleware/middleware");
middleware(app);

app.use("/image", express.static("image"));

const mainRouter = require("./router/mainRouter");
app.use("/", mainRouter);

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

app.listen(port, () => {
  console.log(`✅ server running on port ${port}`);
});
