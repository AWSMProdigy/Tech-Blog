const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    try{
        const me = await User.findByPk(req.session.user_id);
        const newComment = await Comment.create({
            author: me.username,
            text: req.body.text,
            post_id: req.body.post_id
        })
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;