import React from 'react';
import {Link} from 'react-router-dom'
import ArticleList from '../components/ArticleList';
import articles from './article-data';
import s from './pages.module.scss'

const Articlelistpage = () => {
    return (
        <>
            <h1>Articles</h1>
            <ArticleList articles={articles}/>
        </>
    );
};

export default Articlelistpage;