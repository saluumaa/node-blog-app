import { useState } from 'react'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'
import Editor from '../components/Editor'


const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [images, setImages] = useState('')

    const navigate = useNavigate()

    const createNewPost = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('file', images[0])
        const response = await fetch('https://blog-app-gw63.onrender.com/posts', {
            method: 'POST',
            body: data,
            credentials: 'include'
        })
        console.log(await response.json())
        if(response.ok) {
           navigate('/')
        }else {
            console.log('Failed to create post')
        }
    
    }
 
  return (
    <form onSubmit={createNewPost}>
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
        >Create post</button>
    </form>
  )
}

export default CreatePost