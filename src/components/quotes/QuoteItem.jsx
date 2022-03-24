import React from 'react'
import classes from './QuoteItem.module.css';
import { Link } from 'react-router-dom';

const QuoteItem = (props) => {
  const { id } = props;
  return (
    <li className={classes.item}>
        <figure>
            <blockquote>
                <p>{props.text}</p>
            </blockquote>
            <figcaption>{props.author}</figcaption>
        </figure>
        <Link to={`/quotes/${id}`} className='btn'>
            View Fullscreen
        </Link>
    </li>
  )
}

export default QuoteItem