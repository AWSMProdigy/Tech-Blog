const router = require('express').Router();
const { Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const dbPostData = await Post.findAll();
  
      const posts = dbPostData.map((post) =>
        post.get({ plain: true })
      );
      // Send over the 'loggedIn' session variable to the 'homepage' template
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const dbPostData = await Post.findByPk(req.params.id, {
        include: [
            {
              model: Comment,
              attributes: ['author', 'text'],
            },
          ],
      });
  
      const post = dbPostData.get({ plain: true });
      // Send over the 'loggedIn' session variable to the 'gallery' template
      res.render('post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  module.exports = router;