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
      id: req.session.id,
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
          user: req.session.id,
        })
    }
    catch (err){
      console.log(err);
      res.status(500).json(err);
    }
})

router.get('/dashboard', (req, res) => {
  if(!req.session.loggedIn){
    res.redirect('/login');
    return;
  }

  const me = await User.findByPk(req.session.id);

  const dbMyPosts = await Post.findAll({
    where: {
      username = me.username
    }
  })

  const posts = dbMyPosts.map((posts) =>
      posts.get({ plain: true })
    );

  res.render('dashboard', {
    loggedIn: req.session.loggedIn,  
    id: req.session.id,
    posts
  });
})

  module.exports = router;