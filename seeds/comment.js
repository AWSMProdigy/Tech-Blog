const { Comment } = require('../models');

const commentData = [
  {
    author: 'BouttaBeBanned',
    text: 'DAS ON GOD',
    post_id: 1
  },
  {
    author: 'Beau Chewning',
    text: 'DAS ON GOD',
    post_id: 2
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
