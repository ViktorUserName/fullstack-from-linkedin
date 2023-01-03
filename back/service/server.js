import express from "express";
import cors from 'cors';
import fs from 'fs';
import admin from 'firebase-admin'
import { MongoClient } from "mongodb";
const app = express();
let corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(express.json())
app.use(cors(corsOptions));

const credentions = JSON.parse(
    fs.readFileSync('./credentions.json')
)
admin.initializeApp({
    credential: admin.credential.cert(credentions)
})

app.use(async (request, response, next) => {
    const { authtoken } = request.headers;
    if(authtoken) {
        try {
            const user = await admin.auth().verifyIdToken(authtoken);
            request.user = user;
        } catch (e) {
            response.sendStatus(400);
        }
    }
    next();
})

app.get('/api/articles/:name', async function(request, response){
    const { name } = request.params;
    // const { uid } = request.user; ////

    const client = new MongoClient('mongodb://0.0.0.0:27017/')
    await client.connect();
    const db = client.db('react-blog-db');
    const article = await db.collection('articles').findOne({name})
    if(article){
        // const upvoteIds = article.upvoteIds || []; /////
        // article.canUpvote = uid && !upvoteIds.unclude(uid) ////
        response.json(article)
    }else {
        response.send('bad response')
    }
})

app.use ((request, response, next) => {
    if(request.user){
        next();
    } else { response.sendStatus(401)}
})

app.put('/api/articles/:name/upvote', async function(request, response){
    const { name } = request.params;
    const client = new MongoClient('mongodb://0.0.0.0:27017/');
    await client.connect();
    

    const db = client.db('react-blog-db');
    await db.collection('articles').updateOne({name}, {
        $inc: {
            upvotes: 1
        }
    })

    const article = await db.collection('articles').findOne({name})
    
    
    if (article){
        response.json(article)
    } else {
        response.send('That art don ex')
    }
})

app.put('/api/articles/:name/downvote', async function(request, response){
    const { name }  = request.params;
    const client = new MongoClient('mongodb://0.0.0.0:27017/');
    await client.connect();

    const db = client.db('react-blog-db');
    await db.collection('articles').updateOne({name}, {
        $inc: {
            upvotes: -1
        }
    })

    const article = await db.collection('articles').findOne({name})

    if(article){
        response.json(article)
    } else {
        response.send('bad req')
    }  
})

// app.delete('/api/articles/:name/comments/', async function(request, response){
//     const { name } = request.params;
//     const { postedBy, text } = request.body;
//     const client = new MongoClient('mongodb://0.0.0.0:27017/');
//     await client.connect();
//     const db = client.db('react-blog-db');
//     const collection = db.collection('articles')

//     const result = await collection.deleteOne({postedBy})
//     const article = await db.collection('articles').findOne({name})

//     response.send(article)
    

// })

app.post('/api/articles/:name/comments', async function(request, response){
    const { name } = request.params;
    const { postedBy, text } = request.body;
    const client = new MongoClient('mongodb://0.0.0.0:27017/');
    await client.connect();
    const db = client.db('react-blog-db');

    await db.collection('articles').updateOne({name},{
        $push: {
            comments: { postedBy, text }
        }
    })

    const article = await db.collection('articles').findOne({name})

    
    if(article){
        response.json(article)
    }else{
        response.send('comment is does exi')
    }
})












app.listen(3001)