import React, { useState } from 'react';
import axios from 'axios'
import s from '../pages/pages.module.scss'

const AddCommentForm = ({ articlesName, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('')
    
    const addComment = async () => {
        const response = await axios.post(`http://localhost:3001/api/articles/${articlesName}/comments`, {
            postedBy: name,
            text: commentText
        });
        const updatedArticle = response.data
        onArticleUpdated(updatedArticle);
        setName('')
        setCommentText('')
    }


    return (
        <div id="add-comment-form" className={s.commentForm}>
            <h3>Add a comment</h3>
            <label htmlFor="" >
                Name:
                <input 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text" />
            </label>
            <label htmlFor="">
                Comment:
                <textarea 
                        value={commentText}
                        onChange={ e => setCommentText(e.target.value)}
                        name="" id="" cols="50" rows="4"></textarea>
            </label>
            <button onClick={addComment}>Add comment</button>
        </div>
    );
};

export default AddCommentForm;