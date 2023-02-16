const sequelize = require('../config/connection');
const seedUsers = require('./user-seeds');
const seedMessages = require('./message-seeds');

const getallSeeds = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedMessages();
  console.log('\n----- MESSAGES SEEDED -----\n');

  process.exit(0);
};

getallSeeds();