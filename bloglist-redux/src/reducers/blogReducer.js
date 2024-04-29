import { createSlice } from '@reduxjs/toolkit'
import blogService  from '../services/blog'
import { setNotification } from './notificationReducer'
import Swal from 'sweetalert2'
import { setAnswerServer } from './answerReducer'

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
    try {
      const newObject = {
        ...blog,
        likes: 0
      }
      const newBlog = await blogService.create(newObject)
      console.log(newBlog)
      dispatch(appendBlog(newBlog))
      dispatch(setNotification(`The blog ${newBlog.title} was added ✅`, 2))
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `Please log in again - ${error.message}`,
        showConfirmButton: false,
        timer: 2000,
      })
    }
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
      dispatch(setAnswerServer('Success'))

      Swal.fire({
        icon: 'success',
        title: `You liked - ${blogToUpdate.title}`,
        showConfirmButton: false,
        timer: 2000,
      })

    }catch(e){
      dispatch(setNotification(`Please login again - ${e.message}`, 4))

      dispatch(setAnswerServer(`Please login again - ${e.message}`))
      Swal.fire({
        icon: 'error',
        title: `Please log in again - ${e.message}`,
        showConfirmButton: false,
        timer: 2000,
      })
    }

  }
}

export const deleteABlogService = (id) => {
  return async(dispatch, getState) => {
    try {
      const blogs = getState().blogs

      await blogService.deleteBlog(id)

      const updatedList = await blogs.filter(blog => blog.id !== id)

      dispatch(setBlogs(updatedList))
      Swal.fire({
        icon: 'success',
        title: 'Your blog has been deleted',
        showConfirmButton: false,
        timer: 2000,
      })
      dispatch(setAnswerServer('Success'))

    } catch(e){
      dispatch(setNotification(`Please login again - ${e.message}`))
      dispatch(setAnswerServer(`Please login again - ${e.message}`))
      Swal.fire({
        icon: 'error',
        title: 'The blog cannot be deleted, please log in again',
        showConfirmButton: false,
        timer: 1000,
      })
    }
  }
}

export default blogSlice.reducer