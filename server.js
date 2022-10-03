const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const { readdirSync } = require("fs");
const config = require('./config/config');
const httpStatus = require("http-status");

require("dotenv").config();

const app = express();

//database
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    console.log("Connected to MongoDB");
    server = app.listen(config.port, () => {
      console.log(`Listening to port ${config.port}`);
    });
  })
  .catch((err) => console.log("MongoDB Error => ", err));

//middlewares
// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

//auto load routes
readdirSync("./routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).send({
    error: "Not Found"
  })
});
