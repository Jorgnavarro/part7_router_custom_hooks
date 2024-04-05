import { useState, useContext } from 'react'
import BlogDetail  from './BlogDetails'
import { ContextGlobal } from '../context/globalContext'
import PropTypes from 'prop-types'


const Blog = ({ blog, updatedBlog, userDDBB, deleteABlog }) => {
  const [like, setLike] = useState(blog.likes)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const { modifierLikes, setModifierLikes } = useContext(ContextGlobal)

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const handleLikes = () => {
    setLike((prevLike) => prevLike + 1)
    const blogUpdated = {
      ...blog,
      likes: like + 1
    }
    updatedBlog(blog.id, blogUpdated)
    setModifierLikes(modifierLikes + 1)
  }

  return (
    <li id="colorList" className='list-group-item list-group-item-light blog'>
      <div className="containerInfoBlog">
        {blog.title} - {blog.author}
        <button id="btn-details" className="btn btn-outline-primary" onClick={toggleVisibility}>{visible ? 'Hide details':'View details'}</button>
      </div>
      <BlogDetail key={blog.id} userDDBB={userDDBB} style={showWhenVisible} blog={blog} handleLikes={handleLikes} deleteABlog={deleteABlog}/>
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updatedBlog: PropTypes.func.isRequired,
  userDDBB: PropTypes.string.isRequired,
  deleteABlog: PropTypes.func.isRequired
}


export default Blog