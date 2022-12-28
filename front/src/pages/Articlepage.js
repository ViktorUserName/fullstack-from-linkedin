import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import articles from './article-data';
import s from './pages.module.scss'
import CommetsList from '../components/CommetsList';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser';
import { Link } from 'react-router-dom';
import getOut from '../hooks/getOut'

const Articlepage = () => {
    const [articleInfo, setArticleInfo] = useState({
        upvotes: 0, comment: []
    })
    const { articleId } = useParams();
    const article = articles.find(article => article.name === articleId)

    const {user, isLoading} = useUser()


    useEffect( () => {
        const loadInfo = async () => {
            const response = await axios.get(`http://localhost:3001/api/articles/${articleId}`)
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo)
        }
        loadInfo();
    }, [])

    const addUpvote = async () => {
        const response = await axios.put(`http://localhost:3001/api/articles/${articleId}/upvote`)
        const updateArticle = response.data;
        setArticleInfo(updateArticle);
    }

    const addDownvote = async () => {
        const response = await axios.put(`http://localhost:3001/api/articles/${articleId}/downvote`)
        const updateArticle = response.data;
        setArticleInfo(updateArticle)
    }

    

    if(!article){return <div>not found</div>}
    return (
            <>
            <h1>{article.title}</h1>
            <div id="upvoteSection">
                {user ?
                    <>
                    <button onClick={addUpvote}>Upvote</button>
                    <button onClick={addDownvote}>Downvote</button>
                    </>
                    : <Link to="/login"><button>Log In</button></Link>
                }
                {/* <button onClick={getOut}>log out</button> */}
                <p>This article has {articleInfo.upvotes}</p>
            </div>
            {article.content.map(paragraph => (
                 <p className={s.articleP} key={Math.random(100)}>{paragraph}</p> //// need to correct key
            ))}
            {user ?
            <AddCommentForm articlesName={articleId} 
                            onArticleUpdated={updateArticle => setArticleInfo(updateArticle)}/>
                            : <Link to="/login"><button>Log In</button></Link>}
            
            <CommetsList comments={articleInfo.comments} />
            </>
    );
};

export default Articlepage;


        // const response = async () => {
        //     try {
        //     const response = await axios.get(`http://localhost:3001/api/articles/${articleId}`)
        // const newArticleInfo = response.data;
        // setArticleInfo(newArticleInfo)
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        // response()