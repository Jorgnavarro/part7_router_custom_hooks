import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { voteABlogService, deleteABlogService } from '../reducers/blogReducer'

const BlogDetail = ({ blog, style, userDDBB }) => {
  const dispatch = useDispatch()

  //nos apoyamos en las notificaciones en el caso de que el token haya expirado, desde el useSelector obtenemos el mensaje y lo usamos como condicional dentro de sweetAlert para setear una alerta que indique que el usuario debe iniciar sesión.
  const dataNotification = useSelector(state =>  state.notification)

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
      if (result.isConfirmed && !dataNotification) {
        dispatch(deleteABlogService(blog.id))
        Swal.fire({
          icon: 'success',
          title: 'Your blog has been deleted',
          showConfirmButton: false,
          timer: 3000,
        })
      }else if(dataNotification){
        Swal.fire({
          icon: 'error',
          title: 'The blog cannot be deleted, please log in again',
          showConfirmButton: false,
          timer: 1000,
        })
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

BlogDetail.propTypes = {
  blog: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  userDDBB: PropTypes.string.isRequired
}

export default BlogDetail
