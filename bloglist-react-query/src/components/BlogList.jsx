/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {
  return (
    <li id="colorList" className='list-group-item list-group-item-light blog'>
      <div className="containerInfoBlog">
        <h5 className='individualBlog'>
          <Link className='linkColor' to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>  
        </h5>
      </div>
    </li>
  )
}



export default Blog