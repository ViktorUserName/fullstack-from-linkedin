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

// const articlesInfo = [{
//     name: 'learn-react',
//     upvotes: 0,
//     comments: []
// },
// {
//     name: 'learn-react',
//     upvotes: 0,
//     comments: []
// },
// {
//     name: 'mongodb',
//     upvotes: 0,
//     comments: []
// }
// ]

app.put('/api/articles/:name/upvote', async function(request, response){
    const { name } = request.params;
    // const article = articlesInfo.find( a => a.name === name)
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
        response.send(`The ${name} has ${article.upvotes} upvotes`)
    } else {
        response.send('That art don ex')
    }
})

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
        response.send(article.comments)
    }else{
        response.send('comment is does exi')
    }
})












// app.get('/hello/:name', function(request, response){
//     const { name } = request.params;
//     response.send(`hi ${name}`)
// })
app.listen(3001)