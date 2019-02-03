const mongoose = require('mongoose');
const { randomBytes } = require('crypto');

const userSchema = require('./user.model');
const User = mongoose.model('User', userSchema);

exports.post = async (req, res) => {
  await User.findOne({ name: req.body.name }, (err, user) => {
    try {
      if (!user) {
        const newUser = new User({
          _id: randomBytes(12).toString('hex'),
          name: req.body.name
        });
        newUser.save();
        return res.send(JSON.stringify('Success'));
      }
      const id = JSON.stringify(user._id);
      return res.send(id);
    } catch(err) {
      console.error(err);
    }
  });
};

exports.get = async (req, res) => {
  await User.find({ name: /\w/i }, (err, docs) => {
    try {
      return res.send(docs);
    } catch(err) {
      console.error(err);
    }
  });
};