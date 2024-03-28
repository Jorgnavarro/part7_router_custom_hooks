import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
import blogService from '../services/blog'

const userDataSlice = createSlice({
  name: 'userData',
  initialState: null,
  reducers: {
    setUser(state, action){
      return action.payload
    },
    logOutU(){
      return null
    }
  }
})

export const { setUser, logOutU } = userDataSlice.actions

export const getLoggedUser = (userToSearch) => {
  return async dispatch => {
    const userLogged = await userService.getUser(userToSearch?.username)
    dispatch(setUser(userLogged[0]))
    blogService.setToken(userToSearch?.token)
  }
}

export const logOutUser = () => {
  return dispatch => {
    dispatch(logOutU())
  }
}


export default userDataSlice.reducer