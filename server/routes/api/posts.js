const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


//get
router.get('/', async(req, res) => {
    const Posts = await loadPostCollection();
    res.send(await Posts.find({}).toArray());
});

//add
router.post('/', async (req,res) => {
    const Posts = await loadPostCollection();
    await Posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })
    res.status(201).send();
})
//delete
router.delete('/id', async (req, res) => {
    const Posts = await loadPostCollection();
    await Posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


//mongodb


async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb://localhost/Blog',{
        useNewUrlParser: true
    });

    return client.db('Blog').collection('Posts');
}



module.exports = router;