import { createSlice } from '@reduxjs/toolkit'

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

export const getLoggedUser = (user) => {
  return async dispatch => {
    dispatch(setUser(user))
  }
}

export const logOutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('userLog')
    dispatch(logOutU())
  }
}


export default userDataSlice.reducer