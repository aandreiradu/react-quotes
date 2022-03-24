import React, { Fragment, useRef, useState } from 'react'
import { Prompt } from 'react-router-dom';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

import './QuoteForm.module.css'

const QuoteForm = (props) => {
  const [isEntering,setIsEntering] = useState(false);
  const authorInputRef = useRef();
  const textInputRef = useRef();

  const submitFormHandler = (e) => {
      e.preventDefault();

      const enteredAuthor = authorInputRef.current.value;
      const enteredText = textInputRef.current.value;

      props.onAddQuote({
          author: enteredAuthor,
          text: enteredText
      });
  }

  const formFocusHandler = () => {
    setIsEntering(true);
  };

  const finishEntering = () => {
      setIsEntering(false);
  }



  return (
    <Fragment>
    <Prompt when={isEntering} message={() => 'Are you sure you want to leave? All your data will be lost!'}>
    </Prompt>
    <Card>
        <form onFocus={formFocusHandler} className={classes.form} onSubmit={submitFormHandler}>
            {props.isLoading && (
                <div className={classes.loading}>
                    <LoadingSpinner/>
                </div>
            )}

            <div className={classes.control}>
                <label htmlFor='author'>Author</label>
                <input type='text' id='author' ref={authorInputRef}/>
            </div>

            <div className={classes.control}>
                <label htmlFor='text'>Text</label>
                <textarea id='text' rows='5' ref={textInputRef}>
                    
                </textarea>
            </div>
            <div className={classes.control}>
                <button onClick={finishEntering} className='btn'>Add Quote</button>
            </div>
        </form>
    </Card>
    </Fragment>
  )
}

export default QuoteForm