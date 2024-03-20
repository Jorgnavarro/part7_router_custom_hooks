import { useState } from 'react'
import BlogDetail  from './BlogDetails'




const Blog = ({ blog, userDDBB }) => {
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
      <BlogDetail key={blog.id} userDDBB={userDDBB} style={showWhenVisible} blog={blog} />
    </li>
  )
}



export default Blog