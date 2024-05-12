import React from 'react'
import { Link } from 'react-router-dom'

const Post = () => {
  return (
    <div className='post'>
    <div className='image'>
    <img src='https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8fDB8fHww' alt='blog' />
    </div>
    <div className='texts'>
    <h2> full-house battery backup coming later this year </h2>
    <p className='info'>
      <Link className='author' to=''>John Doe</Link>
      <time>
        2024-10-06 12:00
      </time>
    </p>
    <p className='summary'> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec est in ipsum auctor elementum. </p>
    </div>
   </div>
  )
}

export default Post