import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blog'

const originalOrder = createSlice({
  name: 'order',
  initialState: [],
  reducers: {
    setOrder(state, action) {
      return action.payload
    },
  },
})

export const { setOrder } = originalOrder.actions

export const initialOrder = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setOrder(blogs))
  }
}

export default originalOrder.reducer
