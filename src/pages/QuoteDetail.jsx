import React, { Fragment, useEffect } from 'react'
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';


const QuoteDetail = () => {
  const match = useRouteMatch();
  console.log(match);
  const { quoteId } = useParams();
  const {sendRequest,status,data:loadedQuote,error } = useHttp(getSingleQuote,true);
  console.log(loadedQuote);


  useEffect(() => {
    sendRequest(quoteId)
  },[sendRequest,quoteId]);


  if(status === 'pending') {
    return <div className='centered'>
      <LoadingSpinner/>
    </div>
  }

  if(error) {
    return <p className='centered'>{error}</p>
  }

  if (!loadedQuote.text) {
    return <p>No details found for this quote</p>
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className='centered'>
        <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
      </div>
      </Route>
      <Route path={`${match.path}/comments`} exact>
        <Comments />
      </Route>
    </Fragment>
  )
}

export default QuoteDetail