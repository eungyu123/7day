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
app.use("/api/main", mainRouter);

app.listen(port, () => {
  console.log(`✅ server running on port ${port}`);
});
