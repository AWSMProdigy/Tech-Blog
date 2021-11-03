const router = require('express').Router();
const { Post, Comment, User } = require('../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll();

    const posts = dbPostData.map((posts) =>
      posts.get({ plain: true })
    );

    res.render('homepage', {
      loggedIn: req.session.loggedIn,  
      user_id: req.session.user_id,
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
  });

router.get('/post/:id', async (req, res) => {
    try{
        const dbPost = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment
                }
            ]
        });

        const post = dbPost.get({ plain: true });
        res.render('post', {
          post, 
          loggedIn: req.session.loggedIn,
          user_id: req.session.user_id,
        })
    }
    catch (err){
      console.log(err);
      res.status(500).json(err);
    }
})

router.get('/dashboard', async (req, res) => {
  try{
  if(!req.session.loggedIn){
    res.redirect('/login');
    return;
  }
  const me = await User.findByPk(req.session.user_id);

  const dbMyPosts = await Post.findAll({
    where: {
      author: me.username
    }
  })

  const posts = dbMyPosts.map((posts) =>
      posts.get({ plain: true })
    );

  res.render('dashboard', {
    username: me.username,
    loggedIn: req.session.loggedIn,  
    user_id: req.session.user_id,
    posts
  });

  }
  catch (err){
    console.log(err);
    res.status(500).json(err);
  }
})

  module.exports = router;