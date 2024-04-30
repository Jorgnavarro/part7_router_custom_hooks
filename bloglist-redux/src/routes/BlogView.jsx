import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { voteABlogService, deleteABlogService } from '../reducers/blogReducer'
import Swal from 'sweetalert2'


const BlogView = ({ blogView }) => {
  const [like, setLike] = useState(blogView?.likes)
  const userId = useSelector(state => state.userData)
  const answerServer = useSelector(state => state.answer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(answerServer?.includes('Please'))


  const handleLikes = (id) => {
    try {
      console.log(answerServer?.includes('Please login again'))
      if(!answerServer?.includes('Please login again')){
        setLike((prevLikes) => prevLikes + 1)
        dispatch(voteABlogService(id))
      }else{
        throw('Please log in again')
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `${error}`,
        showConfirmButton: false,
        timer: 2000,
      })
    }
  }

  const handleDeleteBlog = (id) => {
    Swal.fire({
      title: `Are you sure to delete ${blogView.title} from your blogs?`,
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if(!answerServer?.includes('Please login again')){
          dispatch(deleteABlogService(id))
          navigate('/')
        }
        Swal.fire({
          icon: 'error',
          title: `Please log in again - ${blogView.title} - cannot be deleted`,
          showConfirmButton: false,
          timer: 2000,
        })
      }
    })
  }

  const returnHome = () => {
    navigate('/')
  }


  return(
    <div className="containerViewBlog">
      <h2>{blogView?.title}</h2>
      <a className="linkFake" href="">{blogView?.url}</a>
      <div>
        {like || blogView?.likes} likes <button onClick={() => handleLikes(blogView?.id)} className="btn btn-outline-primary likeTest" >Like</button>
      </div>
      <h4>Added by: {blogView?.author}</h4>
      <div className="containerBtnsView">
        <button className="btn btn-outline-light" onClick={ returnHome} >Go back</button>
        {blogView?.user?.id === userId || blogView?.user === userId ? <button className="btn btn-outline-danger" onClick={() => handleDeleteBlog(blogView?.id)} >Remove</button> : ''}
      </div>
    </div>
  )

}



export default BlogView