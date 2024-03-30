import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { voteABlogService, deleteABlogService } from '../reducers/blogReducer'


const BlogDetail = ({ blog, style }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state =>  state.blogs)
  console.log(blogs)
  const userData = useSelector(state => state.userData?.id)
  const handleLikes = (id) => {
    dispatch(voteABlogService(id))
    console.log(userData)
    console.log(blog)
  }



  const handleDeleteBlog = () => {
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
        dispatch(deleteABlogService(blog.id))

        const deletedBlog = blogs.find(b => b.id === blog.id)

        console.log(deletedBlog)

        if(deletedBlog){
          Swal.fire({
            icon: 'error',
            title: 'The blog cannot be deleted, please log in again',
            showConfirmButton: false,
            timer: 1000,
          })

        }else{
          Swal.fire({
            icon: 'success',
            title: 'Your blog has been deleted',
            showConfirmButton: false,
            timer: 2000,
          })
        }
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
        {blog.user === userData ? (
          <button
            id="btn-delete"
            className="btn btn-outline-danger"
            onClick={() => handleDeleteBlog()}
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
