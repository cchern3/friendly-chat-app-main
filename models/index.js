const User = require('./User');
const Message = require('./Message');

User.hasMany(Message, {
  foreignKey: 'sender_id',
  as: 'sender'
});
Message.belongsTo(User, {
  foreignKey: 'sender_id',
  as: 'sender'
});

User.hasMany(Message, {
  foreignKey: 'recipient_id',
  as: 'receiver'
});
Message.belongsTo(User, {
  foreignKey: 'recipient_id',
  as: 'receiver'
});

module.exports = { User, Message };