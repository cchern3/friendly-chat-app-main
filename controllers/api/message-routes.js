const router = require('express').Router();
const { User, Message } = require('../../models');
const { Op } = require('sequelize');
const { getrecentUserchat } = require('../../utils/filters');

// get request to receive all messages once logged in
router.get('/', (req, res) => {
  // redirect to the login page if the user is not logged in
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  var sessionId = req.session.user_id;
  Message.findAll({
    where: {
      [Op.or]: [{ recipient_id: sessionId }, { sender_id: sessionId }]
    },
    attributes: ['id', 'text_messages', 'createdAt'],
    include: [
      {
        // sender messages
        model: User,
        as: 'sender',
        attributes: ['id', 'first_name', 'last_name']
      },
      {
        // recipient messages
        model: User,
        as: 'receiver',
        attributes: ['id', 'first_name', 'last_name']
      }
    ]
  })
    .then((dbmessageIE) => res.json(dbmessageIE))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Recent User Messages
router.get('/recent', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  var sessionId = req.session.user_id;
  Message.findAll({
    where: {
      [Op.or]: [{ recipient_id: sessionId }, { sender_id: sessionId }]
    },
    order: [['createdAt', 'DESC']]
  })
    .then((dbmessageIE) => {
      // Finding every user
      User.findAll({
        attributes: ['id', 'first_name', 'last_name']
      })
        .then((dbUserData) => {
          // mapping users to get their data
          const user = dbUserData.map((user) => user.get({ plain: true }));
          const messages = dbmessageIE.map((message) =>
            message.get({ plain: true })
          );

          // getting the latest message for each user
          let recentUserchat = getrecentUserchat(messages, user, sessionId);

          res.json(recentUserchat.updatedChat);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Post a new user message
router.post('/', (req, res) => {
  Message.create({
    sender_id: req.body.sender_id,
    recipient_id: req.body.recipient_id,
    text_messages: req.body.text_messages
  })
    .then((dbmessageIE) => res.json(dbmessageIE))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;