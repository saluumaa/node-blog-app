import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {  
    const response = await fetch('https://blog-app-gw63.onrender.com/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, email, password})
    })
    console.log(response)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
  navigate('/login')

  }


  return (

    <form className='register' onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input type="text" placeholder="Username" required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="email" placeholder="Email" required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" placeholder="Password" required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>SignUp</button>
    </form>

  )
}

export default RegisterPage