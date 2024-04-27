import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'



const BlogView = ({ blogView }) => {
  const [like, setLike] = useState(blogView?.likes)
  const userId = useSelector(state => state.userData)

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