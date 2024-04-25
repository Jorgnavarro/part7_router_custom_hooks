



const BlogView = () => {

  return(
    <div className="containerViewBlog">
      <h2>{blogView?.title}</h2>
      <a className="linkFake" href="">{blogView?.url}</a>
      <div>
        {like} likes <button className="btn btn-outline-primary likeTest" onClick={handleLikes}>Like</button>
      </div>
      <h4>Added by: {blogView?.author}</h4>
      <div className="containerBtnsView">
        <button className="btn btn-outline-light" onClick={returnHome}>Go back</button>
        {blogView?.user?.id === userDDBB || blogView?.user === userDDBB ? <button className="btn btn-outline-danger" onClick={() => handleDeleteBlog(blogView?.id)}>Remove</button> : ''}
      </div>
      <h3>Comments</h3>
      <form className='containerComments' onSubmit={handleComments}>
        <div id='containerElementsForm' className="row align-items-center infoBlog">
          <div className="col-8">
            <input
              type="text"
              className="form-control"
              id="comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </div>
          <div className="align-self-center col-3">
            <button className="btn btn-outline-light" type='submit'>Add comment</button>
          </div>
        </div>
      </form>
      {blogView?.comments === null || blogView?.comments.length === 0 ? '' :
        <>
          {blogView?.comments.map(comment => {
            return <li key={comment?._id}>
              {comment?.comment}
            </li>
          })}
        </> }
    </div>
  )

}



export default BlogView