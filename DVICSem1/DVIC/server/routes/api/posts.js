const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })
    res.status(201).send();
});

// mongodb+srv://Lam:iVi2iaNa7TubzG7o@cluster0-0zuzg.mongodb.net/test?retryWrites=true&w=majority
// Delete Post

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect('mongodb+srv://Lam:iVi2iaNa7TubzG7o@cluster0-0zuzg.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser: true
    });
    return client.db('test').collection('posts');
}

module.exports = router;
