const { Comment } = require('../models');

const commentData = [
  {
    author: 'BouttaBeBanned',
    text: 'Dread is poggers',
    post_id: 1
  },
  {
    author: 'Beau Chewning',
    text: 'Kyle kinda has a phat cock',
    post_id: 2
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
