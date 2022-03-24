import React, { useCallback, useEffect, useState } from 'react'
import NewCommentForm from './NewCommentForm';
import classes from './Comments.module.css'
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
const [isAddingComment,setIsAddingComment] = useState(false);
const { quoteId } = useParams();

const { sendRequest,status,data:loadedComments, error} =  useHttp(getAllComments);

const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  useEffect(() => {
    sendRequest(quoteId);
  },[quoteId,sendRequest]);

  let comments;

    if(status === 'pending') {
    comments = <div className='centered'><LoadingSpinner/></div>
  }

  if(status === 'completed' && (loadedComments &&  loadedComments.length > 0)) {
    comments = <CommentsList comments={loadedComments}/>
  }

  if(status === 'completed' && (!loadedComments || loadedComments.length === 0)){
    comments = <p className='centered'>No comments were added yet. Maybe add some?</p>
  }

  const addedCommentHandler = useCallback(() => {
      sendRequest(quoteId);
  },[sendRequest,quoteId]);



  return (
    <section className={classes.comments}>
        <h2>User Comments</h2>
        {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={addedCommentHandler} />}
      {comments}
    </section>
  )
}

export default Comments