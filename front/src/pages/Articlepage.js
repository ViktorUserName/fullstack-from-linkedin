import React from 'react';
import {useParams} from 'react-router-dom'
import articles from './article-data';
import s from './pages.module.scss'

const Articlepage = () => {
    const { articleId } = useParams();
    const article = articles.find(article => article.name === articleId)
    if(!article){return <div>not found</div>}
    return (
            <>
            <h1>{article.title}</h1>
            {article.content.map(paragraph => (
                 <p className={s.articleP}>{paragraph}</p>
            ))}
            </>
    );
};

export default Articlepage;