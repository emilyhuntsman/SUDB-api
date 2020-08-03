// dependencies
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ `sudb`;

// middleware
const whitelist = ["http://localhost:3000", "https://sudb-front.herokuapp.com/"];
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
app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", '*');    
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// mongodb database connection
mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
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
