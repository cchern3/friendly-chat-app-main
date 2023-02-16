const router = require('express').Router();
const { User, Message } = require('../models');
const { getrecentUserchat } = require('../utils/filters');
const { Op } = require('sequelize');

var sessionId;

// Get request to redirect to login page or chat page
router.get('/', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  } else {
    res.redirect('/chat');
    return;
  }
});

// Get request: login page is shown if logged out, but showing chat page if logged in
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/chat');
    return;
  }
  res.render('login');
});

// Get request to show if register page if logged out, but showing chat page if logged in
router.get('/register', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/chat');
    return;
  }
  res.render('register');
});

// Get request to show all info once logged in
router.get('/chat', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  sessionId = req.session.user_id;
  User.findAll({
    attributes: ['id', 'first_name', 'last_name']
  })
    .then((dbUserData) => {
      // Maping each user with their data
      const user = dbUserData.map((user) => user.get({ plain: true }));

      // Acquires chat info for users
      const recentUserchat = getrecentUserchat(null, user, sessionId);

      // Renders webpage with chat.handlebars
      res.render('chat', {
        recentUserchat,
        loggedIn: req.session.loggedIn,
        chatHome: true
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get request to obtain messages between a conversation between users
router.get('/chat/:id', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  // Rerdirecting to chat home if undefined
  if (req.params.id == 'undefined') {
    res.redirect('/chat');
    return;
  }

  sessionId = req.session.user_id;
  // Redirecting to homepage if they are on their own ID page
  if (req.params.id == sessionId) {
    res.redirect('/chat');
    return;
  }
  Message.findAll({
    where: {
      [Op.or]: [
        { recipient_id: sessionId, sender_id: req.params.id },
        { recipient_id: req.params.id, sender_id: sessionId }
      ]
    },
    // Ordering messages by ID
    order: [['id']]
  })
    .then((dbmessageIE) => {
      // Obtaining user info
      User.findAll({
        attributes: [
          'id',
          'first_name',
          'last_name',
          'pronouns',
          'gender',
          'bio'
        ]
      })
        .then((dbUserData) => {
          // Mapping user data
          const user = dbUserData.map((user) => user.get({ plain: true }));

          // Seeing if the param Id exists for each user
          let userExist = false;
          user.forEach((user) => {
            if (user.id == req.params.id) {
              userExist = true;
              return;
            }
          });
          // Redirecting user to the chat home, if the user doesn't exist
          if (!userExist) {
            res.redirect('/');
            return;
          }

          const messages = dbmessageIE.map((message) =>
            message.get({ plain: true })
          );

          // Gets current user chat information
          const recentUserchat = getrecentUserchat(
            messages,
            user,
            sessionId,
            req.params.id
          );

          // Render messages from chat.handlebars
          res.render('chat', {
            messages,
            recentUserchat,
            loggedIn: req.session.loggedIn,
            chatHome: false // Boolean for if chat is page home or user page
          });
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

// Get request to go to homepage if there is no page exits
router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;