import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import blogService from '../services/login'



const userLoginSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUserLogin(state, action){
      return action.payload
    },
    setLogout(){
      return null
    }
  }
})

export const { setUserLogin, setLogout } = userLoginSlice.actions

export const setUserService = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUserBlogs', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUserLogin(user))
      dispatch(setNotification(`Welcome ${username}`, 2))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 2))
    }
  }
}

export const logOut = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUserBlogs')
    dispatch(setLogout())
  }
}




export default userLoginSlice.reducer