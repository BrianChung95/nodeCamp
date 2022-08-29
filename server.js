const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const { readdirSync } = require("fs");

require("dotenv").config();

const app = express();

//database
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => {
    console.log("Connected to MongoDB");
    server = app.listen(process.env.PORT || 8000, () => {
      console.log(`Listening to port ${process.env.PORT}`);
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
