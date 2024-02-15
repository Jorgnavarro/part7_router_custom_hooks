const CreateNew = () => {
    return(
        <form  id='addAnecdoteForm' className="mb-3">
            <h2>New anecdote ✍🏽</h2>
          <div className="mb-3 row align-items-center infoBlog">
            <div className="col-1">
              <label htmlFor="title" className="form-label">Title:</label>
            </div>
            <div className="col-7">
              <input
                type="text"
                className="form-control"
                id="title"
              />
            </div>
          </div>
          <div className="mb-3 row align-items-center infoBlog">
            <div className="col-1">
              <label htmlFor="author" className="form-label">Author:</label>
            </div>
            <div className="col-5">
              <input
                type='text'
                className="form-control"
                id="author"
            
              />
            </div>
          </div>
          <div className="mb-2 row align-items-center infoBlog">
            <div className="col-1">
              <label htmlFor="url" className="form-label">Url:</label>
            </div>
            <div className="col-7">
              <input
                type='text'
                className="form-control"
                id="url"
              />
            </div>
          </div>
          <div className="align-self-center">
            <button className="btn btn-outline-success" type='submit' id='btnForm'>Create</button>
          </div>
        </form>
    )
}

export default CreateNew