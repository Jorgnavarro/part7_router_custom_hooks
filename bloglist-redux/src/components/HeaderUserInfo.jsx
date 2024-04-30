
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/loginReducer'
import { logOutUser } from '../reducers/userReducer'
import { useNavigate, Link } from 'react-router-dom'


export function HeaderUserInfo() {

  const dispatch = useDispatch()
  const username = useSelector(state => state.userLogin?.name)
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logOut())
    dispatch(logOutUser())
    navigate('/')
  }


  return(
    <div className='headerUser'>
      <div className='navBar p-2'>
        <Link className='linkNav' to="/">Blogs</Link>
        <Link className='linkNav' to="/users">Users</Link>
      </div>
      <p className='mt-3'> {username} logged-in</p>
      <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
    </div>
  )
}