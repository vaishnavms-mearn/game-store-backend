const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  gameId: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
const payment = mongoose.model("payment", paymentSchema);
module.exports = payment;
