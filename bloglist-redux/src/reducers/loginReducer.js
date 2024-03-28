import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import blogService from '../services/blog'



const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {},
  reducers: {
    setUserLogin(state, action){
      console.log(action.payload)
      return action.payload
    },
    setLogOut(){
      return null
    }
  }
})

export const { setUserLogin, setLogOut } = userLoginSlice.actions

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
    dispatch(setLogOut())
  }
}


export default userLoginSlice.reducer