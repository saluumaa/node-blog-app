import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    // const token = localStorage.getItem('token')
    // if (token) {
    //   console.log('User is logged in')
    // } else {
    //   console.log('User is not logged in')
    // }
    const response = fetch('http://localhost:3001/me', {
      method: 'GET',
      credentials: 'include'
    }).then(response => response.json().then(data => {
      if (data.username) {
        setUser(data.username)
      }
    }))
  }, [])
  return (
    <header>
    <Link to="/" className='logo'>My Blog</Link>
    <nav>
      {user ? (
        <>
        <Link to='/create'>Create Post</Link>     
        <Link to='/logout'>Logout</Link>
        </>
      ) : (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </>
      ) }
    </nav>
  </header>
  )
}

export default Header