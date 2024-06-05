import React from 'react'
import { Link } from 'react-router-dom'
import { formatISO9075 } from 'date-fns'

const Post = ({_id,title, image,summary, createdAt, author}) => {
  return (
    <div className='post'>
    <div className='image index-image'>
      <Link to={`/posts/${_id}`}> 
        <img src={ 'https://blog-app-gw63.onrender.com'} alt='blog' />
        {/* <img src={ 'http://localhost:3001/' + image.replace('public', '')} alt='blog' /> */}
      </Link>
    </div>
    <div className='texts'>
    <Link to={`/post/${_id}`}> 
      <h2>{title}</h2>
    </Link>
    <p className='info'>
      <a className='author' to=''>{author?.username}</a>
      <time>
       {formatISO9075(new Date(createdAt),)}
      </time>
    </p>
    <p className='summary'> {summary} </p>
    </div>
   </div>
  )
}

export default Post