import React, {useState} from 'react'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {  
    const response = await fetch('http://localhost:3001/register', {
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