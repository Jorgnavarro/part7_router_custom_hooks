import { createSlice } from '@reduxjs/toolkit'

const answerSlice = createSlice({
  name: 'answers',
  initialState: '',
  reducers: {
    setAnswer(state, action) {
      return action.payload
    },
  },
})

export const { setAnswer } = answerSlice.actions

export const setAnswerServer = (message) => {
  return (dispatch) => {
    dispatch(setAnswer(message))
  }
}

export default answerSlice.reducer