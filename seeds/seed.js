const sequelize = require('../config/connection');
const seedComments = require('./comment');
const seedPosts = require('./posts');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedPosts();

  await seedComments();

  process.exit(0);
};

seedAll();