import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
const loginPage = () => {
  //eslint-disable-next-line
  const [username, setUsername] = useState('');
  //eslint-disable-next-line
  const [password, setPassword] = useState('');
  //eslint-disable-next-line
  const {setUserInfo} = useContext(UserContext);
  //eslint-disable-next-line
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault()
    try {  
    const response = await fetch('http://localhost:3001/users/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
      navigate('/')
      });
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