import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PostPage = () => {
const id = useParams()

const [postInfo, setPostInfo] = useState(null)

useEffect(() => {
    console.log("ID:", id); // Log the value of id
    fetch(`http://localhost:3001/post/${id}`)
        .then(response => response.json())
        .then(postInfo => setPostInfo(postInfo))
}, [id]);


if (!postInfo) {
    return <div>Loading...</div>
}

  return (
    <div className='post-page'>
        <div className='image'>
        <img src={`http://localhost:3001/${postInfo.image}`} alt='blog' />
        </div>
        <h1>{postInfo.title}</h1>
        <div dangerouslySetInnerHTML={{__html: postInfo.content}}></div>
    </div>
  )
}

export default PostPage