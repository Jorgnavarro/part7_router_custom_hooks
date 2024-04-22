import { useContext } from 'react'
import { ContextGlobal } from '../context/globalContext'
import { useNavigate, Link } from 'react-router-dom'



export function HeaderUserInfo() {
  const { user, setUser } = useContext(ContextGlobal)
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUserBlogs')
    setUser(null)
    navigate('/')
  }


  return(
    <div className='headerUser'>
      <div className='navBar p-2'>
        <Link className='linkNav' to="/">Blogs</Link>
        <Link className='linkNav' to="/users">Users</Link>
      </div>
      <p className='mt-3'>{user.name} logged-in</p>
      <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
    </div>
  )
}