const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userShema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Lüten bir e-mail adresi giriniz"]
  },
  password: String,
  dateCreated: Date,
  dateModified: Date,
  lastlogin: Date
});

const User = mongoose.model("User", userShema);

module.exports = User;
