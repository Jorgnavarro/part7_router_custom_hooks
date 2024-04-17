/* eslint-disable react/prop-types */
import { useState } from 'react'
import BlogDetail  from './BlogDetails'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateLikes } from '../requests'
import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {
  const [like, setLike] = useState(blog.likes)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const queryClient = useQueryClient()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateBlogMutation = useMutation({
    mutationFn: updateLikes,
    onSuccess: (blogUpdated) => {
      // queryClient.invalidateQueries({queryKey: ['blogs']})
      //better performance
      if(blogUpdated?.response?.status !== 401){
        const blogs = queryClient.getQueryData(['blogs'])
        const updatedList = blogs.map(blog => {
          return blog.id === blogUpdated.id ? blogUpdated : blog
        })
        queryClient.setQueryData(['blogs'], updatedList)
      }
      
    }
  })

  const handleLikes = () => {
    setLike((prevLike) => prevLike + 1)
    const blogUpdated = {
      ...blog,
      likes: like + 1
    }
    updateBlogMutation.mutate({...blogUpdated})
  }

  return (
    <li id="colorList" className='list-group-item list-group-item-light blog'>
      <div className="containerInfoBlog">
        <h5 className='individualBlog'>
          <Link className='linkColor' to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>  
        </h5>
        <button id="btn-details" className="btn btn-outline-primary" onClick={toggleVisibility}>{visible ? 'Hide details':'View details'}</button>
      </div>
      <BlogDetail key={blog.id} style={showWhenVisible} blog={blog} handleLikes={handleLikes}/>
    </li>
  )
}



export default Blog