import { useState } from 'react'
import BlogDetail  from './BlogDetails'
import PropTypes from 'prop-types'



const Blog = ({ blog, userDDBB, deleteABlog }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }


  return (
    <li id="colorList" className='list-group-item list-group-item-light blog'>
      <div className="containerInfoBlog">
        {blog.title} - {blog.author}
        <button id="btn-details" className="btn btn-outline-primary" onClick={toggleVisibility}>{visible ? 'Hide details':'View details'}</button>
      </div>
      <BlogDetail key={blog.id} userDDBB={userDDBB} style={showWhenVisible} blog={blog} deleteABlog={deleteABlog}/>
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  userDDBB: PropTypes.string.isRequired,
  deleteABlog: PropTypes.func.isRequired
}


export default Blog