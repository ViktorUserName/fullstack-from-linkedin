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
    const article = await db.collection('articles').findOne({})
    response.json(article)
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

app.put('/api/articles/:name/upvote', function(request, response){
    const { name } = request.params;
    const article = articlesInfo.find( a => a.name === name)
    if (article){
        article.upvotes += 1
        response.send(`The ${name} has ${article.upvotes} upvotes`)
    } else {
        response.send('That art don ex')
    }
})

app.post('/api/articles/:name/comments', function(request, response){
    const { name } = request.params;
    const { postedBy, text } = request.body;
    const article = articlesInfo.find ( a => a.name === name)
    if(article){
        article.comments.push(
        {postedBy, text}
        )
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