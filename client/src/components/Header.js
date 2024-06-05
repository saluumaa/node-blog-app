import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { getToken } from '../utils/tokenService'

const Header = () => {
  // const token = getToken()
  const {setUserInfo, userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('https://blog-app-gw63.onrender.com/users/me', {
      // fetch('http://localhost:3001/users/me', {
        method: 'GET',
        // headers: {
        //   'Authorization': `Bearer ${token}`
        // },
        credentials: 'include'
      }).then(response => {
        return response.json();
      }).then(userInfo => {
        setUserInfo(userInfo)
      }).catch(error => {
        console.error(error);
      });
  }, [setUserInfo])

  const logOut = () => {
    fetch('https://blog-app-gw63.onrender.com/users/logout', {
    // fetch('http://localhost:3001/users/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(() => {
      setUserInfo(null)
    })
  }

  const username = userInfo?.username

  return (
    <header>
    
    <Link to="/" className='logo'> 
      Saluma's <br/>   Blog   
    </Link>
    <nav>
      {username ? (
        <>
        <a className='logout' onClick={logOut}>Logout</a>
        <Link className='new-post' to='/create' style={{marginLeft: '10px'}}>Create Post</Link>    
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