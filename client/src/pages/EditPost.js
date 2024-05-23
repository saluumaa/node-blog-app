import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Editor from '../components/Editor'


const EditPost = () => {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [images, setImages] = useState('')


    const navigate = useNavigate()

    const updatePost = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('id', id)

        if(images?.[0]) {
            data.set('file', images?.[0])
        }

        const response = await fetch('https://blog-app-gw63.onrender.com/posts', {
            method: 'PUT',
            body: data,
            credentials: 'include'
        })
        console.log(await response.json())
        if(response.ok) {
           navigate('/posts/'+id)
        }else {
            console.log('Failed to update post')
        }
    }

    useEffect(() => {
        const postId = id.toString
        fetch(`http://localhost:3001/post/${postId}`)
        .then(res => res.json()).then(data => {
            setTitle(data.title)
            setSummary(data.summary)
            setContent(data.content)
        })
    }, [id]);
        

    return (
        <form onSubmit={updatePost}>
            <input type="text" placeholder={"Title"} required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <input type='summary'
             placeholder={'Summary'} 
             value={summary}
            onChange={(e) => setSummary(e.target.value)}
              />
            <input type='file'
                onChange={e => setImages(e.target.files)}
            />
            <Editor value={content} onChange={setContent} />
            <button style={{marginTop: '5px'}}
            >Update post</button>
        </form>
      )
}

export default EditPost