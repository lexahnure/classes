const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  _id: String,
  name: String
}, { versionKey: false });

module.exports = userSchema;