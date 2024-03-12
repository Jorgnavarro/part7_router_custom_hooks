import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    setNotificationMessage(state, action){
      return action.payload
    },
    clearNotification (){
      return null
    }
  }
})

export const { setNotificationMessage, clearNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(setNotificationMessage(message))
    await new Promise ((resolve) => setTimeout(resolve, time * 1000))
    dispatch(clearNotification())
  }
}

export default notificationSlice.reducer
