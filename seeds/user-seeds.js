const { User } = require('../models');

const userData = [
  {
    first_name: 'Laura',
    last_name: 'Trapaga',
    email: 'laura@email.com',
    password: 'password123',
    bio: 'I love music and walks on the beach',
    gender: 'non-binary',
    pronouns: 'they/them',
  },
  {
    first_name: 'Jairo',
    last_name: 'Macassi',
    email: 'Jairo@email.com',
    password: 'password123',
    bio: 'I love basketball and baseball',
    gender: 'male',
    pronouns: 'he/him',
  },
  {
    first_name: 'Calvin',
    last_name: 'Chern',
    email: 'calvin@email.com',
    password: 'password123',
    bio: 'I love to lift weights',
    gender: 'male',
    pronouns: 'he/him',
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
