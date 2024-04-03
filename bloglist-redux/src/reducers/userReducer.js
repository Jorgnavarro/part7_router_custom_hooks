import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
import blogService from '../services/blog'

const userLog = window.localStorage.getItem('userLog')

const stateInitial = JSON.parse(userLog)


const userDataSlice = createSlice({
  name: 'userData',
  initialState: stateInitial,
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

export const getLoggedUser = () => {
  return async (dispatch, getState) => {
    const loggedUser = getState().userLogin
    console.log(loggedUser)
    if(loggedUser){
      const response = await userService.getUser(loggedUser.username)
      dispatch(setUser(response[0]?.id))
      blogService.setToken(loggedUser.token)
      window.localStorage.setItem('userLog', JSON.stringify(response[0]?.id))
    }
  }
}

export const logOutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('userLog')
    dispatch(logOutU())
  }
}


export default userDataSlice.reducer