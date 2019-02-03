const mongoose = require('mongoose');
const http = require('http');
const { randomBytes } = require('crypto');

const messageSchema = require('./message.model');
const Message = mongoose.model('Message', messageSchema);
const options = {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
}


exports.post = async (req, res) => {
  const msg = new Message({
    _id: randomBytes(12).toString('hex'),
    recipients: req.body.recipients,
    title: req.body.title,
    subject: req.body.subject
  });
  await msg.save(err => {
    try {}
    catch(err) { console.error(err)};
  });
  const id = JSON.stringify(msg._id);
  res.send(id);

  req.body.recipients.forEach(el => {
    const settings = {
      ...options,
      body: JSON.stringify({ recipient: el, subject: req.body.subject })
    };
    
    http.request(
      'http://localhost:2488/notifications', options
    ).on('error', e => console.error(e.message));
  });
};

exports.get = async (req, res) => {
  await Message.find().where( 'recipients', req.params.id ).exec((err, docs) => {
    try {
      if (!docs) {
        return res.sendStatus(204);
      }
      return res.send(docs);
    } catch(err) {
      console.error(err);
    }
  });
};