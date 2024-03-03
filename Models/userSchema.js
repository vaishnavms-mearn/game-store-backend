const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  purchasedGames: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});
const users = mongoose.model("users", userSchema);
module.exports = users;
