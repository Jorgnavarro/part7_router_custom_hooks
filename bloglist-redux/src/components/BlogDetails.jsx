import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { voteABlogService, deleteABlogService } from '../reducers/blogReducer'

const BlogDetail = ({ blog, style, userDDBB }) => {
  const dispatch = useDispatch()

  //nos apoyamos en las notificaciones en el caso de que el token haya expirado, desde el useSelector obtenemos el mensaje y lo usamos como condicional dentro de sweetAlert para setear una alerta que indique que el usuario debe iniciar sesión.
  const dataNotification = useSelector(state =>  state.notification)

  const blogs = useSelector(state =>  state.blogs)

  console.log(dataNotification?.includes('401'))

  const badRequest = dataNotification?.includes('401')

  console.log(badRequest)

  console.log(userDDBB)

  const handleLikes = (id) => {
    dispatch(voteABlogService(id))
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
        {blog.user?.id === userDDBB ? (
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
