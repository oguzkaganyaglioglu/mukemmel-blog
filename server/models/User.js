const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userShema = new Schema({
  firstName: {
    type :String,
    required: [true, "Lütfen bir isim giriniz"]
  },
  lastName: {
    type :String,
    required: [true, "Lütfen soyisim giriniz"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Lütfen bir e-mail adresi giriniz"]
  },
  password: {
    type :String,
    required: [true, "Lütfen bir şifre giriniz"]
  },
  admin: String,
  dateCreated: Date,
  dateModified: Date,
  lastlogin: Date
});

const User = mongoose.model("User", userShema);

module.exports = User;
