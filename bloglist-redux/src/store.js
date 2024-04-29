import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import originalOrderblogsReducer from './reducers/originalOrderblogsReducer'
import usersReducer from './reducers/usersReducer'
import answerReducer from './reducers/answerReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    userLogin: loginReducer,
    userData: userReducer,
    originalOrder: originalOrderblogsReducer,
    users: usersReducer,
    answer: answerReducer
  },
})


export default store
