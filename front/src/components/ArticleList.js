import React from 'react';
import {Link} from 'react-router-dom'
import s from '../pages/pages.module.scss'

const ArticleList = ({articles}) => {
    return (
        <>
                        {
                articles.map( article => (
                    <Link key={article.name} to={`/articles/${article.name}`} className={s.link}>
                        <h3>{article.title}</h3>
                        <p>{article.content[0].substring(0, 150)}</p>
                    </Link>
                ))
            }
        </>
    );
};

export default ArticleList;