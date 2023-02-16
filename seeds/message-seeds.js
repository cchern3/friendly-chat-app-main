const { Message } = require('../models');

const messageIE = [
  {
    sender_id: 1,
    recipient_id: 2,
    text_messages: 'Hello, how are you doing?'
  },
  {
    sender_id: 2,
    recipient_id: 1,
    text_messages: 'Hey I am doing well, How about you?'
  },
  {
    sender_id: 1,
    recipient_id: 2,
    text_messages: 'I am doing well, I see you enjoy basketball.'
  },
  {
    sender_id: 2,
    recipient_id: 1,
    text_messages: 'Yeah i love sports in general!'
  },
  {
    sender_id: 2,
    recipient_id: 3,
    text_messages: 'Hey there, do you want to hang out sometime?'
  },
  {
    sender_id: 3,
    recipient_id: 2,
    text_messages: 'Yeah, sure! What time are you free?'
  },
  {
    sender_id: 2,
    recipient_id: 3,
    text_messages: 'I am free on the weekend'
  }
];

const seedMessages = () => Message.bulkCreate(messageIE);

module.exports = seedMessages;