import express from "express";
import cors from 'cors';
import { MongoClient } from "mongodb";
const app = express();
let corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(express.json())
app.use(cors(corsOptions));

app.get('/api/articles/:name', async function(request, response){
    const { name } = request.params;

    const client = new MongoClient('mongodb://0.0.0.0:27017/')
    await client.connect();
    const db = client.db('react-blog-db');
    const article = await db.collection('articles').findOne({name})
    if(article){
        response.json(article)
    }else {
        response.send('bad response')
    }
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