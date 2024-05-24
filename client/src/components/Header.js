import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const Header = () => {
  const {setUserInfo, userInfo} = useContext(UserContext);
  useEffect(() => {

    fetch('https://blog-app-gw63.onrender.com/users/me', {
      method: 'GET',
      credentials: 'include'
    }).then(response => response.json().then(userInfo => {
      setUserInfo(userInfo)
    }))
  }, [setUserInfo])

  const logOut = () => {
    fetch('https://blog-app-gw63.onrender.com/users/logout', {
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