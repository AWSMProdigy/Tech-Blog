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
        user_id: req.session.user_id
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
      res.render('post', { post, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.post('/', async(req, res) => {
    try{
      const newPost = await Post.create({
        author: req.body.username,
        title: req.body.title,
        text: req.body.text
      });

      req.session.save(() => {
        req.session.loggedIn = true;
        user_id = req.session.user_id;
        res.status(200).json(newPost);
      });
    }
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  })

  module.exports = router;