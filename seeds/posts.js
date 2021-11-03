const { Post } = require('../models');

const postData = [
  {
    author: 'BouttaBeBanned',
    title: 'Why Metroid Dread SLAPS',
    text: 'Dread is poggers',
  },
  {
    author: 'Beau Chewning',
    title: 'Kyle is my senpai',
    text: 'Kyle kinda has a phat cock',
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
