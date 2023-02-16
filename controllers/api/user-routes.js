const router = require('express').Router();
const { User, Message } = require('../../models');

// Get request for every user
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password', 'email'] }
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get request for single user
router.get('/:id', (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['password', 'email'] }
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'Could not find user with this ID' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post request to add user once registered
router.post('/', (req, res) => {
  User.create(req.body)
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post request for verification for login
router.post('/login', (req, res) => {
  User.findOne({
    where: { email: req.body.email }
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: 'Could not find user with that email address' });
      return;
    }

    // Valid password
    const acceptedPwd = dbUserData.checkPassword(req.body.password);
    if (!acceptedPwd) {
      res.status(400).json({ message: 'Wrong password' });
      return;
    }
    // saving the session once logged in
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.email = dbUserData.email;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'Login successful' });
    });
  });
});

// Destroy session once logged out
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// deleting the user based off ID
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'Could not find user with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;