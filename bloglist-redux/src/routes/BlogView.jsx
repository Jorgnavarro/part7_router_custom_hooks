import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'



const BlogView = ({ blogView }) => {
  const [like, setLike] = useState(blogView?.likes)
  const userId = useSelector(state => state.userData)


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
          deletedABlogMutation.mutate(id)
        }
      })
}


const handleLikes = () => {
    const blogUpdated = {
        ...blogView,
        likes: like + 1
    }
    updateBlogMutation.mutate({...blogUpdated})
}

const returnHome = () => {
    navigate("/")
}
console.log(blogView)
//agregamos los signos de interrogación para cuando se elimine el blog no arroje ningún error por consola al estar undefined.

const handleComments = (e) => {
    e.preventDefault()
    console.log(comment)
    console.log(blogView.id)
    const idBlog = blogView.id
    addCommentMutation.mutate({comment, idBlog})
    setComment('')
}

  return(
    <div className="containerViewBlog">
      <h2>{blogView?.title}</h2>
      <a className="linkFake" href="">{blogView?.url}</a>
      <div>
        {like} likes <button className="btn btn-outline-primary likeTest" >Like</button>
      </div>
      <h4>Added by: {blogView?.author}</h4>
      <div className="containerBtnsView">
        <button className="btn btn-outline-light" >Go back</button>
        {blogView?.user?.id === userId || blogView?.user === userId ? <button className="btn btn-outline-danger" >Remove</button> : ''}
      </div>
    </div>
  )

}



export default BlogView