const router = require('express').Router();
const { Post, Comment } = require('../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll();

    const posts = dbPostData.map((posts) =>
      posts.get({ plain: true })
    );

    res.render('homepage', {
      loggedIn: req.session.loggedIn,  
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
        res.render('post', {post, loggedIn: req.session.loggedIn})
    }
    catch (err){

    }
})

  module.exports = router;