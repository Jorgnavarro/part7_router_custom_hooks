
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/loginReducer'
import { logOutUser } from '../reducers/userReducer'


export function HeaderUserInfo() {

  const dispatch = useDispatch()
  const username = useSelector(state => state.userData?.name)

  const handleLogout = () => {
    dispatch(logOut())
    dispatch(logOutUser())
  }


  return(
    <div className='headerUser'>
      <p className='mt-3'> {username} logged-in</p>
      <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
    </div>
  )
}