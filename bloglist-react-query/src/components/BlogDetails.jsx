import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import { deletedABlog } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { ContextGlobal } from '../context/globalContext'

const BlogDetail = ({ blog, style, handleLikes }) => {

  const { userDDBB } = useContext(ContextGlobal)

  const queryClient = useQueryClient()

  const deletedABlogMutation = useMutation({
    mutationFn: deletedABlog,
    onSuccess: () => {
      console.log(blog.id)
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedList = blogs.filter(b => b.id !== blog.id)
      queryClient.setQueryData(['blogs'], updatedList)

      Swal.fire({
        icon: 'success',
        title: `The blog ${blog.title} has been deleted successfully`,
      })
    }
  })

  console.log(blog.user)

  const handleDeleteBlog = (id) => {
    console.log(id)
    Swal.fire({
      title: `Are you sure to delete ${blog.title} from your blogs?`,
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deletedABlogMutation.mutate(id)
      }
    })
  }

  return (
    <ul className="listDetails" style={style}>
      <li className='urlTest'>
        {blog.url}
      </li>
      <li className='likesTest'>
                likes: {blog.likes} <button onClick={() => handleLikes()} className="btn btn-outline-primary likeTest" id="btn-likes">like</button>
      </li>
      <li>
        {blog.author}
      </li>
      <li id='container-btnDelete'>
        {blog.user?.id === userDDBB || blog.user === userDDBB ? <button id='btn-delete' className="btn btn-outline-danger" onClick={() => handleDeleteBlog(blog.id)}>Remove</button> : ''}
      </li>
    </ul>
  )
}

BlogDetail.propTypes = {
  blog: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  userDDBB: PropTypes.string.isRequired,
  deleteABlog: PropTypes.func.isRequired
}

export default BlogDetail