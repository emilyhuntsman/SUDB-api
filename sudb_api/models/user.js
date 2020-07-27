const mongoose = require("mongoose");
const SALT_WORK_FACTOR = 10;
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  read: [String],
  toread: [String],
  genres: [String],
});

userSchema.pre("save", function (next) {
  console.log("preSave working");
  let user = this;

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    console.log("genSalt working");
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      console.log("hash working");
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  console.log("using encryption")
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
