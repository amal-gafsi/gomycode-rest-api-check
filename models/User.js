const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  phone: Number,
});

module.exports = User = mongoose.model("users", UserSchema);
