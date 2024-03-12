import { useState, useContext, useRef } from 'react'
import blogService from '../services/blog'
import { ContextGlobal } from '../context/globalContext'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'


export function AddBlogForm () {
  const { setBlogs, blogs } = useContext(ContextGlobal)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()
  const dispatch = useDispatch()


  const addBlog = (e) => {
    e.preventDefault()
    if(title && author && url){
      const newBlog = {
        title,
        author,
        url
      }
      blogFormRef.current.toggleVisibility()
      blogService.create(newBlog)
        .then(blogCreated => {
          setBlogs([...blogs, blogCreated])
          setTitle('')
          setAuthor('')
          setUrl('')
        })
        .catch(response => {
          console.log(response.response.data.error)
          dispatch(setNotification(`Please login again - ${response.response.data.error}`, 3))
        })
      dispatch(setNotification(`The blog ${title} was added ✅`, 2))
    }else{
      dispatch(setNotification('Some of the fields are invalid', 2))
    }
  }

  return(
    <Togglable ref={blogFormRef} buttonLabel="Create a blog">
      <div>
        <h2>Create a new blog</h2>
        <form onSubmit={addBlog} id='addBlogForm' className="mb-3">
          <div className="mb-3 row align-items-center infoBlog">
            <div className="col-1">
              <label htmlFor="title" className="form-label">Title:</label>
            </div>
            <div className="col-7">
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
          </div>
          <div className="mb-3 row align-items-center infoBlog">
            <div className="col-1">
              <label htmlFor="author" className="form-label">Author:</label>
            </div>
            <div className="col-5">
              <input
                type='text'
                className="form-control"
                id="author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
          </div>
          <div className="mb-2 row align-items-center infoBlog">
            <div className="col-1">
              <label htmlFor="url" className="form-label">Url:</label>
            </div>
            <div className="col-7">
              <input
                type='text'
                className="form-control"
                id="url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
          </div>
          <div className="align-self-center">
            <button className="btn btn-outline-success" type='submit' id='btnForm'>Create</button>
          </div>
        </form>
      </div>
    </Togglable>
  )
}