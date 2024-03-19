import { createSlice } from '@reduxjs/toolkit'
import blogService  from '../services/blog'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action){
      return action.payload
    },
    appendBlog(state, action){
      state.push(action.payload)
    }
  }
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const voteABlogService = ( id ) => {
  return async (dispatch, getState) => {
    try{
      const blogs = getState().blogs

      const blogToUpdate = blogs.find(blog => blog.id === id)

      const updatedObject = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }

      const updatedBlog = await blogService.update(id, updatedObject)

      const updatedList = blogs.map(blog => blog.id !== id ? blog : updatedBlog)

      dispatch(setBlogs(updatedList))

    }catch(e){
      dispatch(setNotification(`Please login again - ${e.message}`, 4))
    }

  }
}

export default blogSlice.reducer