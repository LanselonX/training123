require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const scheduler = require("./services/cronService");

const PORT = process.env.PORT || 5444;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`Server started at ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
scheduler.startSch();
