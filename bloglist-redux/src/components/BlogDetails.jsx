import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { voteABlogService, deleteABlogService } from '../reducers/blogReducer'


const BlogDetail = ({ blog, style }) => {
  const dispatch = useDispatch()

  const userData = useSelector(state => state.userData)

  const handleLikes = (id) => {
    dispatch(voteABlogService(id))
  }



  const handleDeleteBlog = (id) => {
    Swal.fire({
      title: `Are you sure to delete ${blog.title} from your blogs?`,
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteABlogService(id))
      }
    })
  }

  return (
    <ul className="listDetails" style={style}>
      <li className="urlTest">{blog.url}</li>
      <li className="likesTest">
        likes: {blog.likes}{' '}
        <button
          onClick={() => handleLikes(blog.id)}
          className="btn btn-outline-primary likeTest"
          id="btn-likes"
        >
          like
        </button>
      </li>
      <li>{blog.author}</li>
      <li id="container-btnDelete">
        {blog?.user?.id === userData || blog?.user === userData ? (
          <button
            id="btn-delete"
            className="btn btn-outline-danger"
            onClick={() => handleDeleteBlog(blog.id)}
          >
            Remove
          </button>
        ) : (
          ''
        )}
      </li>
    </ul>
  )
}



export default BlogDetail
