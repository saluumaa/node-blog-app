import React, { useEffect, useState } from 'react'
import Post from '../components/Post'

const indexPage = () => {
  //eslint-disable-next-line
  const [posts, setPosts] = useState([])
  
  //eslint-disable-next-line
  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('https://blog-app-gw63.onrender.com/posts')
      const posts = await response.json()
      setPosts(posts)
      
    }
    getPosts()
  }, [])

  return (
    <div>
       {
        posts.length > 0 &&  posts.map(post => (
            <Post {...post} key={post._id}/>
          ))
       }
    </div>
  )
}

export default indexPage