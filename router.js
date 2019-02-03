const User = require('./users/userController');
const Message = require('./messages/messageController');

module.exports = app => {
	app.route('/users').post(User.post);
	app.route('/users').get(User.get);
	app.route('/messages').post(Message.post);
	app.route('/:id/messages').get(Message.get);
};