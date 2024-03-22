import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {},
  reducers: {
    setUser(state, action){
      return action.payload
    }
  }
})

export const { setUser } = userDataSlice.actions

export const getLoggedUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserBlogs')
    const userToSearch = JSON.parse(loggedUserJSON)
    console.log(userToSearch)
    if(userToSearch !== null){
      const userLogged = await userService.getUser(userToSearch.username)
      dispatch(setUser(userLogged[0].id))
    }
  }
}


export default userDataSlice.reducer