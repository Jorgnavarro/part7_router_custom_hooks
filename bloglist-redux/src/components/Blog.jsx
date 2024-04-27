import { useState } from 'react'
import BlogDetail  from './BlogDetails'
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'




const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }


  return (
    <li id="colorList" className='list-group-item list-group-item-light blog'>
      <div className="containerInfoBlog">
        <h5>
          <Link className='linkColor' to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author}
          </Link>
        </h5>
        <button id="btn-details" className="btn btn-outline-primary" onClick={toggleVisibility}>{visible ? 'Hide details':'View details'}</button>
      </div>
      <BlogDetail style={showWhenVisible} blog={blog} />
    </li>
  )
}



export default Blog