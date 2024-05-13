import React from 'react'
import { Link } from 'react-router-dom'
import { formatISO9075 } from 'date-fns'

const Post = ({title, image, content, summary, createdAt}) => {
  return (
    <div className='post'>
    <div className='image'>
    <img src={image} alt='blog' />
    </div>
    <div className='texts'>
    <h2>{title}</h2>
    <p className='info'>
      <Link className='author' to=''>John Doe</Link>
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