import React from 'react';
import s from '../pages/pages.module.scss'
const CommetsList = ({comments}) => {
    return (
        <>
            <h3 className={s.commentsH3}>Comments:</h3>
            {
            comments?.map( comments => (
            <div className={s.comments} key={comments.postedBy + ': ' + comments.text}>
                <h4>{comments.postedBy}</h4>
                <p>{comments.text}</p>
            </div>
            ))
            }
        </>
    );
};

export default CommetsList;