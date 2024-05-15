import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const Header = () => {
  const {setUserInfo, userInfo} = useContext(UserContext);
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
    }).then(response => response.json().then(userInfo => {
      setUserInfo(userInfo)
    }))
  }, [])

  const logOut = () => {
    fetch('http://localhost:3001/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(() => {
      setUserInfo(null)
    })
  }

  const username = userInfo?.username

  return (
    <header>
    <Link to="/" className='logo'>Saluma's Blog</Link>
    <nav>
      {username ? (
        <>
        <Link to='/create'  style={{marginRight: '10px'}} >Create Post</Link>    
        <a className='logout' onClick={logOut}>
        <span
        >{username}</span> 
          Logout</a>
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