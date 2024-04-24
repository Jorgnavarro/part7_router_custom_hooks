import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userListSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUserList(state, action){
      return action.payload
    }
  }
})


export const { setUserList } = userListSlice.actions


export const getUserList = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch(setUserList(users))
  }
}

export default userListSlice.reducer