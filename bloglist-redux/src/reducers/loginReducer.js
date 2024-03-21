import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import blogService from '../services/login'


const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser(state, action){
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const setUserService = (username, password) => {
  return async dispatch => {
    try{
      const user = await loginService.login({
        username, password
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedUserBlogs', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification(`Welcome ${username}`, 2))
    }catch(excepction){
      dispatch(setNotification('Wrong username or password', 2))
    }
  }
}

export default userSlice.reducer