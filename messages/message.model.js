const mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
  _id: String,
  recipients: [String],
  title: String,
  subject: String
}, { versionKey: false });

module.exports = messageSchema;