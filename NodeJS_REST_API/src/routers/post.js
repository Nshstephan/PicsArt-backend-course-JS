const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const Post = require('../models/post');
const auth = require('../middleware/authentication');
const router = new express.Router();

const upload = multer({
    limits: {
        fileSize: 3000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }

        cb(undefined, true);
    }
});

router.post('/', auth, upload.array('photo'), async (req, res) => {
    const post = new Post({
        ...req.body,
        owner: req.user._id,
    })

    if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
            const buffer = await sharp(req.files[i].buffer).resize({width: 500, height: 500}).png().toBuffer();
            post.photos = post.photos.concat({photo: buffer});
        }

    }

    try {
        await post.save();
        res.status(201).send(post);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/guest', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.send(posts);
    } catch (e) {
        res.status(500).send();
    }
});

// GET /posts?completed=true
// GET /posts?limit=10&skip=0
// GET /posts?sortBy=createdAt:desc
router.get('/', auth, async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        await req.user.populate({
            path: 'posts',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.posts);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/find/:desc', auth, async (req, res) => {
    try {
        const posts = await Post.find({owner: req.user._id});

        if (!posts) {
            return res.status(404).send();
        }
        
        const result = posts.filter((post) => post.description.includes(req.params.desc));
        
        if (result.length === 0) {
            return res.status(404).send();
        }        
        res.send(result);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const post = await Post.findOne({_id, owner: req.user._id})

        if (!post) {
            return res.status(404).send();
        }

        res.send(post);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        const post = await Post.findOne({_id: req.params.id, owner: req.user._id});

        if (!post) {
            return res.status(404).send();
        }

        updates.forEach((update) => post[update] = req.body[update]);
        await post.save();
        res.send(post);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/:id/photo/:index', auth, upload.single('photo'), async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id, owner: req.user._id})
        if (!post || (post.photos.length <= req.params.index) || req.params.index < 0) {
            return res.status(404).send();
        }
        const buffer = await sharp(req.file.buffer).resize({width: 500, height: 500}).png().toBuffer();
        post.photos[req.params.index] = {photo: buffer};
        await post.save();
        res.send(post);
    } catch (e) {
        res.status(500).send();
    }
});

router.delete('/:id/photo/:index', auth, async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id, owner: req.user._id})
        if (!post) {
            return res.status(404).send();
        }

        post.photos.splice(req.params.index, 1);
        await post.save();
        res.send(post);
    } catch (e) {
        res.status(500).send();
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!post) {
            return res.status(404).send();
        }

        res.send(post);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
