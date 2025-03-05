const express = require("express");
const cors = require("cors");

//Express 앱 생성
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
const connectDB = require("./db/connectDB");

connectDB();

const middleware = require("./middleware/middleware");
middleware(app);

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

app.listen(port, () => {
  console.log(`✅ server running on port ${port}`);
});
