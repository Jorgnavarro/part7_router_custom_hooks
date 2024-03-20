import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'


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

setUserService = () => {
  return async dispatch => {
    const user = await 
  }
}