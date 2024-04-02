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

export const sortByLikesR = (arrSort) => {
  return dispatch => {
    dispatch(setBlogs(arrSort))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newObject = {
      ...blog,
      likes: 0
    }
    const newBlog = await blogService.create(newObject)
    dispatch(appendBlog(newBlog))
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

      console.log(updatedBlog)
      const updatedList = blogs.map(blog => blog.id !== id ? blog : updatedBlog)

      console.log(updatedList)

      dispatch(setBlogs(updatedList))

    }catch(e){
      dispatch(setNotification(`Please login again - ${e.message}`, 4))
    }

  }
}

export const deleteABlogService = (id) => {
  return async(dispatch, getState) => {
    try {
      const blogs = getState().blogs

      await blogService.deleteBlog(id)

      const updatedList = blogs.filter(blog => blog.id !== id)

      dispatch(setBlogs(updatedList))

    } catch(e){
      dispatch(setNotification(`Please login again - ${e.message}`))
    }
  }
}

export default blogSlice.reducer