import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const loginPage = () => {
  //eslint-disable-next-line
  const [username, setUsername] = useState('');
  //eslint-disable-next-line
  const [password, setPassword] = useState('');
  //eslint-disable-next-line
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault()
    try {  
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if (response.ok) {
      navigate('/')
    } else {
      console.log('Login failed')
    }
  } catch (error) {
    console.log(error)
  }
  }

  return (
        <form className='login' onSubmit={login} >
            <h1>Login</h1>
            <input type="text" placeholder="Username" required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input type="password" placeholder="Password" required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
        </form>

  )
}

export default loginPage