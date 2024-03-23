
import { useDispatch } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { logOutAf } from '../reducers/loginReducer'


export function HeaderUserInfo() {

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logOut())
    dispatch(logOutAf())
  }


  return(
    <div className='headerUser'>
      <p className='mt-3'> logged-in</p>
      <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
    </div>
  )
}