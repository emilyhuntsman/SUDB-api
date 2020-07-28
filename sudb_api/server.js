// dependencies
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
//HMAC SHA256 synchronous sign in
const jwt = require('jsonwebtoken')
// let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const bodyParser = require("body-parser");
const PORT = 3003;

// middleware
const whitelist = ["http://localhost:3000", "http://localhost:3003/users/login"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// mongodb database connection
mongoose.connect("mongodb://localhost:27017/sudb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("disconnected"));
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

// controllers, routers
const usersController = require("./controllers/users.js");
app.use("/users", usersController);

const picksController = require("./controllers/picks.js");
app.use("/picks", picksController);


// listen
app.listen(PORT, () => {
  console.log("listening on port ", PORT);
});
