import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'

const modules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
        {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
    ],
};

const  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];


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
        const response = await fetch('http://localhost:3001/posts', {
            method: 'POST',
            body: data,
            
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
        {/* <textarea name='' id='' cols='30' rows='10' placeholder='Content'></textarea> */}
        <ReactQuill value={content}
        onChange={newValue => setContent(newValue)}
         modules={modules} formats={formats}  />
        <button style={{marginTop: '5px'}}
        >Create post</button>
    </form>
  )
}

export default CreatePost